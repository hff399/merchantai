import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';
import { User, Order, Payment } from '../types';

class SupabaseService {
  private client: SupabaseClient;
  private bucketName = 'generated-images'; // Create this bucket in Supabase

  constructor() {
    this.client = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  // Upload image to Supabase Storage
  async uploadImage(
    buffer: Buffer,
    userId: string,
    orderId: string,
    type: 'card' | 'edit' | 'session' = 'card'
  ): Promise<string | null> {
    try {
      const timestamp = Date.now();
      const fileName = `${type}/${userId}/${orderId}_${timestamp}.jpg`;

      const { error } = await this.client.storage
        .from(this.bucketName)
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        return null;
      }

      // Get public URL
      const { data: urlData } = this.client.storage
        .from(this.bucketName)
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload image error:', error);
      return null;
    }
  }

  // User operations
  async getUser(telegramId: number): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  }

  async createUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string
  ): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .insert({
        telegram_id: telegramId,
        username,
        first_name: firstName,
        last_name: lastName,
        plan: 'free',
        credits: 12, // Free trial credits
        cards_created: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUserCredits(userId: string, creditsChange: number): Promise<User> {
    const { data: user } = await this.client
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (!user) throw new Error('User not found');

    const newCredits = user.credits + creditsChange;
    return this.updateUser(userId, { credits: newCredits });
  }

  async incrementCardsCreated(userId: string): Promise<void> {
    await this.client.rpc('increment_cards_created', { user_id: userId });
  }

  // Order operations
  async createOrder(
    userId: string,
    type: 'image_card' | 'photo_session' | 'image_edit',
    inputData: any,
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

  // Payment operations
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

  // Get or create user
  async getOrCreateUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string
  ): Promise<User> {
    let user = await this.getUser(telegramId);
    if (!user) {
      user = await this.createUser(telegramId, username, firstName, lastName);
    }
    return user;
  }
}

export const supabase = new SupabaseService();