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
  credits: number;
  price: number;
  description: string;
}

// Changed from subscription plans to one-time credit packages
export const CREDIT_PACKAGES: Record<string, CreditPackage> = {
  small: {
    id: 'small',
    name: 'Малый пакет',
    credits: 20,
    price: 290,
    description: '20 кредитов',
  },
  medium: {
    id: 'medium',
    name: 'Средний пакет',
    credits: 50,
    price: 590,
    description: '50 кредитов + 10% бонус',
  },
  large: {
    id: 'large',
    name: 'Большой пакет',
    credits: 150,
    price: 1490,
    description: '150 кредитов + 20% бонус',
  },
  mega: {
    id: 'mega',
    name: 'Мега пакет',
    credits: 500,
    price: 3990,
    description: '500 кредитов + 30% бонус',
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