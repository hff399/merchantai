/**
 * Order service implementation
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IOrderService, IPaymentService } from '../interfaces/IOrderService';
import type { Order, OrderType, OrderInputData, Payment } from '../../core/types';
import { getSupabaseClient } from './SupabaseClient';

export class OrderService implements IOrderService {
  private client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    this.client = client || getSupabaseClient();
  }

  async createOrder(
    userId: string,
    type: OrderType,
    inputData: OrderInputData,
    creditsUsed: number
  ): Promise<Order> {
    const { data, error } = await this.client
      .from('orders')
      .insert({
        user_id: userId,
        type,
        status: 'pending',
        input_data: inputData,
        credits_used: creditsUsed,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrder(orderId: string, updates: Partial<Order>): Promise<Order> {
    const { data, error } = await this.client
      .from('orders')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserOrders(userId: string, limit = 10): Promise<Order[]> {
    const { data, error } = await this.client
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  async getOrder(orderId: string): Promise<Order | null> {
    const { data, error } = await this.client
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }
}

export class PaymentService implements IPaymentService {
  private client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    this.client = client || getSupabaseClient();
  }

  async createPayment(
    userId: string,
    plan: string,
    amount: number,
    currency = 'RUB'
  ): Promise<Payment> {
    const { data, error } = await this.client
      .from('payments')
      .insert({
        user_id: userId,
        plan,
        amount,
        currency,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePayment(paymentId: string, updates: Partial<Payment>): Promise<Payment> {
    const { data, error } = await this.client
      .from('payments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getPayment(paymentId: string): Promise<Payment | null> {
    const { data, error } = await this.client
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }
}

// Singleton instances
let orderServiceInstance: OrderService | null = null;
let paymentServiceInstance: PaymentService | null = null;

export function getOrderService(): OrderService {
  if (!orderServiceInstance) {
    orderServiceInstance = new OrderService();
  }
  return orderServiceInstance;
}

export function getPaymentService(): PaymentService {
  if (!paymentServiceInstance) {
    paymentServiceInstance = new PaymentService();
  }
  return paymentServiceInstance;
}
