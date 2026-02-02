/**
 * Application configuration constants
 * All magic numbers and configuration values centralized here
 */

// Credit costs for various operations
export const CREDITS = {
  INITIAL_FREE: 12,
  CARD_GENERATION: 4,
  IMAGE_EDIT: 2,
  PHOTO_SESSION: 10,
  REFERRAL_COMMISSION_PERCENT: 10,
} as const;

// Limits for various operations
export const LIMITS = {
  MAX_INPUT_IMAGES: 8,
  MAX_CAROUSEL_SLIDES: 10,
  MAX_PROMPT_LENGTH: 2000,
  MAX_CAPTION_PREVIEW: 50,
  MAX_PROMPT_PREVIEW: 100,
} as const;

// Timeouts in milliseconds
export const TIMEOUTS = {
  GEMINI_MS: 120000,
  N8N_MS: 120000,
  DOWNLOAD_MS: 30000,
  OPENAI_MS: 60000,
  PAYWALL_DELAY_MS: 1500,
} as const;

// Storage configuration
export const STORAGE = {
  BUCKET_NAME: 'generated-images',
  IMAGE_CONTENT_TYPE: 'image/jpeg',
} as const;

// Credit packages for purchase
export const CREDIT_PACKAGES = {
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
    credits: 184,
    price: 1490,
    pricePerCard: 32,
    cardsCount: 46,
    description: 'Рекомендуем',
    isPopular: true,
  },
  big: {
    id: 'big',
    name: 'Big',
    emoji: '',
    credits: 664,
    price: 4990,
    pricePerCard: 30,
    cardsCount: 166,
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
} as const;

// Legacy plans for backward compatibility
export const PLANS = {
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
} as const;

export type CreditPackageId = keyof typeof CREDIT_PACKAGES;
export type PlanId = keyof typeof PLANS;
