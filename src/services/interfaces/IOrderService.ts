/**
 * Order service interface
 */

import type { Order, OrderType, OrderInputData, Payment } from '../../core/types';

export interface IOrderService {
  // Create order
  createOrder(
    userId: string,
    type: OrderType,
    inputData: OrderInputData,
    creditsUsed: number
  ): Promise<Order>;

  // Update order
  updateOrder(orderId: string, updates: Partial<Order>): Promise<Order>;

  // Get user orders
  getUserOrders(userId: string, limit?: number): Promise<Order[]>;

  // Get order by ID
  getOrder(orderId: string): Promise<Order | null>;
}

export interface IPaymentService {
  // Create payment
  createPayment(
    userId: string,
    plan: string,
    amount: number,
    currency?: string
  ): Promise<Payment>;

  // Update payment
  updatePayment(paymentId: string, updates: Partial<Payment>): Promise<Payment>;

  // Get payment
  getPayment(paymentId: string): Promise<Payment | null>;
}
