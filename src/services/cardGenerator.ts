import { openai } from './openai';
import { gemini, AspectRatio } from './gemini';

export { AspectRatio };

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
  previousSlides?: Array<{ prompt: string; imageUrl?: string }>; // Prompts AND image URLs
  aspectRatio?: AspectRatio; // Supported: '1:1', '3:4', '4:3', '9:16', '16:9'
  referenceImages?: string[]; // URLs of example infographics to show as references
  skipImageAnalysis?: boolean; // Skip GPT Vision analysis (faster, cheaper)
}

/**
 * Parameters for card copying (template_copy mode)
 * Bypasses GPT Vision analysis and Prompt Architect for faster, cheaper copying
 */
export interface CardCopyParams {
  templateImageUrl: string; // The card/infographic to copy
  productImageUrl: string; // The new product to insert
  aspectRatio?: AspectRatio;
  modifications?: {
    background?: string; // "изменить фон на синий", "gradient background"
    badges?: string; // "поменять плашки местами", "убрать плашку скидки"
    effects?: string; // "добавить тень", "убрать блик"
    text?: string; // "изменить текст на...", "другой копирайт"
    other?: string; // Any other specific modification
  };
}

export interface CardGenerationResult {
  success: boolean;
  imageBuffer?: Buffer;
  mimeType?: string;
  generatedPrompt?: string;
  detectedIntent?: string;
  error?: string;
}

// Helper to generate aspect ratio instruction for prompts
const getAspectRatioInstruction = (ratio: AspectRatio = '3:4'): string => {
  const descriptions: Record<AspectRatio, string> = {
    '1:1': 'square',
    '3:4': 'portrait, width:height = 3:4',
    '4:3': 'landscape, width:height = 4:3',
    '9:16': 'tall portrait, width:height = 9:16',
    '16:9': 'wide landscape, width:height = 16:9',
  };
  return `Output image aspect ratio: ${ratio} (${descriptions[ratio]})`;
};

class CardGeneratorService {
  /**
   * Generate a marketplace card/infographic using GPT Prompt Architect
   *
   * NEW ARCHITECTURE:
   * 1. Collect all images (user images + references)
   * 2. Optionally analyze images with GPT Vision
   * 3. Send everything to Prompt Architect (GPT) to generate optimal Gemini prompt
   * 4. Send prompt + images to Gemini
   *
   * The Prompt Architect understands ANY user request and generates the best prompt.
   */
  async generateCard(params: CardGenerationParams): Promise<CardGenerationResult> {
    const {
      images,
      userPrompt,
      // These are kept in interface for API compatibility but handled by Prompt Architect
      slideNumber: _slideNumber,
      isFirstSlide = true,
      isEdit = false,
      styleReference: _styleReference,
      previousSlides,
      aspectRatio = '3:4',
      referenceImages = [],
      skipImageAnalysis = false,
    } = params;
    // Note: slideNumber and styleReference are passed to Prompt Architect via previousSlides context
    void _slideNumber;
    void _styleReference;

    if (images.length === 0) {
      return { success: false, error: 'At least one image is required' };
    }

    // Total images = user images + reference images (max 8 total for Gemini)
    const totalImages = images.length + referenceImages.length;
    if (totalImages > 8) {
      return {
        success: false,
        error: `Maximum 8 images total. You have ${images.length} product images and ${referenceImages.length} references.`,
      };
    }

    try {
      const mode = isEdit ? 'EDIT' : isFirstSlide ? 'CREATE' : 'SLIDE';
      console.log(`\n[CardGenerator] ========== ${mode} MODE (PROMPT ARCHITECT) ==========`);
      console.log(`[CardGenerator] User prompt: ${userPrompt.substring(0, 100)}${userPrompt.length > 100 ? '...' : ''}`);
      console.log(`[CardGenerator] Images: ${images.length} user + ${referenceImages.length} references`);

      // Prepare all image URLs
      const previousSlideUrls = (previousSlides || [])
        .filter(s => s.imageUrl)
        .map(s => s.imageUrl as string);

      const allImageUrls = [...images.map(img => img.url), ...referenceImages, ...previousSlideUrls];

      console.log(`[CardGenerator] Total images for Gemini: ${allImageUrls.length}`);

      // STEP 1: Optionally analyze images with GPT Vision
      let imageDescriptions: Array<{ index: number; description: string; role: string }> = [];

      if (!skipImageAnalysis && allImageUrls.length > 0) {
        console.log(`[CardGenerator] Analyzing images with GPT Vision...`);
        try {
          const analysisResults = await openai.analyzeImagesForArchitect(allImageUrls);
          imageDescriptions = analysisResults.map(r => ({
            index: r.index,
            description: r.description,
            role: r.role,
          }));
          console.log(`[CardGenerator] Image analysis complete`);
        } catch (err) {
          console.warn(`[CardGenerator] Image analysis failed, proceeding without:`, err);
        }
      }

      // STEP 2: Get previous slide style if available (for carousel consistency)
      let previousSlideStyle: string | undefined;
      if (previousSlides && previousSlides.length > 0 && previousSlides[0].prompt) {
        previousSlideStyle = previousSlides[0].prompt;
      }

      // STEP 3: Use Prompt Architect to generate optimal Gemini prompt
      console.log(`[CardGenerator] Invoking Prompt Architect...`);

      const architectResult = await openai.generateGeminiPrompt({
        userPrompt,
        imageCount: allImageUrls.length,
        imageDescriptions,
        aspectRatio,
        isEdit,
        previousSlideStyle,
      });

      const finalPrompt = architectResult.geminiPrompt;
      const detectedIntent = architectResult.detectedIntent;

      console.log(`[CardGenerator] Prompt Architect detected intent: ${detectedIntent}`);
      console.log(`[CardGenerator] Generated prompt length: ${finalPrompt.length} chars`);

      // STEP 4: Generate image using Gemini
      console.log(`\n[CardGenerator] ========== SENDING TO GEMINI ==========`);
      console.log(`[CardGenerator] Total images: ${allImageUrls.length}`);
      console.log(`[CardGenerator] Aspect ratio: ${aspectRatio}`);
      console.log(`[CardGenerator] Image URLs:`);
      allImageUrls.forEach((url, i) => {
        let type = 'USER';
        if (i >= images.length && i < images.length + referenceImages.length) type = 'REFERENCE';
        else if (i >= images.length + referenceImages.length) type = 'PREV_SLIDE';
        console.log(`[CardGenerator]   ${i + 1}. [${type}] ${url.substring(0, 60)}...`);
      });
      console.log(`[CardGenerator] Final prompt preview:\n${finalPrompt.substring(0, 400)}...`);
      console.log(`[CardGenerator] ==========================================\n`);

      const result = await gemini.generateImageFromUrls(finalPrompt, allImageUrls, { aspectRatio });

      if (!result.success) {
        console.error(`[CardGenerator] Gemini failed: ${result.error}`);
        return {
          success: false,
          error: result.error,
          generatedPrompt: finalPrompt,
          detectedIntent,
        };
      }

      console.log(`[CardGenerator] Image generated successfully`);

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: finalPrompt,
        detectedIntent,
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
   * LEGACY: Generate card without Prompt Architect (old flow)
   * Kept for backward compatibility
   */
  async generateCardLegacy(params: CardGenerationParams): Promise<CardGenerationResult> {
    // This preserves the old logic if needed
    return this.generateCard({ ...params, skipImageAnalysis: true });
  }

  /**
   * Generate carousel slide with style consistency
   */
  async generateCarouselSlide(params: CardGenerationParams): Promise<CardGenerationResult> {
    return this.generateCard(params);
  }

  /**
   * Edit existing card using Prompt Architect
   * Sends: product photo + current card + user's edit request
   */
  async editCard(
    productImageUrl: string,
    currentCardUrl: string,
    editRequest: string,
    aspectRatio: AspectRatio = '3:4'
  ): Promise<CardGenerationResult> {
    console.log(`\n[CardGenerator] ========== EDIT CARD ==========`);
    console.log(`[CardGenerator] Edit request: ${editRequest}`);

    // Use the main generateCard with isEdit flag
    return this.generateCard({
      images: [
        { url: productImageUrl, description: 'Original product photo' },
        { url: currentCardUrl, description: 'Current card design to edit' },
      ],
      userPrompt: editRequest,
      isEdit: true,
      aspectRatio,
    });
  }

  /**
   * Simple image edit (single image + prompt) - direct Gemini call
   */
  async editImage(imageUrl: string, editPrompt: string, aspectRatio: AspectRatio = '3:4'): Promise<CardGenerationResult> {
    try {
      console.log(`[CardGenerator] Editing image...`);
      console.log(`[CardGenerator] Aspect ratio: ${aspectRatio}`);

      const ASPECT_RATIO = getAspectRatioInstruction(aspectRatio);

      // Add aspect ratio to simple edit
      const promptWithRatio = `${editPrompt}\n\n${ASPECT_RATIO}`;
      const result = await gemini.editImage(promptWithRatio, imageUrl, { aspectRatio });

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
   * Quick edit - FAST MODE with intelligent instruction translation
   *
   * Translates user instructions to Gemini-friendly format before sending.
   * Bypasses Prompt Architect for faster, cheaper edits.
   *
   * Perfect for:
   * - Size changes: "сделай товар больше" → "product occupies 85% of frame height"
   * - Position changes: "подвинь влево" → "reposition product to left third of frame"
   * - Simple effects: "добавь тень" → "add soft drop shadow"
   * - Background changes: "темнее фон" → "darken background significantly"
   *
   * NOT suitable for:
   * - Complex multi-element changes
   * - Style transfers
   * - New card generation
   */
  async quickEdit(
    imageUrl: string,
    userInstruction: string,
    aspectRatio: AspectRatio = '3:4'
  ): Promise<CardGenerationResult> {
    console.log(`\n[CardGenerator] ========== QUICK_EDIT MODE (FAST) ==========`);
    console.log(`[CardGenerator] Image: ${imageUrl.substring(0, 60)}...`);
    console.log(`[CardGenerator] User instruction: "${userInstruction}"`);

    try {
      // Translate user instruction to Gemini-friendly format
      console.log(`[CardGenerator] Translating instruction for Gemini...`);
      const translation = await openai.translateEditInstruction(userInstruction);

      console.log(`[CardGenerator] Original: "${userInstruction}"`);
      console.log(`[CardGenerator] Translated: "${translation.geminiPrompt}"`);
      console.log(`[CardGenerator] Intent: ${translation.originalIntent}`);

      // Build prompt with translated instruction
      const prompt = `=== TASK ===
Edit the provided image according to the following instruction.

=== IMAGE ===
IMAGE 1: The card/image to edit - preserve all elements except those explicitly changed

=== EDIT INSTRUCTION ===
${translation.geminiPrompt}

=== CRITICAL RULES ===
1. Make ONLY the requested change - preserve everything else exactly
2. Do not alter text content unless specifically instructed
3. Do not change colors/style unless specifically instructed
4. Maintain professional marketplace quality
5. All text must remain in Russian

=== OUTPUT ===
Aspect ratio: ${aspectRatio}
Professional quality, ready for marketplace

=== DO NOT ===
- Add elements not requested
- Remove elements not requested
- Change layout unless requested
- Alter the overall design style`;

      console.log(`[CardGenerator] Generated edit prompt (${prompt.length} chars)`);

      // Send directly to Gemini
      const result = await gemini.generateImageFromUrls(prompt, [imageUrl], { aspectRatio });

      if (!result.success) {
        console.error(`[CardGenerator] Quick edit failed: ${result.error}`);
        return {
          success: false,
          error: result.error,
          generatedPrompt: prompt,
          detectedIntent: 'quick_edit',
        };
      }

      console.log(`[CardGenerator] Quick edit successful`);

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: prompt,
        detectedIntent: 'quick_edit',
      };
    } catch (error: any) {
      console.error('[CardGenerator] Quick edit error:', error.message);
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
    imageDescription?: string,
    aspectRatio?: AspectRatio
  ): Promise<CardGenerationResult> {
    return this.generateCard({
      images: [{ url: imageUrl, description: imageDescription }],
      userPrompt,
      aspectRatio,
    });
  }

  /**
   * Generate from template using Prompt Architect
   * Replaces the product in an existing card/infographic with a new product
   *
   * Prompt Architect will understand that this is a template copy scenario
   * and generate appropriate instructions for Gemini.
   *
   * @deprecated Use copyCard() instead for faster, cheaper copying without GPT overhead
   */
  async generateFromTemplate(params: {
    templateImageUrl: string; // The card/infographic to use as base
    productImageUrl: string; // The new product to insert
    userPrompt: string; // User's description/instructions
    aspectRatio?: AspectRatio;
  }): Promise<CardGenerationResult> {
    const { templateImageUrl, productImageUrl, userPrompt, aspectRatio = '3:4' } = params;

    console.log(`\n[CardGenerator] ========== TEMPLATE_COPY MODE ==========`);
    console.log(`[CardGenerator] User prompt: ${userPrompt}`);

    // Use main generateCard - Prompt Architect will understand the intent
    // based on images (product + card) and user prompt
    return this.generateCard({
      images: [
        { url: productImageUrl, description: 'Product photo to insert' },
        { url: templateImageUrl, description: 'Template card to copy design from' },
      ],
      userPrompt: userPrompt || 'Скопируй эту карточку, замени товар на мой',
      aspectRatio,
    });
  }

  /**
   * Copy card with product replacement - FAST MODE
   *
   * This method bypasses GPT Vision analysis and Prompt Architect entirely.
   * Uses a simple, fixed prompt optimized for card copying.
   * Supports targeted modifications (background, badges, effects, text).
   *
   * Modifications are automatically translated via GPT to Gemini-friendly format
   * (e.g., "на 20% больше" → "product occupies 85% of frame height")
   *
   * Use this for:
   * - "Скопируй эту карточку, замени товар"
   * - "Перенеси мой товар на эту карточку"
   * - "Сделай такую же карточку с моим товаром"
   * - Plus optional modifications like "измени фон", "поменяй плашки"
   */
  async copyCard(params: CardCopyParams): Promise<CardGenerationResult> {
    const {
      templateImageUrl,
      productImageUrl,
      aspectRatio = '3:4',
      modifications,
    } = params;

    console.log(`\n[CardGenerator] ========== COPY_CARD MODE (FAST) ==========`);
    console.log(`[CardGenerator] Template: ${templateImageUrl.substring(0, 60)}...`);
    console.log(`[CardGenerator] Product: ${productImageUrl.substring(0, 60)}...`);
    console.log(`[CardGenerator] Modifications:`, modifications || 'none');

    try {
      // Translate modifications to Gemini-friendly format if present
      let translatedMods = modifications;
      if (modifications && Object.keys(modifications).length > 0) {
        console.log(`[CardGenerator] Translating modifications for Gemini...`);
        translatedMods = await openai.translateModifications(modifications);
        console.log(`[CardGenerator] Translated modifications:`, translatedMods);
      }

      // Build simple, focused prompt for copying
      let prompt = `=== TASK ===
Copy the design of IMAGE 1 (template card) exactly, but replace the product with the product from IMAGE 2.

=== IMAGE ROLES ===
IMAGE 1: Template card - copy ALL design elements from this (background, colors, badges, layout, effects, typography)
IMAGE 2: New product - extract this product and place it in the card

=== CRITICAL INSTRUCTIONS ===
1. COPY the template card design EXACTLY - same layout, same colors, same badge positions, same effects
2. REPLACE ONLY the product - keep everything else identical
3. Product size and position should match the original product placement
4. All text, badges, decorations must be IDENTICAL to template
5. Background, gradients, shadows - copy exactly

=== DESIGN PRESERVATION ===
- Background: Copy exactly from template
- Badges/Labels: Same text, same positions, same colors
- Typography: Same fonts, same sizes, same positions
- Effects: Same shadows, glows, reflections
- Layout: Identical composition`;

      // Add translated modifications if specified
      if (translatedMods && Object.keys(translatedMods).length > 0) {
        prompt += `\n\n=== REQUESTED MODIFICATIONS ===`;

        if (translatedMods.background) {
          prompt += `\nBACKGROUND: ${translatedMods.background}`;
        }
        if (translatedMods.badges) {
          prompt += `\nBADGES/LABELS: ${translatedMods.badges}`;
        }
        if (translatedMods.effects) {
          prompt += `\nEFFECTS: ${translatedMods.effects}`;
        }
        if (translatedMods.text) {
          prompt += `\nTEXT: ${translatedMods.text}`;
        }
        if (translatedMods.other) {
          prompt += `\nOTHER: ${translatedMods.other}`;
        }

        prompt += `\n\nApply these modifications while keeping everything else identical to the template.`;
      }

      prompt += `

=== OUTPUT ===
- Aspect ratio: ${aspectRatio}
- Professional quality, ready for marketplace
- All text must be in Russian (same as template)

=== NEGATIVE PROMPT ===
- Do NOT change design elements unless specified in modifications
- Do NOT add new elements not in the template
- Do NOT change text content unless specified
- Do NOT alter color scheme unless specified`;

      console.log(`[CardGenerator] Generated copy prompt (${prompt.length} chars)`);
      console.log(`[CardGenerator] Prompt preview:\n${prompt.substring(0, 500)}...`);

      // Send directly to Gemini - no GPT Vision, no Prompt Architect
      const result = await gemini.generateImageFromUrls(
        prompt,
        [templateImageUrl, productImageUrl], // Template first, product second
        { aspectRatio }
      );

      if (!result.success) {
        console.error(`[CardGenerator] Copy failed: ${result.error}`);
        return {
          success: false,
          error: result.error,
          generatedPrompt: prompt,
          detectedIntent: 'copy_card',
        };
      }

      console.log(`[CardGenerator] Card copied successfully`);

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: prompt,
        detectedIntent: 'copy_card',
      };
    } catch (error: any) {
      console.error('[CardGenerator] Copy error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export const cardGenerator = new CardGeneratorService();