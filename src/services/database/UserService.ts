/**
 * User service implementation
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IUserService } from '../interfaces/IUserService';
import type { User, ReferralParams, ReferralStats } from '../../core/types';
import { CREDITS } from '../../core/constants';
import { getSupabaseClient } from './SupabaseClient';

export class UserService implements IUserService {
  private client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    this.client = client || getSupabaseClient();
  }

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
              updated_at: new Date().toISOString(),
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
        credits: CREDITS.INITIAL_FREE,
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
      const { error: rpcError } = await this.client.rpc('increment_cards_created', {
        p_user_id: userId,
      });

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
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
      }
    } catch (err) {
      console.error('incrementCardsCreated error:', err);
      // Silent fail - not critical
    }
  }

  async getReferralStats(userId: string): Promise<ReferralStats> {
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

  async processReferralCommission(
    paymentId: string,
    commissionPercent = CREDITS.REFERRAL_COMMISSION_PERCENT
  ): Promise<void> {
    await this.client.rpc('process_referral_commission', {
      p_payment_id: paymentId,
      p_commission_percent: commissionPercent,
    });
  }

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

// Singleton instance
let userServiceInstance: UserService | null = null;

export function getUserService(): UserService {
  if (!userServiceInstance) {
    userServiceInstance = new UserService();
  }
  return userServiceInstance;
}
