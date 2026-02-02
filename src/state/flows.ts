/**
 * FlowState discriminated union
 * Replaces multiple session types with a single, type-safe state representation
 */

import type { ImageInput, CarouselSlide, StyleReference } from '../core/types';

// Base flow state with common fields
interface BaseFlowState {
  sessionId: string;
  startedAt: string;
  lastUpdatedAt: string;
}

// Idle state - no active flow
export interface IdleState extends BaseFlowState {
  type: 'idle';
}

// Carousel/Card generation flow states
export interface CarouselWaitingPhotoState extends BaseFlowState {
  type: 'carousel';
  step: 'waiting_photo';
  inputImages: ImageInput[];
  isCollectingImages: boolean;
}

export interface CarouselWaitingPromptState extends BaseFlowState {
  type: 'carousel';
  step: 'waiting_prompt';
  inputImages: ImageInput[];
  originalImageUrl: string;
  originalImageFileId?: string;
}

export interface CarouselSessionState extends BaseFlowState {
  type: 'carousel';
  step: 'session';
  inputImages: ImageInput[];
  originalImageUrl: string;
  originalImageFileId?: string;
  currentSlideNumber: number;
  currentPrompt: string;
  currentEditRequest?: string;
  currentImageUrl?: string;
  currentImageFileId?: string;
  currentImageBuffer?: Buffer;
  slides: CarouselSlide[];
  styleReference?: StyleReference;
  generationCount: number;
  orderId?: string;
}

export interface CarouselNextSlideState extends BaseFlowState {
  type: 'carousel';
  step: 'next_slide';
  inputImages: ImageInput[];
  originalImageUrl: string;
  originalImageFileId?: string;
  currentSlideNumber: number;
  slides: CarouselSlide[];
  styleReference?: StyleReference;
  generationCount: number;
}

export type CarouselFlowState =
  | CarouselWaitingPhotoState
  | CarouselWaitingPromptState
  | CarouselSessionState
  | CarouselNextSlideState;

// Image edit flow states
export interface EditWaitingPhotoState extends BaseFlowState {
  type: 'edit';
  step: 'waiting_photo';
}

export interface EditWaitingPromptState extends BaseFlowState {
  type: 'edit';
  step: 'waiting_prompt';
  photoUrl: string;
  photoFileId?: string;
}

export interface EditSessionState extends BaseFlowState {
  type: 'edit';
  step: 'session';
  photoUrl: string;
  photoFileId?: string;
  prompt: string;
  lastEditedImage?: Buffer;
  lastEditedImageUrl?: string;
  orderId?: string;
  editCount: number;
}

export type EditFlowState =
  | EditWaitingPhotoState
  | EditWaitingPromptState
  | EditSessionState;

// Demo constructor flow states
export interface DemoWelcomeState extends BaseFlowState {
  type: 'demo';
  step: 'welcome';
}

export interface DemoWaitingPhotoState extends BaseFlowState {
  type: 'demo';
  step: 'waiting_photo';
}

export interface DemoConstructorState extends BaseFlowState {
  type: 'demo';
  step: 'composition' | 'visual_style' | 'atmosphere' | 'infographics' | 'text_style' | 'headline';
  photoUrl: string;
  photoFileId?: string;
  composition?: string;
  visualStyle?: string;
  atmosphere?: string;
  infographics?: string;
  textStyle?: string;
  headline?: string;
}

export interface DemoUserInputState extends BaseFlowState {
  type: 'demo';
  step: 'user_input';
  photoUrl: string;
  photoFileId?: string;
  composition: string;
  visualStyle: string;
  atmosphere: string;
  infographics: string;
  textStyle: string;
  headline: string;
}

export interface DemoGeneratingState extends BaseFlowState {
  type: 'demo';
  step: 'generating';
  photoUrl: string;
  photoFileId?: string;
  composition: string;
  visualStyle: string;
  atmosphere: string;
  infographics: string;
  textStyle: string;
  headline: string;
  productName?: string;
  mainUSP?: string;
  features?: string;
  orderId?: string;
}

export interface DemoResultState extends BaseFlowState {
  type: 'demo';
  step: 'result';
  photoUrl: string;
  photoFileId?: string;
  composition: string;
  visualStyle: string;
  atmosphere: string;
  infographics: string;
  textStyle: string;
  headline: string;
  productName?: string;
  mainUSP?: string;
  features?: string;
  generationCount: number;
  lastGeneratedImage?: Buffer;
  lastGeneratedImageUrl?: string;
  orderId?: string;
}

export interface DemoEditChoiceState extends BaseFlowState {
  type: 'demo';
  step: 'edit_choice';
  photoUrl: string;
  photoFileId?: string;
  composition: string;
  visualStyle: string;
  atmosphere: string;
  infographics: string;
  textStyle: string;
  headline: string;
  productName?: string;
  mainUSP?: string;
  features?: string;
  generationCount: number;
  lastGeneratedImage?: Buffer;
  lastGeneratedImageUrl?: string;
}

export interface DemoPaywallState extends BaseFlowState {
  type: 'demo';
  step: 'paywall';
  generationCount: number;
}

export type DemoFlowState =
  | DemoWelcomeState
  | DemoWaitingPhotoState
  | DemoConstructorState
  | DemoUserInputState
  | DemoGeneratingState
  | DemoResultState
  | DemoEditChoiceState
  | DemoPaywallState;

// Union of all flow states
export type FlowState =
  | IdleState
  | CarouselFlowState
  | EditFlowState
  | DemoFlowState;

// Type guards
export function isCarouselFlow(state: FlowState): state is CarouselFlowState {
  return state.type === 'carousel';
}

export function isEditFlow(state: FlowState): state is EditFlowState {
  return state.type === 'edit';
}

export function isDemoFlow(state: FlowState): state is DemoFlowState {
  return state.type === 'demo';
}

export function isIdleState(state: FlowState): state is IdleState {
  return state.type === 'idle';
}

// Helper to create initial state
export function createIdleState(sessionId: string): IdleState {
  const now = new Date().toISOString();
  return {
    type: 'idle',
    sessionId,
    startedAt: now,
    lastUpdatedAt: now,
  };
}
