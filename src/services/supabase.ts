import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';
import { User, Order, Payment } from '../types';

interface ReferralParams {
  referralCode?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  startParam?: string;
}

class SupabaseService {
  private client: SupabaseClient;
  private bucketName = 'generated-images';

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
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  // Find user by referral code
  async getUserByReferralCode(code: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('referral_code', code.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  async createUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    referralParams?: ReferralParams
  ): Promise<User> {
    // Find referrer if referral code provided
    let referrerId: string | null = null;
    
    if (referralParams?.referralCode) {
      try {
        const referrer = await this.getUserByReferralCode(referralParams.referralCode);
        if (referrer) {
          referrerId = referrer.id;
          // Increment referrer's count
          await this.client
            .from('users')
            .update({ 
              referrals_count: (referrer.referrals_count || 0) + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', referrer.id);
        }
      } catch (err) {
        console.error('Error finding referrer:', err);
        // Continue without referrer
      }
    }

    const { data, error } = await this.client
      .from('users')
      .insert({
        telegram_id: telegramId,
        username: username || null,
        first_name: firstName || null,
        last_name: lastName || null,
        plan: 'free',
        credits: 12,
        cards_created: 0,
        referred_by: referrerId,
        utm_source: referralParams?.utmSource || null,
        utm_campaign: referralParams?.utmCampaign || null,
        utm_medium: referralParams?.utmMedium || null,
        start_param: referralParams?.startParam || null,
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
    try {
      // Try using the RPC function first
      const { error: rpcError } = await this.client.rpc('increment_cards_created', { p_user_id: userId });
      
      if (rpcError) {
        console.error('RPC increment_cards_created error:', rpcError);
        // Fallback: direct update
        const { data: user } = await this.client
          .from('users')
          .select('cards_created')
          .eq('id', userId)
          .single();
        
        if (user) {
          await this.client
            .from('users')
            .update({ 
              cards_created: (user.cards_created || 0) + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
        }
      }
    } catch (err) {
      console.error('incrementCardsCreated error:', err);
      // Silent fail - not critical
    }
  }

  // Get user's referral stats
  async getReferralStats(userId: string): Promise<{
    referralCode: string;
    referralsCount: number;
    earnings: number;
  }> {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('referral_code, referrals_count, referral_earnings')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('getReferralStats error:', error);
        return { referralCode: '', referralsCount: 0, earnings: 0 };
      }

      return {
        referralCode: data?.referral_code || '',
        referralsCount: data?.referrals_count || 0,
        earnings: Number(data?.referral_earnings) || 0,
      };
    } catch (err) {
      console.error('getReferralStats error:', err);
      return { referralCode: '', referralsCount: 0, earnings: 0 };
    }
  }

  // Process referral commission after payment
  async processReferralCommission(paymentId: string, commissionPercent = 10): Promise<void> {
    await this.client.rpc('process_referral_commission', {
      p_payment_id: paymentId,
      p_commission_percent: commissionPercent,
    });
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

  // Get or create user with referral tracking
  async getOrCreateUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    referralParams?: ReferralParams
  ): Promise<User> {
    let user = await this.getUser(telegramId);
    if (!user) {
      user = await this.createUser(telegramId, username, firstName, lastName, referralParams);
    }
    return user;
  }
}

export const supabase = new SupabaseService();