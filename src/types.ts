import { Context, SessionFlavor } from 'grammy';

export interface User {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  plan: 'free' | 'starter' | 'pro' | 'business';
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

export interface Order {
  id: string;
  user_id: string;
  type: 'image_card' | 'photo_session' | 'image_edit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input_data: any;
  output_data?: any;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'cancelled';
  yookassa_payment_id?: string;
  created_at: string;
  updated_at: string;
}

// Image generation session for tracking state
export interface ImageGenSession {
  sessionId: string; // Unique ID for n8n/ChatGPT memory
  photoUrl?: string;
  photoFileId?: string;
  prompt?: string;
  lastGeneratedImage?: Buffer;
  lastGeneratedImageUrl?: string;
  orderId?: string;
  generationCount: number;
}

// Image edit session
export interface ImageEditSession {
  sessionId: string; // Unique ID for n8n/ChatGPT memory
  photoUrl?: string;
  photoFileId?: string;
  prompt?: string;
  lastEditedImage?: Buffer;
  lastEditedImageUrl?: string;
  orderId?: string;
  editCount: number;
}

export interface SessionData {
  currentRoute?: string;
  tempData?: any;
  lastMessageId?: number;
  processingMessageId?: number;
  // Image generation session
  imageGenSession?: ImageGenSession;
  // Image edit session
  imageEditSession?: ImageEditSession;
}

export type MyContext = Context & SessionFlavor<SessionData>;

export interface CreditPackage {
  id: string;
  name: string;
  emoji: string;
  credits: number;
  price: number;
  pricePerCard: number;
  cardsCount: number;
  description: string;
  badge?: string; // Optional badge like "ХИТ", "ВЫГОДНО"
  isPopular?: boolean;
}

// New pricing structure optimized for conversions
// 4 credits = 1 card generation, 2 credits = 1 edit
export const CREDIT_PACKAGES: Record<string, CreditPackage> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    emoji: '',
    credits: 60,
    price: 590,
    pricePerCard: 39,
    cardsCount: 15,
    description: '',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    emoji: '',
    credits: 180,
    price: 1490,
    pricePerCard: 32,
    cardsCount: 45,
    description: 'Рекомендуем',
    isPopular: true,
  },
  big: {
    id: 'big',
    name: 'Big',
    emoji: '',
    credits: 680,
    price: 4990,
    pricePerCard: 29,
    cardsCount: 170,
    description: 'Выгодно',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    emoji: '',
    credits: 0,
    price: 10000,
    pricePerCard: 0,
    cardsCount: 0,
    description: 'Индивидуально',
  },
};

// Keep old PLANS for backward compatibility
export interface PlanDetails {
  name: string;
  credits: number;
  price: number;
  features: string[];
}

export const PLANS: Record<string, PlanDetails> = {
  starter: {
    name: 'Стартовый',
    credits: 50,
    price: 490,
    features: ['50 кредитов', 'Базовая поддержка'],
  },
  pro: {
    name: 'Профессиональный',
    credits: 200,
    price: 1490,
    features: ['200 кредитов', 'Приоритетная поддержка', 'Расширенные стили'],
  },
  business: {
    name: 'Бизнес',
    credits: 500,
    price: 2890,
    features: ['500 кредитов', 'Приоритетная поддержка', 'API доступ', 'Белый лейбл'],
  },
};

export const ROUTES = {
  MAIN_MENU: 'main_menu',
  IMAGE_CARD: 'image_card',
  IMAGE_CARD_WAITING_PHOTO: 'image_card_waiting_photo',
  IMAGE_CARD_WAITING_PROMPT: 'image_card_waiting_prompt',
  IMAGE_CARD_SESSION: 'image_card_session',
  IMAGE_EDIT: 'image_edit',
  IMAGE_EDIT_WAITING_PHOTO: 'image_edit_waiting_photo',
  IMAGE_EDIT_WAITING_PROMPT: 'image_edit_waiting_prompt',
  IMAGE_EDIT_SESSION: 'image_edit_session',
  PHOTO_SESSION: 'photo_session',
  PROFILE: 'profile',
  SUPPORT: 'support',
  BUY_CREDITS: 'buy_credits',
} as const;

export type RouteType = (typeof ROUTES)[keyof typeof ROUTES];