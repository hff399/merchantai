import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

interface CreatePaymentParams {
  amount: number;
  currency: string;
  description: string;
  returnUrl: string;
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  id: string;
  status: string;
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmation_url: string;
  };
  metadata?: Record<string, any>;
}

class YooKassaService {
  private baseUrl = 'https://api.yookassa.ru/v3';
  private auth: string;

  constructor() {
    this.auth = Buffer.from(`${config.yookassa.shopId}:${config.yookassa.secretKey}`).toString(
      'base64'
    );
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResponse> {
    const idempotenceKey = uuidv4();

    try {
      const response = await axios.post(
        `${this.baseUrl}/payments`,
        {
          amount: {
            value: params.amount.toFixed(2),
            currency: params.currency,
          },
          confirmation: {
            type: 'redirect',
            return_url: params.returnUrl,
          },
          capture: true,
          description: params.description,
          metadata: params.metadata,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.auth}`,
            'Idempotence-Key': idempotenceKey,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('YooKassa payment creation error:', error.response?.data || error.message);
      throw new Error('Ошибка создания платежа');
    }
  }

  async getPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/payments/${paymentId}`, {
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('YooKassa get payment error:', error.response?.data || error.message);
      throw new Error('Ошибка получения информации о платеже');
    }
  }

  async cancelPayment(paymentId: string): Promise<PaymentResponse> {
    const idempotenceKey = uuidv4();

    try {
      const response = await axios.post(
        `${this.baseUrl}/payments/${paymentId}/cancel`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.auth}`,
            'Idempotence-Key': idempotenceKey,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('YooKassa cancel payment error:', error.response?.data || error.message);
      throw new Error('Ошибка отмены платежа');
    }
  }

  isPaymentSucceeded(payment: PaymentResponse): boolean {
    return payment.status === 'succeeded' && payment.paid;
  }

  isPaymentPending(payment: PaymentResponse): boolean {
    return payment.status === 'pending';
  }

  isPaymentCanceled(payment: PaymentResponse): boolean {
    return payment.status === 'canceled';
  }
}

export const yookassa = new YooKassaService();