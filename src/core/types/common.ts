/**
 * Common type definitions used across the application
 */

// Image input for AI generation
export interface ImageInput {
  url: string;
  fileId?: string;
  description?: string;
  detectedRole?: 'product' | 'logo' | 'style_reference' | 'background' | 'detail' | 'unknown';
  index: number;
}

// Carousel slide data
export interface CarouselSlide {
  slideNumber: number;
  imageUrl: string;
  imageFileId?: string;
  prompt: string;
  style?: string;
  generatedAt: string;
}

// Style reference for consistent carousel generation
export interface StyleReference {
  imageUrl: string;
  styleDescription: string;
}

// AI generation result
export interface GenerationResult {
  success: boolean;
  imageBuffer?: Buffer;
  imageUrl?: string;
  generatedPrompt?: string;
  error?: string;
}

// Card generation options
export interface CardGenerationOptions {
  images: Array<{
    url: string;
    description?: string;
  }>;
  userPrompt: string;
  slideNumber: number;
  isFirstSlide: boolean;
  isEdit: boolean;
  styleReference?: string;
  previousSlides?: Array<{
    prompt: string;
  }>;
}

// Image edit options
export interface ImageEditOptions {
  imageUrl: string;
  editPrompt: string;
}

// Prompt template from database
export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[];
  category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
  is_system: boolean;
  is_active: boolean;
  updated_at: string;
}
