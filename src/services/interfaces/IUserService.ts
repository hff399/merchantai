/**
 * User service interface
 */

import type { User, ReferralParams, ReferralStats } from '../../core/types';

export interface IUserService {
  // Get user by Telegram ID
  getUser(telegramId: number): Promise<User | null>;

  // Get user by referral code
  getUserByReferralCode(code: string): Promise<User | null>;

  // Create new user
  createUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    referralParams?: ReferralParams
  ): Promise<User>;

  // Update user
  updateUser(userId: string, updates: Partial<User>): Promise<User>;

  // Update user credits
  updateUserCredits(userId: string, creditsChange: number): Promise<User>;

  // Increment cards created counter
  incrementCardsCreated(userId: string): Promise<void>;

  // Get referral statistics
  getReferralStats(userId: string): Promise<ReferralStats>;

  // Process referral commission after payment
  processReferralCommission(paymentId: string, commissionPercent?: number): Promise<void>;

  // Get or create user (convenience method)
  getOrCreateUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    referralParams?: ReferralParams
  ): Promise<User>;
}
