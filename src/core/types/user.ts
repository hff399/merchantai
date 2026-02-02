/**
 * User-related type definitions
 */

// Plan types
export type PlanType = 'free' | 'starter' | 'pro' | 'business';

// User entity
export interface User {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  plan: PlanType;
  credits: number;
  cards_created: number;
  // Referral fields
  referral_code?: string;
  referred_by?: string;
  referrals_count?: number;
  referral_earnings?: number;
  // UTM tracking
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  start_param?: string;
  // Admin fields
  total_spent?: number;
  is_blocked?: boolean;
  is_admin?: boolean;
  notes?: string;
  tags?: string[];
  // Timestamps
  created_at: string;
  updated_at: string;
}

// User creation parameters
export interface CreateUserParams {
  telegramId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  referralParams?: ReferralParams;
}

// Referral tracking parameters
export interface ReferralParams {
  referralCode?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  startParam?: string;
}

// Referral statistics
export interface ReferralStats {
  referralCode: string;
  referralsCount: number;
  earnings: number;
}

// Plan details for display
export interface PlanDetails {
  name: string;
  credits: number;
  price: number;
  features: string[];
}

// Credit package for purchase
export interface CreditPackage {
  id: string;
  name: string;
  emoji: string;
  credits: number;
  price: number;
  pricePerCard: number;
  cardsCount: number;
  description: string;
  badge?: string;
  isPopular?: boolean;
}
