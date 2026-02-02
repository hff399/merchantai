/**
 * Pure state transition functions
 * All state changes go through these functions for predictability
 */

import { v4 as uuidv4 } from 'uuid';
import type {
  FlowState,
  IdleState,
  CarouselWaitingPhotoState,
  CarouselWaitingPromptState,
  CarouselSessionState,
  CarouselNextSlideState,
  EditWaitingPhotoState,
  EditWaitingPromptState,
  EditSessionState,
  DemoWelcomeState,
  DemoWaitingPhotoState,
  DemoConstructorState,
  DemoUserInputState,
  DemoGeneratingState,
  DemoResultState,
  DemoEditChoiceState,
} from './flows';
import type { ImageInput, CarouselSlide, StyleReference } from '../core/types';

// Helper to update timestamp
function withTimestamp<T extends FlowState>(state: T): T {
  return { ...state, lastUpdatedAt: new Date().toISOString() };
}

// ============================================
// IDLE TRANSITIONS
// ============================================

export function toIdle(): IdleState {
  const now = new Date().toISOString();
  return {
    type: 'idle',
    sessionId: uuidv4(),
    startedAt: now,
    lastUpdatedAt: now,
  };
}

// ============================================
// CAROUSEL TRANSITIONS
// ============================================

export function startCarouselFlow(): CarouselWaitingPhotoState {
  const now = new Date().toISOString();
  return {
    type: 'carousel',
    step: 'waiting_photo',
    sessionId: uuidv4(),
    startedAt: now,
    lastUpdatedAt: now,
    inputImages: [],
    isCollectingImages: true,
  };
}

export function addCarouselImage(
  state: CarouselWaitingPhotoState,
  image: ImageInput
): CarouselWaitingPhotoState {
  return withTimestamp({
    ...state,
    inputImages: [...state.inputImages, image],
  });
}

export function finishImageCollection(
  state: CarouselWaitingPhotoState
): CarouselWaitingPromptState {
  const firstImage = state.inputImages[0];
  return withTimestamp({
    type: 'carousel',
    step: 'waiting_prompt',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    inputImages: state.inputImages,
    originalImageUrl: firstImage?.url || '',
    originalImageFileId: firstImage?.fileId,
  });
}

export function setCarouselPrompt(
  state: CarouselWaitingPromptState,
  prompt: string
): CarouselSessionState {
  return withTimestamp({
    type: 'carousel',
    step: 'session',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    inputImages: state.inputImages,
    originalImageUrl: state.originalImageUrl,
    originalImageFileId: state.originalImageFileId,
    currentSlideNumber: 1,
    currentPrompt: prompt,
    slides: [],
    generationCount: 0,
  });
}

export function updateCarouselGeneration(
  state: CarouselSessionState,
  result: {
    imageUrl?: string;
    imageFileId?: string;
    imageBuffer?: Buffer;
    orderId?: string;
  }
): CarouselSessionState {
  return withTimestamp({
    ...state,
    currentImageUrl: result.imageUrl,
    currentImageFileId: result.imageFileId,
    currentImageBuffer: result.imageBuffer,
    orderId: result.orderId,
    generationCount: state.generationCount + 1,
    currentEditRequest: undefined, // Clear edit request after generation
  });
}

export function setCarouselEditRequest(
  state: CarouselSessionState,
  editRequest: string
): CarouselSessionState {
  return withTimestamp({
    ...state,
    currentEditRequest: editRequest,
  });
}

export function finalizeCarouselSlide(
  state: CarouselSessionState
): CarouselNextSlideState {
  const newSlide: CarouselSlide = {
    slideNumber: state.currentSlideNumber,
    imageUrl: state.currentImageUrl || '',
    imageFileId: state.currentImageFileId,
    prompt: state.currentPrompt,
    generatedAt: new Date().toISOString(),
  };

  // Set style reference from first slide
  const styleReference: StyleReference | undefined =
    state.currentSlideNumber === 1 && state.currentImageUrl
      ? {
          imageUrl: state.currentImageUrl,
          styleDescription: `Style from slide 1: ${state.currentPrompt}`,
        }
      : state.styleReference;

  return withTimestamp({
    type: 'carousel',
    step: 'next_slide',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    inputImages: state.inputImages,
    originalImageUrl: state.originalImageUrl,
    originalImageFileId: state.originalImageFileId,
    currentSlideNumber: state.currentSlideNumber + 1,
    slides: [...state.slides, newSlide],
    styleReference,
    generationCount: state.generationCount,
  });
}

export function startNextSlide(
  state: CarouselNextSlideState,
  prompt: string
): CarouselSessionState {
  return withTimestamp({
    type: 'carousel',
    step: 'session',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    inputImages: state.inputImages,
    originalImageUrl: state.originalImageUrl,
    originalImageFileId: state.originalImageFileId,
    currentSlideNumber: state.currentSlideNumber,
    currentPrompt: prompt,
    slides: state.slides,
    styleReference: state.styleReference,
    generationCount: state.generationCount,
  });
}

// ============================================
// EDIT FLOW TRANSITIONS
// ============================================

export function startEditFlow(): EditWaitingPhotoState {
  const now = new Date().toISOString();
  return {
    type: 'edit',
    step: 'waiting_photo',
    sessionId: uuidv4(),
    startedAt: now,
    lastUpdatedAt: now,
  };
}

export function setEditPhoto(
  state: EditWaitingPhotoState,
  photoUrl: string,
  photoFileId?: string
): EditWaitingPromptState {
  return withTimestamp({
    type: 'edit',
    step: 'waiting_prompt',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    photoUrl,
    photoFileId,
  });
}

export function setEditPrompt(
  state: EditWaitingPromptState,
  prompt: string
): EditSessionState {
  return withTimestamp({
    type: 'edit',
    step: 'session',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    photoUrl: state.photoUrl,
    photoFileId: state.photoFileId,
    prompt,
    editCount: 0,
  });
}

export function updateEditGeneration(
  state: EditSessionState,
  result: {
    editedImage?: Buffer;
    editedImageUrl?: string;
    orderId?: string;
  }
): EditSessionState {
  return withTimestamp({
    ...state,
    lastEditedImage: result.editedImage,
    lastEditedImageUrl: result.editedImageUrl,
    orderId: result.orderId,
    editCount: state.editCount + 1,
  });
}

export function updateEditPrompt(
  state: EditSessionState,
  newPrompt: string
): EditSessionState {
  return withTimestamp({
    ...state,
    prompt: newPrompt,
  });
}

// ============================================
// DEMO FLOW TRANSITIONS
// ============================================

export function startDemoFlow(): DemoWelcomeState {
  const now = new Date().toISOString();
  return {
    type: 'demo',
    step: 'welcome',
    sessionId: uuidv4(),
    startedAt: now,
    lastUpdatedAt: now,
  };
}

export function demoToWaitingPhoto(state: DemoWelcomeState): DemoWaitingPhotoState {
  return withTimestamp({
    type: 'demo',
    step: 'waiting_photo',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
  });
}

export function setDemoPhoto(
  state: DemoWaitingPhotoState,
  photoUrl: string,
  photoFileId?: string
): DemoConstructorState {
  return withTimestamp({
    type: 'demo',
    step: 'composition',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    photoUrl,
    photoFileId,
  });
}

export function setDemoChoice(
  state: DemoConstructorState,
  field: 'composition' | 'visualStyle' | 'atmosphere' | 'infographics' | 'textStyle' | 'headline',
  value: string
): DemoConstructorState | DemoUserInputState {
  const nextStepMap: Record<string, DemoConstructorState['step'] | 'user_input'> = {
    composition: 'visual_style',
    visualStyle: 'atmosphere',
    atmosphere: 'infographics',
    infographics: 'text_style',
    textStyle: 'headline',
    headline: 'user_input',
  };

  const nextStep = nextStepMap[field];
  const updatedState = { ...state, [field]: value };

  if (nextStep === 'user_input') {
    // All choices made, move to user input
    return withTimestamp({
      type: 'demo',
      step: 'user_input',
      sessionId: state.sessionId,
      startedAt: state.startedAt,
      lastUpdatedAt: new Date().toISOString(),
      photoUrl: state.photoUrl,
      photoFileId: state.photoFileId,
      composition: updatedState.composition || '',
      visualStyle: updatedState.visualStyle || '',
      atmosphere: updatedState.atmosphere || '',
      infographics: updatedState.infographics || '',
      textStyle: updatedState.textStyle || '',
      headline: value,
    });
  }

  return withTimestamp({
    ...updatedState,
    step: nextStep as DemoConstructorState['step'],
    lastUpdatedAt: new Date().toISOString(),
  });
}

export function setDemoUserInput(
  state: DemoUserInputState,
  productName: string,
  mainUSP: string,
  features: string
): DemoGeneratingState {
  return withTimestamp({
    type: 'demo',
    step: 'generating',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    photoUrl: state.photoUrl,
    photoFileId: state.photoFileId,
    composition: state.composition,
    visualStyle: state.visualStyle,
    atmosphere: state.atmosphere,
    infographics: state.infographics,
    textStyle: state.textStyle,
    headline: state.headline,
    productName,
    mainUSP,
    features,
  });
}

export function demoGenerationComplete(
  state: DemoGeneratingState,
  result: {
    generatedImage?: Buffer;
    generatedImageUrl?: string;
    orderId?: string;
  },
  generationCount: number
): DemoResultState {
  return withTimestamp({
    type: 'demo',
    step: 'result',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    photoUrl: state.photoUrl,
    photoFileId: state.photoFileId,
    composition: state.composition,
    visualStyle: state.visualStyle,
    atmosphere: state.atmosphere,
    infographics: state.infographics,
    textStyle: state.textStyle,
    headline: state.headline,
    productName: state.productName,
    mainUSP: state.mainUSP,
    features: state.features,
    generationCount,
    lastGeneratedImage: result.generatedImage,
    lastGeneratedImageUrl: result.generatedImageUrl,
    orderId: result.orderId,
  });
}

export function demoToEditChoice(state: DemoResultState): DemoEditChoiceState {
  return withTimestamp({
    type: 'demo',
    step: 'edit_choice',
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    photoUrl: state.photoUrl,
    photoFileId: state.photoFileId,
    composition: state.composition,
    visualStyle: state.visualStyle,
    atmosphere: state.atmosphere,
    infographics: state.infographics,
    textStyle: state.textStyle,
    headline: state.headline,
    productName: state.productName,
    mainUSP: state.mainUSP,
    features: state.features,
    generationCount: state.generationCount,
    lastGeneratedImage: state.lastGeneratedImage,
    lastGeneratedImageUrl: state.lastGeneratedImageUrl,
  });
}

export function demoEditToConstructor(
  state: DemoEditChoiceState,
  step: DemoConstructorState['step']
): DemoConstructorState {
  return withTimestamp({
    type: 'demo',
    step,
    sessionId: state.sessionId,
    startedAt: state.startedAt,
    lastUpdatedAt: new Date().toISOString(),
    photoUrl: state.photoUrl,
    photoFileId: state.photoFileId,
    composition: state.composition,
    visualStyle: state.visualStyle,
    atmosphere: state.atmosphere,
    infographics: state.infographics,
    textStyle: state.textStyle,
    headline: state.headline,
  });
}
