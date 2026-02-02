/**
 * FlowManager class
 * Manages flow state within a user session
 */

import type { FlowState, CarouselFlowState, EditFlowState, DemoFlowState } from './flows';
import { createIdleState, isCarouselFlow, isEditFlow, isDemoFlow } from './flows';
import * as transitions from './transitions';
import type { ImageInput } from '../core/types';

export class FlowManager {
  private state: FlowState;

  constructor(sessionId?: string) {
    this.state = createIdleState(sessionId || this.generateSessionId());
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Get current state
  getState(): FlowState {
    return this.state;
  }

  // Get flow type
  getFlowType(): FlowState['type'] {
    return this.state.type;
  }

  // Check if in specific flow
  isInCarousel(): boolean {
    return isCarouselFlow(this.state);
  }

  isInEdit(): boolean {
    return isEditFlow(this.state);
  }

  isInDemo(): boolean {
    return isDemoFlow(this.state);
  }

  isIdle(): boolean {
    return this.state.type === 'idle';
  }

  // Reset to idle
  reset(): void {
    this.state = transitions.toIdle();
  }

  // ============================================
  // CAROUSEL FLOW METHODS
  // ============================================

  startCarousel(): void {
    this.state = transitions.startCarouselFlow();
  }

  addCarouselImage(image: ImageInput): void {
    if (this.state.type === 'carousel' && this.state.step === 'waiting_photo') {
      this.state = transitions.addCarouselImage(this.state, image);
    }
  }

  finishImageCollection(): void {
    if (this.state.type === 'carousel' && this.state.step === 'waiting_photo') {
      this.state = transitions.finishImageCollection(this.state);
    }
  }

  setCarouselPrompt(prompt: string): void {
    if (this.state.type === 'carousel' && this.state.step === 'waiting_prompt') {
      this.state = transitions.setCarouselPrompt(this.state, prompt);
    }
  }

  updateCarouselGeneration(result: {
    imageUrl?: string;
    imageFileId?: string;
    imageBuffer?: Buffer;
    orderId?: string;
  }): void {
    if (this.state.type === 'carousel' && this.state.step === 'session') {
      this.state = transitions.updateCarouselGeneration(this.state, result);
    }
  }

  setCarouselEditRequest(editRequest: string): void {
    if (this.state.type === 'carousel' && this.state.step === 'session') {
      this.state = transitions.setCarouselEditRequest(this.state, editRequest);
    }
  }

  finalizeCarouselSlide(): void {
    if (this.state.type === 'carousel' && this.state.step === 'session') {
      this.state = transitions.finalizeCarouselSlide(this.state);
    }
  }

  startNextSlide(prompt: string): void {
    if (this.state.type === 'carousel' && this.state.step === 'next_slide') {
      this.state = transitions.startNextSlide(this.state, prompt);
    }
  }

  getCarouselState(): CarouselFlowState | null {
    return isCarouselFlow(this.state) ? this.state : null;
  }

  // ============================================
  // EDIT FLOW METHODS
  // ============================================

  startEdit(): void {
    this.state = transitions.startEditFlow();
  }

  setEditPhoto(photoUrl: string, photoFileId?: string): void {
    if (this.state.type === 'edit' && this.state.step === 'waiting_photo') {
      this.state = transitions.setEditPhoto(this.state, photoUrl, photoFileId);
    }
  }

  setEditPrompt(prompt: string): void {
    if (this.state.type === 'edit' && this.state.step === 'waiting_prompt') {
      this.state = transitions.setEditPrompt(this.state, prompt);
    }
  }

  updateEditGeneration(result: {
    editedImage?: Buffer;
    editedImageUrl?: string;
    orderId?: string;
  }): void {
    if (this.state.type === 'edit' && this.state.step === 'session') {
      this.state = transitions.updateEditGeneration(this.state, result);
    }
  }

  updateEditPrompt(newPrompt: string): void {
    if (this.state.type === 'edit' && this.state.step === 'session') {
      this.state = transitions.updateEditPrompt(this.state, newPrompt);
    }
  }

  getEditState(): EditFlowState | null {
    return isEditFlow(this.state) ? this.state : null;
  }

  // ============================================
  // DEMO FLOW METHODS
  // ============================================

  startDemo(): void {
    this.state = transitions.startDemoFlow();
  }

  demoToWaitingPhoto(): void {
    if (this.state.type === 'demo' && this.state.step === 'welcome') {
      this.state = transitions.demoToWaitingPhoto(this.state);
    }
  }

  setDemoPhoto(photoUrl: string, photoFileId?: string): void {
    if (this.state.type === 'demo' && this.state.step === 'waiting_photo') {
      this.state = transitions.setDemoPhoto(this.state, photoUrl, photoFileId);
    }
  }

  setDemoChoice(
    field: 'composition' | 'visualStyle' | 'atmosphere' | 'infographics' | 'textStyle' | 'headline',
    value: string
  ): void {
    if (
      this.state.type === 'demo' &&
      ['composition', 'visual_style', 'atmosphere', 'infographics', 'text_style', 'headline'].includes(
        this.state.step
      )
    ) {
      this.state = transitions.setDemoChoice(
        this.state as any, // Type narrowing is complex here
        field,
        value
      );
    }
  }

  setDemoUserInput(productName: string, mainUSP: string, features: string): void {
    if (this.state.type === 'demo' && this.state.step === 'user_input') {
      this.state = transitions.setDemoUserInput(this.state, productName, mainUSP, features);
    }
  }

  demoGenerationComplete(
    result: {
      generatedImage?: Buffer;
      generatedImageUrl?: string;
      orderId?: string;
    },
    generationCount: number
  ): void {
    if (this.state.type === 'demo' && this.state.step === 'generating') {
      this.state = transitions.demoGenerationComplete(this.state, result, generationCount);
    }
  }

  demoToEditChoice(): void {
    if (this.state.type === 'demo' && this.state.step === 'result') {
      this.state = transitions.demoToEditChoice(this.state);
    }
  }

  demoEditToConstructor(
    step: 'composition' | 'visual_style' | 'atmosphere' | 'infographics' | 'text_style' | 'headline'
  ): void {
    if (this.state.type === 'demo' && this.state.step === 'edit_choice') {
      this.state = transitions.demoEditToConstructor(this.state, step);
    }
  }

  getDemoState(): DemoFlowState | null {
    return isDemoFlow(this.state) ? this.state : null;
  }

  // ============================================
  // SERIALIZATION
  // ============================================

  // Serialize state for session storage (excludes Buffer)
  serialize(): Record<string, unknown> {
    const state = { ...this.state } as Record<string, unknown>;

    // Remove Buffer fields for serialization
    if ('currentImageBuffer' in state) {
      delete state.currentImageBuffer;
    }
    if ('lastEditedImage' in state) {
      delete state.lastEditedImage;
    }
    if ('lastGeneratedImage' in state) {
      delete state.lastGeneratedImage;
    }

    return state;
  }

  // Restore state from serialized data
  static fromSerialized(data: Record<string, unknown>): FlowManager {
    const manager = new FlowManager();
    manager.state = data as unknown as FlowState;
    return manager;
  }
}

// Factory function for creating flow manager
export function createFlowManager(sessionId?: string): FlowManager {
  return new FlowManager(sessionId);
}
