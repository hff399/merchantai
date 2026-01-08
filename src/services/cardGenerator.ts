import { openai } from './openai';
import { gemini } from './gemini';

export interface ImageInput {
  url: string;
  description?: string; // User's caption for the image
}

export interface CardGenerationParams {
  images: ImageInput[];
  userPrompt: string;
  slideNumber?: number;
  isFirstSlide?: boolean;
  isEdit?: boolean; // True when editing existing card (uses only product + current card)
  styleReference?: string;
  previousSlides?: Array<{ prompt: string }>;
}

export interface CardGenerationResult {
  success: boolean;
  imageBuffer?: Buffer;
  mimeType?: string;
  generatedPrompt?: string;
  error?: string;
}

// Aspect ratio instruction to append to all prompts
const ASPECT_RATIO = 'Output image aspect ratio: 3:4 (portrait, width:height = 3:4)';

class CardGeneratorService {
  /**
   * Generate a marketplace card/infographic
   * 
   * Modes:
   * - isEdit=true: DIRECT to Gemini (no OpenAI) - user's edit request sent as-is
   * - isFirstSlide=true: OpenAI generates prompt → Gemini generates image
   * - else: OpenAI generates prompt for next slide → Gemini generates image
   */
  async generateCard(params: CardGenerationParams): Promise<CardGenerationResult> {
    const {
      images,
      userPrompt,
      slideNumber = 1,
      isFirstSlide = true,
      isEdit = false,
      styleReference,
      previousSlides,
    } = params;

    if (images.length === 0) {
      return { success: false, error: 'At least one image is required' };
    }

    if (images.length > 8) {
      return { success: false, error: 'Maximum 8 images allowed' };
    }

    try {
      const mode = isEdit ? 'EDIT' : (isFirstSlide ? 'CREATE' : 'SLIDE');
      console.log(`\n[CardGenerator] ========== ${mode} MODE ==========`);
      console.log(`[CardGenerator] User prompt: ${userPrompt.substring(0, 100)}${userPrompt.length > 100 ? '...' : ''}`);
      console.log(`[CardGenerator] Images: ${images.length}`);
      images.forEach((img, i) => {
        console.log(`[CardGenerator]   Image ${i + 1}: ${img.description || '(no description)'}`);
      });

      let finalPrompt: string;

      if (isEdit) {
        // EDIT MODE: Skip OpenAI, send user's edit request directly to Gemini
        finalPrompt = `Edit this product card image.

IMAGE 1: Original product photo - keep the product exactly as shown, do not modify it
IMAGE 2: Current card design - apply the requested changes to this card

EDIT REQUEST: ${userPrompt}

Important: Preserve the product from IMAGE 1 unchanged. Only modify the card design according to the edit request.

${ASPECT_RATIO}`;
        
        console.log(`[CardGenerator] EDIT MODE - Skipping OpenAI, sending directly to Gemini`);
      } else {
        // CREATE/SLIDE MODE: Use OpenAI to generate optimized prompt
        console.log(`[CardGenerator] Using OpenAI to generate prompt...`);
        
        finalPrompt = await openai.generateImagePrompt({
          userPrompt,
          images: images.map(img => ({ description: img.description })),
          slideNumber,
          isFirstSlide,
          isEdit: false,
          styleReference,
          previousSlides,
        });

        // Append aspect ratio to OpenAI-generated prompt
        finalPrompt = `${finalPrompt}\n\n${ASPECT_RATIO}\n\n
        - If texts on the card aren't clear – regenerate
        - If you've repeated the same element twice – regenerate
        - If there's any problems that make card not ready to post on marketplace right now – regenerate
      `;

        console.log(`[CardGenerator] OpenAI generated prompt (${finalPrompt.length} chars)`);
      }

      // Generate image using Gemini
      console.log(`[CardGenerator] Sending to Gemini with ${images.length} input images...`);
      
      const imageUrls = images.map(img => img.url);
      const result = await gemini.generateImageFromUrls(finalPrompt, imageUrls);

      if (!result.success) {
        console.error(`[CardGenerator] Gemini failed: ${result.error}`);
        return {
          success: false,
          error: result.error,
          generatedPrompt: finalPrompt,
        };
      }

      console.log(`[CardGenerator] Image generated successfully`);

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: finalPrompt,
      };
    } catch (error: any) {
      console.error('[CardGenerator] Error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate carousel slide with style consistency
   */
  async generateCarouselSlide(params: CardGenerationParams): Promise<CardGenerationResult> {
    return this.generateCard(params);
  }

  /**
   * Edit existing card - DIRECT to Gemini (no OpenAI)
   * Sends: product photo + current card + user's edit request
   */
  async editCard(
    productImageUrl: string,
    currentCardUrl: string,
    editRequest: string
  ): Promise<CardGenerationResult> {
    console.log(`\n[CardGenerator] ========== EDIT CARD ==========`);
    console.log(`[CardGenerator] Edit request: ${editRequest}`);
    
    const finalPrompt = `Edit this product card image.

IMAGE 1: Original product photo - keep the product exactly as shown, do not modify it
IMAGE 2: Current card design - apply the requested changes to this card

EDIT REQUEST: ${editRequest}

Important: Preserve the product from IMAGE 1 unchanged. Only modify the card design according to the edit request.

${ASPECT_RATIO}`;

    const result = await gemini.generateImageFromUrls(finalPrompt, [productImageUrl, currentCardUrl]);
    
    return {
      success: result.success,
      imageBuffer: result.imageBuffer,
      mimeType: result.mimeType,
      generatedPrompt: finalPrompt,
      error: result.error,
    };
  }

  /**
   * Simple image edit (single image + prompt) - direct Gemini call
   */
  async editImage(imageUrl: string, editPrompt: string): Promise<CardGenerationResult> {
    try {
      console.log(`[CardGenerator] Editing image...`);

      // Add aspect ratio to simple edit
      const promptWithRatio = `${editPrompt}\n\n${ASPECT_RATIO}`;
      const result = await gemini.editImage(promptWithRatio, imageUrl);

      if (!result.success) {
        return {
          success: false,
          error: result.error,
        };
      }

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: promptWithRatio,
      };
    } catch (error: any) {
      console.error('[CardGenerator] Edit error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate with enhanced prompt (uses OpenAI for prompt, then Gemini)
   */
  async generateWithEnhancedPrompt(
    imageUrl: string,
    userPrompt: string,
    imageDescription?: string
  ): Promise<CardGenerationResult> {
    return this.generateCard({
      images: [{ url: imageUrl, description: imageDescription }],
      userPrompt,
    });
  }
}

export const cardGenerator = new CardGeneratorService();