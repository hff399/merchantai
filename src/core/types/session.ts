/**
 * Session-related type definitions
 */

import type { ImageInput, CarouselSlide, StyleReference } from './common';

// Route types
export const ROUTES = {
  MAIN_MENU: 'main_menu',
  IMAGE_CARD: 'image_card',
  IMAGE_CARD_WAITING_PHOTO: 'image_card_waiting_photo',
  IMAGE_CARD_WAITING_PROMPT: 'image_card_waiting_prompt',
  IMAGE_CARD_SESSION: 'image_card_session',
  // Carousel routes
  CAROUSEL_WAITING_PHOTO: 'carousel_waiting_photo',
  CAROUSEL_WAITING_PROMPT: 'carousel_waiting_prompt',
  CAROUSEL_SESSION: 'carousel_session',
  CAROUSEL_NEXT_SLIDE: 'carousel_next_slide',
  CAROUSEL_SELECT_REFERENCE: 'carousel_select_reference',
  // Image edit
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

// Demo routes
export const DEMO_ROUTES = {
  WELCOME: 'demo_welcome',
  QUICK_DEMO: 'demo_quick_demo',
  STYLE_PRESET: 'demo_style_preset',
  WAITING_PHOTO: 'demo_waiting_photo',
  COMPOSITION: 'demo_composition',
  VISUAL_STYLE: 'demo_visual_style',
  ATMOSPHERE: 'demo_atmosphere',
  INFOGRAPHICS: 'demo_infographics',
  TEXT_STYLE: 'demo_text_style',
  HEADLINE: 'demo_headline',
  USER_INPUT: 'demo_user_input',
  GENERATING: 'demo_generating',
  RESULT: 'demo_result',
  EDIT_CHOICE: 'demo_edit_choice',
  ADVANCED_EDIT: 'demo_advanced_edit',
  PAYWALL: 'demo_paywall',
  // Simple flow routes
  PRODUCT_NAME: 'demo_product_name',
} as const;

export type DemoRouteType = (typeof DEMO_ROUTES)[keyof typeof DEMO_ROUTES];

// Legacy image generation session (for backward compatibility)
export interface ImageGenSession {
  sessionId: string;
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
  sessionId: string;
  photoUrl?: string;
  photoFileId?: string;
  prompt?: string;
  lastEditedImage?: Buffer;
  lastEditedImageUrl?: string;
  orderId?: string;
  editCount: number;
}

// Carousel session for multi-slide generation
export interface CarouselSession {
  sessionId: string;

  // Input images (up to 8)
  inputImages: ImageInput[];

  // Primary product image (shortcut to first product image)
  originalImageUrl: string;
  originalImageFileId?: string;

  // Current working state
  currentSlideNumber: number;
  currentPrompt?: string;
  currentEditRequest?: string;
  currentImageUrl?: string;
  currentImageFileId?: string;
  currentImageBuffer?: Buffer;

  // Finalized slides (confirmed by user)
  slides: CarouselSlide[];

  // Style reference (extracted from first finalized slide)
  styleReference?: StyleReference;

  // Generation tracking
  generationCount: number;
  orderId?: string;

  // Multi-image collection state
  isCollectingImages?: boolean;
  collectedImagesCount?: number;

  // Session locking (prevent concurrent generations)
  isGenerating?: boolean;
  generationStartedAt?: string; // ISO timestamp

  // Generated variants for current slide (for reference selection)
  currentSlideVariants?: Array<{
    imageUrl: string;
    imageFileId?: string;
    prompt: string;
    generatedAt: string; // ISO timestamp
  }>;
}

// Test mode routes
export const TEST_ROUTES = {
  WAITING_PHOTOS: 'test_waiting_photos',
  WAITING_PROMPT: 'test_waiting_prompt',
  GENERATING: 'test_generating',
  RESULT: 'test_result',
} as const;

export type TestRouteType = (typeof TEST_ROUTES)[keyof typeof TEST_ROUTES];

// Test mode session
export interface TestModeSession {
  sessionId: string;
  photos: Array<{
    url: string;
    fileId: string;
    description?: string;
  }>;
  prompt?: string;
  lastGeneratedImage?: Buffer;
  lastGeneratedImageUrl?: string;
  orderId?: string;
  generationCount: number;
}

// Demo constructor step
export type DemoConstructorStep =
  | 'welcome'
  | 'quick_demo'
  | 'photo'
  | 'style_preset'
  | 'quick_style'
  | 'composition'
  | 'visual_style'
  | 'atmosphere'
  | 'infographics'
  | 'text_style'
  | 'headline'
  | 'user_input'
  | 'generating'
  | 'result'
  | 'edit_choice'
  | 'advanced_edit'
  | 'paywall'
  // Simple flow steps
  | 'product_name';

// Style presets for quick onboarding
export type StylePreset =
  | 'premium_wb'
  | 'dark_premium'
  | 'minimal_white'
  | 'eco_natural'
  | 'tech_modern'
  | 'bright_commercial';

// Demo constructor session
export interface DemoConstructorSession {
  sessionId: string;
  step: DemoConstructorStep;

  // Photo
  photoUrl?: string;
  photoFileId?: string;

  // Quick flow: style preset (replaces 6 steps)
  stylePreset?: StylePreset;
  isQuickDemo?: boolean;

  // Constructor choices (for advanced mode)
  composition?: string;
  visualStyle?: string;
  atmosphere?: string;
  infographics?: string;
  textStyle?: string;
  headline?: string;

  // User input
  productName?: string;
  mainUSP?: string;
  features?: string;

  // Generation
  generationCount: number;
  lastGeneratedImage?: Buffer;
  lastGeneratedImageUrl?: string;
  orderId?: string;
}

// Session data stored per user
export interface SessionData {
  currentRoute?: string;
  tempData?: Record<string, unknown>;
  lastMessageId?: number;
  processingMessageId?: number;
  // Legacy image generation session (keep for backward compatibility)
  imageGenSession?: ImageGenSession;
  // Image edit session
  imageEditSession?: ImageEditSession;
  // Carousel session
  carouselSession?: CarouselSession;
  // Demo constructor session
  demoConstructorSession?: DemoConstructorSession;
  // Test mode session
  testModeSession?: TestModeSession;
}
