import OpenAI from 'openai';
import { config } from '../config';
import { promptsService } from './prompts';

export interface ImageInput {
  description?: string; // User's caption for the image
}

export interface PromptGenerationParams {
  userPrompt: string;
  images: ImageInput[];
  slideNumber: number;
  isFirstSlide: boolean;
  isEdit?: boolean; // True when editing an existing card
  styleReference?: string;
  previousSlides?: Array<{ prompt: string }>;
}

export interface ImageIntentClassification {
  intent: 'create_new' | 'style_transfer' | 'template_copy' | 'edit_existing';
  confidence: number;
  reasoning: string;
}

/**
 * Check if an edit instruction is "simple" enough for quickEdit
 * Simple = single-element changes that don't require full Prompt Architect
 */
export function isSimpleEditInstruction(instruction: string): boolean {
  const lower = instruction.toLowerCase();

  // Simple size/position changes
  const sizeKeywords = ['больше', 'меньше', 'крупнее', 'мельче', 'увеличь', 'уменьши', 'larger', 'smaller', 'bigger', 'resize'];
  const positionKeywords = ['влево', 'вправо', 'вверх', 'вниз', 'подвинь', 'сдвинь', 'переместь', 'left', 'right', 'up', 'down', 'move', 'position'];
  const effectKeywords = ['тень', 'тени', 'блик', 'свечение', 'shadow', 'glow', 'highlight'];
  const backgroundKeywords = ['фон', 'background', 'темнее', 'светлее', 'darker', 'lighter'];

  const allSimpleKeywords = [...sizeKeywords, ...positionKeywords, ...effectKeywords, ...backgroundKeywords];

  // Check if instruction contains simple keywords
  const hasSimpleKeyword = allSimpleKeywords.some(kw => lower.includes(kw));

  // Check for complex instructions that need Prompt Architect
  const complexKeywords = ['карточку', 'карточка', 'стиль', 'дизайн', 'инфографик', 'создай', 'сгенерируй', 'card', 'style', 'design', 'infographic', 'create', 'generate'];
  const hasComplexKeyword = complexKeywords.some(kw => lower.includes(kw));

  // Simple if has simple keywords and no complex keywords
  // Also check instruction length - short instructions are more likely simple
  const isShort = instruction.length < 100;

  return hasSimpleKeyword && !hasComplexKeyword && isShort;
}

class OpenAIService {
  private client: OpenAI;
  private model: string;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    });
    this.model = config.openai.model;
  }

  /**
   * Generate optimized prompt for Gemini image generation
   * Matches n8n workflow logic exactly
   *
   * Modes:
   * - isEdit=true: Uses card_edit prompts (for editing existing cards)
   * - isFirstSlide=true: Uses first_slide prompts (simple user prompt)
   * - else: Uses next_slide prompts (with carousel context)
   */
  async generateImagePrompt(params: PromptGenerationParams): Promise<string> {
    // Determine which prompts to use
    let systemPromptKey: string;
    let userPromptKey: string;

    if (params.isEdit) {
      // Edit mode: use card edit prompts
      systemPromptKey = 'card_edit_system';
      userPromptKey = 'card_edit_user';
    } else if (params.isFirstSlide) {
      // First generation - simple prompt like in n8n
      systemPromptKey = 'first_slide_system';
      userPromptKey = 'first_slide_user';
    } else {
      // Subsequent slides - with carousel context
      systemPromptKey = 'next_slide_system';
      userPromptKey = 'next_slide_user';
    }

    let systemPrompt = await promptsService.getTemplate(systemPromptKey);
    let userMessage = await promptsService.getTemplate(userPromptKey);

    // Replace {{slideNumber}} in system prompt (for next slides)
    systemPrompt = systemPrompt.replace(/\{\{slideNumber\}\}/g, String(params.slideNumber));

    // Build style reference (matching n8n format)
    let styleReferenceText = 'No style reference';
    if (params.styleReference) {
      styleReferenceText = params.styleReference;
    }

    // Build previous slides (matching n8n format)
    let previousSlidesText = 'None';
    if (params.previousSlides && params.previousSlides.length > 0) {
      previousSlidesText = params.previousSlides
        .map((slide, idx) => `Slide ${idx + 1}: ${slide.prompt}`)
        .join('\n');
    }

    // Replace variables in user template
    userMessage = userMessage
      .replace(/\{\{userPrompt\}\}/g, params.userPrompt)
      .replace(/\{\{slideNumber\}\}/g, String(params.slideNumber))
      .replace(/\{\{styleReference\}\}/g, styleReferenceText)
      .replace(/\{\{previousSlides\}\}/g, previousSlidesText);

    console.log(`[OpenAI] System prompt length: ${systemPrompt.length}`);
    console.log(`[OpenAI] User message: ${userMessage.substring(0, 200)}...`);

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.4, // Reduced from 0.7 for more consistent, structured outputs
        max_completion_tokens: 4000,
      });

      const generatedPrompt = response.choices[0]?.message?.content || '';

      // Clean up the prompt (remove markdown code blocks if present)
      const cleanedPrompt = generatedPrompt
        .replace(/```[\s\S]*?```/g, (match: string) => match.replace(/```\w*\n?/g, '').trim())
        .trim();

      // LOG THE GENERATED PROMPT FOR DEBUGGING
      console.log(`\n[OpenAI] ========== GENERATED PROMPT ==========`);
      console.log(`[OpenAI] Mode: ${params.isEdit ? 'EDIT' : (params.isFirstSlide ? 'FIRST_SLIDE' : 'NEXT_SLIDE')}`);
      console.log(`[OpenAI] User prompt: ${params.userPrompt.substring(0, 100)}...`);
      console.log(`[OpenAI] Generated prompt (${cleanedPrompt.length} chars):`);
      console.log(cleanedPrompt);
      console.log(`[OpenAI] ============================================\n`);

      return cleanedPrompt;
    } catch (error: any) {
      console.error('OpenAI prompt generation error:', error.message);
      throw new Error(`Failed to generate prompt: ${error.message}`);
    }
  }

  /**
   * Generate prompt for STYLE COPY scenario
   * User wants to copy style from reference card and place their product on it
   *
   * IMAGE 1 = product, IMAGE 2 = style reference
   */
  async generateStyleCopyPrompt(params: {
    userPrompt: string;
    aspectRatio?: string;
  }): Promise<string> {
    const { userPrompt, aspectRatio = '3:4' } = params;

    const systemPrompt = `Ты — эксперт по созданию промптов для генерации изображений карточек товаров для маркетплейсов (Wildberries, Ozon).

ЗАДАЧА: Раскрутить запрос пользователя в детальный промпт для Gemini, который СКОПИРУЕТ стиль с референса и поставит туда товар пользователя.

КОНТЕКСТ:
- IMAGE 1 = Фото ТОВАРА пользователя
- IMAGE 2 = РЕФЕРЕНС СТИЛЯ (готовая карточка/инфографика, стиль которой нужно скопировать)

ЧТО ДОЛЖЕН ДЕЛАТЬ GEMINI:
1. Взять товар с IMAGE 1
2. Скопировать ТОЧНЫЙ дизайн с IMAGE 2 (фон, бейджи, типографику, цвета, layout, эффекты)
3. Поставить товар на скопированный дизайн
4. Применить изменения если пользователь их указал

СТРУКТУРА ТВОЕГО ПРОМПТА:
1. Чёткое описание задачи (копирование стиля + замена товара)
2. Роли изображений (IMAGE 1 = товар, IMAGE 2 = референс)
3. ЧТО КОПИРОВАТЬ с референса (будь КОНКРЕТЕН):
   - Фон (цвета, градиенты, паттерны)
   - Бейджи (форма, цвет, расположение, текст)
   - Типографика (шрифты, размеры, стили)
   - Layout и композиция
   - Эффекты (тени, свечения, отражения)
4. Требования пользователя если есть
5. Технические требования (качество, соотношение сторон)

ВАЖНО:
- Раскрути запрос пользователя в конкретные инструкции
- Если пользователь просит изменения (цвет, текст, бейджи) — включи их чётко
- Подчеркни что это КОПИРОВАНИЕ дизайна, не творческая генерация
- Промпт на английском для Gemini
- Будь детальным но структурированным

Выведи ТОЛЬКО финальный промпт для Gemini, без объяснений.`;

    const userMessage = `Запрос пользователя: "${userPrompt}"

Соотношение сторон: ${aspectRatio}

Раскрути этот запрос в детальный промпт для Gemini который скопирует стиль с IMAGE 2 и поставит товар с IMAGE 1.`;

    console.log(`[OpenAI] Generating STYLE_COPY prompt...`);
    console.log(`[OpenAI] User request: ${userPrompt}`);

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.5,
        max_completion_tokens: 3000,
      });

      const generatedPrompt = response.choices[0]?.message?.content || '';

      console.log(`\n[OpenAI] ========== STYLE_COPY PROMPT ==========`);
      console.log(`[OpenAI] Generated prompt (${generatedPrompt.length} chars):`);
      console.log(generatedPrompt);
      console.log(`[OpenAI] ============================================\n`);

      return generatedPrompt;
    } catch (error: any) {
      console.error('OpenAI style copy prompt error:', error.message);
      throw new Error(`Failed to generate style copy prompt: ${error.message}`);
    }
  }

  /**
   * Simple completion for other use cases
   */
  async complete(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }
      messages.push({ role: 'user', content: prompt });

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages,
        temperature: 0.4, // Reduced from 0.7 for more consistent outputs
        max_completion_tokens: 4000,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error: any) {
      console.error('OpenAI completion error:', error.message);
      throw new Error(`Failed to complete: ${error.message}`);
    }
  }

  /**
   * Describe an image and detect its role for e-commerce card generation
   * Uses GPT-4o Vision for image understanding
   */
  async describeImage(imageUrl: string): Promise<{
    description: string;
    detectedRole: 'product' | 'logo' | 'style_reference' | 'background' | 'detail' | 'unknown';
  }> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o', // Vision-capable model
        messages: [
          {
            role: 'system',
            content: `You are an image analyzer for e-commerce product card generation.

CRITICAL: Distinguish between RAW PRODUCT PHOTOS and FINISHED INFOGRAPHICS/CARDS.

Analyze the image and:
1. Write a SHORT description (max 50 words) of what you see
2. Detect the image role:

   - "product" - RAW product photo on plain/simple background. Just the product itself, no design elements, no text overlays, no badges, no infographics. Usually has white/gray/simple background.

   - "style_reference" - FINISHED DESIGN/INFOGRAPHIC/CARD that should be used as visual style reference. Signs of style_reference:
     * Has text overlays, headlines, badges, or labels
     * Has designed background (gradients, patterns, decorative elements)
     * Has infographic elements (icons, feature callouts, specs)
     * Looks like a finished marketplace card or advertisement
     * Has professional design composition with multiple visual elements
     * Product + design elements combined = style_reference

   - "logo" - brand logo or trademark (isolated logo image)
   - "background" - background image/texture only (no product)
   - "detail" - close-up detail or feature highlight
   - "unknown" - cannot determine

IMPORTANT: If the image looks like a FINISHED ADVERTISEMENT or PRODUCT CARD with designed elements - it's "style_reference", NOT "product"!

Output JSON only:
{"description": "...", "detectedRole": "..."}`,
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                  detail: 'low', // Use low detail for faster/cheaper analysis
                },
              },
              {
                type: 'text',
                text: 'Analyze this image for e-commerce card generation. What is it and what role does it serve?',
              },
            ],
          },
        ],
        max_tokens: 200,
        temperature: 0.3,
      });

      const content = response.choices[0]?.message?.content || '';

      // Parse JSON response
      try {
        // Extract JSON from response (handle markdown code blocks)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            description: parsed.description || 'Image',
            detectedRole: parsed.detectedRole || 'unknown',
          };
        }
      } catch (parseError) {
        console.error('[OpenAI] Failed to parse image description:', parseError);
      }

      // Fallback
      return {
        description: 'Uploaded image',
        detectedRole: 'unknown',
      };
    } catch (error: any) {
      console.error('[OpenAI] Image description error:', error.message);
      // Return fallback on error - don't break the flow
      return {
        description: 'Image',
        detectedRole: 'unknown',
      };
    }
  }

  /**
   * Analyze product photo for intelligent card generation
   * Uses GPT-4o Vision to detect product type, suggest design styles,
   * and provide creative recommendations based on the product
   */
  async analyzeProductForCard(imageUrl: string): Promise<{
    productType: string;
    suggestedStyle: string;
    suggestedComposition: string;
    colorScheme: string;
    keyFeatures: string[];
    designSuggestions: string[];
  }> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o', // Vision-capable model
        messages: [
          {
            role: 'system',
            content: `You are an expert in e-commerce product photography and design for advertising cards.

Analyze the product image and provide intelligent design recommendations.

Output JSON only with this structure:
{
  "productType": "string - category like 'luxury watch', 'wireless earbuds', 'skin care', 'smart device', etc.",
  "suggestedStyle": "string - one of: 'tech', 'minimal', 'premium', 'eco', 'bold', 'elegant', 'sporty', 'dark_premium', 'vibrant'",
  "suggestedComposition": "string - layout recommendation like 'center-dominant with reflection', 'diagonal dynamic', 'split-screen', etc.",
  "colorScheme": "string - detected/recommended colors like 'silver, black, gold accents' or 'white, pastel blue, soft pink'",
  "keyFeatures": ["array of 2-4 visible features to highlight like 'metal bracelet', 'LED display', 'compact size'"],
  "designSuggestions": ["array of 3-5 creative design ideas specific to this product like 'add subtle glow behind watch face', 'use diagonal light streaks', 'tilted feature badges', 'floating particles effect']
}

Be specific and creative. Tailor suggestions to the product category.`,
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                  detail: 'high', // Use high detail for better product analysis
                },
              },
              {
                type: 'text',
                text: 'Analyze this product photo and provide intelligent design recommendations for generating an advertising card.',
              },
            ],
          },
        ],
        max_tokens: 800,
        temperature: 0.6, // Balanced creativity and consistency
      });

      const content = response.choices[0]?.message?.content || '';

      // Parse JSON response
      try {
        // Extract JSON from response (handle markdown code blocks)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);

          // Validate and return with defaults
          return {
            productType: parsed.productType || 'product',
            suggestedStyle: parsed.suggestedStyle || 'minimal',
            suggestedComposition: parsed.suggestedComposition || 'center-dominant',
            colorScheme: parsed.colorScheme || 'neutral tones',
            keyFeatures: Array.isArray(parsed.keyFeatures) ? parsed.keyFeatures : [],
            designSuggestions: Array.isArray(parsed.designSuggestions) ? parsed.designSuggestions : [],
          };
        }
      } catch (parseError) {
        console.error('[OpenAI] Failed to parse product analysis:', parseError);
      }

      // Fallback with generic recommendations
      return {
        productType: 'product',
        suggestedStyle: 'minimal',
        suggestedComposition: 'center-dominant layout',
        colorScheme: 'neutral tones',
        keyFeatures: ['high quality', 'modern design'],
        designSuggestions: ['clean background', 'subtle shadows', 'professional lighting'],
      };
    } catch (error: any) {
      console.error('[OpenAI] Product analysis error:', error.message);
      // Return safe fallback on error
      return {
        productType: 'product',
        suggestedStyle: 'minimal',
        suggestedComposition: 'center-dominant layout',
        colorScheme: 'neutral tones',
        keyFeatures: ['high quality'],
        designSuggestions: ['clean design', 'professional look'],
      };
    }
  }

  /**
   * Classify user intent when they upload images and provide a prompt
   * Detects whether user wants to create new, transfer style, copy template, or edit existing
   */
  async classifyImageIntent(params: {
    userPrompt: string;
    hasProductImages: boolean;
    hasStyleReference: boolean;
    hasExistingCard: boolean;
  }): Promise<{
    intent: 'create_new' | 'style_transfer' | 'template_copy' | 'edit_existing';
    confidence: number;
    reasoning: string;
    modifications?: {
      background?: string;
      badges?: string;
      effects?: string;
      text?: string;
      other?: string;
    };
  }> {
    try {
      console.log('[OpenAI] Classifying user intent:', params);

      const systemPrompt = `You are an intent classifier for an e-commerce card generation system.

Analyze the user's prompt and context to determine their intent. Choose ONE of these intents:

1. "create_new" - User wants to create a NEW card from scratch using their product
   - Signals: "создай", "сгенерируй", "сделай карточку", "make", "create", "generate"
   - User provides product + general design requirements
   - NO reference card/style mentioned

2. "style_transfer" - User wants their product in a card that MATCHES the STYLE of a reference
   - Signals: "в таком стиле", "похожий дизайн", "как на примере", "like this style", "similar to", "match the style"
   - User wants to COPY THE VISUAL STYLE but create new composition
   - Product should be styled similarly but layout can differ

3. "template_copy" - User wants to REPLACE the product in reference card with their product (keep EVERYTHING else identical)
   - Signals: "замени товар", "поставь мой товар", "мой продукт вместо этого", "replace product", "swap product", "use my product instead"
   - Also: "скопируй карточку", "перенеси товар", "такую же карточку", "copy this card", "same card"
   - User wants EXACT COPY of reference layout/design
   - Only the product itself should change, all design elements stay identical
   - MAY include targeted modifications (see below)

4. "edit_existing" - User is editing an already generated card
   - Signals: "измени", "поправь", "исправь", "change this", "fix", "adjust", "modify"
   - Context: hasExistingCard = true
   - User wants to modify existing generated card

=== TARGETED MODIFICATIONS (for template_copy only) ===
If intent is "template_copy", also extract any requested modifications:
- background: "измени фон", "другой фон", "синий фон", "градиент"
- badges: "поменяй плашки", "убери плашку", "другие бейджи", "переставь плашки"
- effects: "добавь тень", "убери блик", "другие эффекты", "без теней"
- text: "другой текст", "измени надпись", "новый копирайт"
- other: any other specific change requested

Output JSON only:
{
  "intent": "create_new|style_transfer|template_copy|edit_existing",
  "confidence": 0.0-1.0,
  "reasoning": "brief explanation of why this intent was chosen",
  "modifications": {
    "background": "description of background change if requested, or null",
    "badges": "description of badges change if requested, or null",
    "effects": "description of effects change if requested, or null",
    "text": "description of text change if requested, or null",
    "other": "any other modification if requested, or null"
  }
}`;

      const userMessage = `User prompt: "${params.userPrompt}"

Context:
- Has product images: ${params.hasProductImages}
- Has style reference: ${params.hasStyleReference}
- Has existing card: ${params.hasExistingCard}

Classify the intent.`;

      const response = await this.client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 300,
        temperature: 0.2, // Low temperature for consistent classification
      });

      const content = response.choices[0]?.message?.content || '';

      // Parse JSON response
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);

          // Extract modifications if present (for template_copy)
          let modifications: {
            background?: string;
            badges?: string;
            effects?: string;
            text?: string;
            other?: string;
          } | undefined;

          if (parsed.modifications && parsed.intent === 'template_copy') {
            const mods = parsed.modifications;
            // Only include non-null modifications
            const hasAnyMod = mods.background || mods.badges || mods.effects || mods.text || mods.other;
            if (hasAnyMod) {
              modifications = {};
              if (mods.background) modifications.background = mods.background;
              if (mods.badges) modifications.badges = mods.badges;
              if (mods.effects) modifications.effects = mods.effects;
              if (mods.text) modifications.text = mods.text;
              if (mods.other) modifications.other = mods.other;
            }
          }

          const result = {
            intent: parsed.intent || 'create_new',
            confidence: parsed.confidence || 0.5,
            reasoning: parsed.reasoning || 'Unable to determine reasoning',
            modifications,
          };

          console.log('[OpenAI] Intent classification result:', result);
          if (modifications) {
            console.log('[OpenAI] Detected modifications:', modifications);
          }
          return result;
        }
      } catch (parseError) {
        console.error('[OpenAI] Failed to parse intent classification:', parseError);
      }

      // Fallback logic
      if (params.hasExistingCard) {
        return {
          intent: 'edit_existing',
          confidence: 0.9,
          reasoning: 'User is editing an existing card',
        };
      }

      // Fallback to create_new
      return {
        intent: 'create_new',
        confidence: 0.5,
        reasoning: 'Unable to classify intent, defaulting to create_new',
      };
    } catch (error: any) {
      console.error('[OpenAI] Intent classification error:', error.message);
      // Safe fallback
      return {
        intent: 'create_new',
        confidence: 0.5,
        reasoning: `Error during classification: ${error.message}`,
      };
    }
  }

  /**
   * Analyze a style reference image to extract EXACT design elements
   * This allows Gemini to replicate the visual style precisely
   */
  async analyzeStyleReference(imageUrl: string): Promise<string> {
    try {
      console.log(`[OpenAI] Analyzing style reference: ${imageUrl.substring(0, 60)}...`);

      const response = await this.client.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a visual design analyst extracting EXACT design specifications from marketplace infographic/card images.

Your task: Analyze this reference image and extract PRECISE, REPLICABLE design specifications.

Output a detailed style guide that another AI can use to EXACTLY replicate this visual style. Include:

1. COLORS (be specific with hex codes or precise color names):
   - Background color/gradient (exact colors, direction)
   - Primary accent color
   - Text colors (headline, body, badges)
   - Badge/highlight colors

2. TYPOGRAPHY:
   - Headline style (bold, light, size relative to image)
   - Subtext style
   - Badge/label text style
   - Text positioning (top, center, bottom, corners)

3. BADGES/LABELS:
   - Shape (rounded rectangle, pill, circle, custom)
   - Fill style (solid, gradient, glassmorphism, outline)
   - Border/shadow effects
   - Positioning pattern

4. LAYOUT:
   - Product placement (center, left, right, size %)
   - Text block positions
   - Badge positions
   - Visual hierarchy flow

5. SPECIAL EFFECTS:
   - Shadows (product shadow, text shadow)
   - Glows or highlights
   - Gradients
   - Decorative elements (lines, dots, shapes)

Be EXTREMELY SPECIFIC. Use exact terms like:
- "dark navy blue (#1a1f3d) to deep purple (#2d1b4e) diagonal gradient"
- "white pill-shaped badges with 12px border-radius, slight drop shadow"
- "product centered at 60% height, taking 45% of image width"

Output as plain text design specification, NOT JSON.`,
          },
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                  detail: 'high', // High detail for precise color/design extraction
                },
              },
              {
                type: 'text',
                text: 'Extract the EXACT visual design specifications from this marketplace card/infographic. Be as precise as possible with colors, typography, and layout so the style can be perfectly replicated.',
              },
            ],
          },
        ],
        max_tokens: 1500,
        temperature: 0.3, // Low temperature for consistent, precise extraction
      });

      const styleAnalysis = response.choices[0]?.message?.content || '';

      console.log(`[OpenAI] Style reference analysis complete (${styleAnalysis.length} chars)`);
      console.log(`[OpenAI] Style preview: ${styleAnalysis.substring(0, 200)}...`);

      return styleAnalysis;
    } catch (error: any) {
      console.error('[OpenAI] Style reference analysis error:', error.message);
      // Return empty string on error - let the system fall back to generic style
      return '';
    }
  }

  /**
   * GPT Prompt Architect - Universal intelligent prompt generator for Gemini
   *
   * This is the BRAIN that understands ANY user request and generates
   * optimal prompts for Gemini image generation.
   *
   * Handles ALL scenarios flexibly:
   * - Create new card from scratch
   * - Copy exact card (template copy)
   * - Copy style from reference
   * - Edit existing card
   * - Any other request the user might have
   */
  async generateGeminiPrompt(params: {
    userPrompt: string;
    imageCount: number;
    imageDescriptions?: Array<{ index: number; description: string; role: string }>;
    aspectRatio?: string;
    isEdit?: boolean;
    previousSlideStyle?: string; // Style from previous carousel slides
  }): Promise<{
    geminiPrompt: string;
    detectedIntent: string;
    imageRoles: string[];
  }> {
    const {
      userPrompt,
      imageCount,
      imageDescriptions = [],
      aspectRatio = '3:4',
      isEdit = false,
      previousSlideStyle,
    } = params;

    console.log(`\n[OpenAI] ========== PROMPT ARCHITECT ==========`);
    console.log(`[OpenAI] User prompt: ${userPrompt}`);
    console.log(`[OpenAI] Image count: ${imageCount}`);
    console.log(`[OpenAI] Is edit: ${isEdit}`);
    if (imageDescriptions.length > 0) {
      console.log(`[OpenAI] Image descriptions:`);
      imageDescriptions.forEach(d => console.log(`[OpenAI]   IMAGE ${d.index}: [${d.role}] ${d.description}`));
    }

    const systemPrompt = `Ты — Prompt Architect для системы генерации карточек товаров для маркетплейсов (Wildberries, Ozon).

ТВОЯ ЗАДАЧА: Понять что хочет пользователь и создать ИДЕАЛЬНЫЙ промпт для Gemini.

=== КОНТЕКСТ ===
- Gemini получает ИЗОБРАЖЕНИЯ + ТЕКСТОВЫЙ ПРОМПТ
- Изображения нумеруются: IMAGE 1, IMAGE 2, IMAGE 3...
- Gemini хорошо понимает английский
- Gemini может редактировать изображения и генерировать новые

=== ТИПЫ ИЗОБРАЖЕНИЙ ===
- "product" - Фото товара (обычно на белом/простом фоне)
- "style_reference" - Готовая карточка/инфографика (имеет дизайн, бейджи, текст)
- "card" - Уже сгенерированная карточка которую нужно отредактировать
- "logo" - Логотип бренда
- "background" - Фоновое изображение

=== ЧТО ТЫ ДОЛЖЕН СДЕЛАТЬ ===

1. ПОНЯТЬ НАМЕРЕНИЕ пользователя:
   - Хочет создать новую карточку с нуля?
   - Хочет скопировать существующую карточку и заменить товар?
   - Хочет применить стиль с референса к своему товару?
   - Хочет отредактировать существующую карточку?
   - Что-то другое?

2. ОПРЕДЕЛИТЬ РОЛИ изображений:
   - Какое изображение = товар?
   - Какое = стиль/референс?
   - Какое = карточка для редактирования?

3. СОЗДАТЬ ДЕТАЛЬНЫЙ ПРОМПТ для Gemini:
   - На АНГЛИЙСКОМ языке
   - СТРУКТУРИРОВАННЫЙ и чёткий
   - С КОНКРЕТНЫМИ инструкциями
   - С указанием ролей изображений (IMAGE 1 = ..., IMAGE 2 = ...)

=== СТРУКТУРА ТВОЕГО ПРОМПТА ДЛЯ GEMINI ===

\`\`\`
=== TASK ===
[Чёткое описание задачи в 1-2 предложениях]

=== IMAGE ROLES ===
IMAGE 1: [роль и что с ним делать]
IMAGE 2: [роль и что с ним делать]
...

=== INSTRUCTIONS ===
[Пошаговые инструкции что делать]

=== DESIGN REQUIREMENTS ===
[Детальные требования к дизайну: фон, цвета, бейджи, типографика, эффекты]

=== PRODUCT REQUIREMENTS ===
[Требования к размеру и позиции товара]

=== TEXT REQUIREMENTS ===
[Требования к тексту на карточке - ТОЛЬКО на русском языке]

=== QUALITY ===
[Технические требования: разрешение, качество]

=== NEGATIVE PROMPT ===
[Чего избегать]
\`\`\`

=== ВАЖНЫЕ ПРАВИЛА ===

1. Если пользователь хочет СКОПИРОВАТЬ карточку (подставить товар):
   - Промпт должен подчёркивать ТОЧНОЕ копирование всего дизайна
   - Меняется ТОЛЬКО товар
   - Все бейджи, текст, цвета, расположение - ИДЕНТИЧНЫ

2. Если пользователь хочет применить СТИЛЬ:
   - Детально описать стиль который нужно скопировать
   - Фон, цветовая схема, стиль бейджей, типографика
   - Но композиция может отличаться

3. Если пользователь создаёт НОВУЮ карточку:
   - Креативный подход
   - Учитывать тип товара
   - Профессиональный дизайн для маркетплейса

4. Текст на карточках ВСЕГДА на РУССКОМ языке

5. Товар должен быть КРУПНЫМ (70-90% высоты карточки)

6. Качество - профессиональное, готовое к публикации

=== ФОРМАТ ОТВЕТА ===

Верни JSON:
{
  "geminiPrompt": "полный промпт для Gemini на английском",
  "detectedIntent": "create_new | copy_card | copy_style | edit | other",
  "imageRoles": ["IMAGE 1 role description", "IMAGE 2 role description", ...]
}`;

    // Build context about images
    let imageContext = '';
    if (imageDescriptions.length > 0) {
      imageContext = '\n\nИНФОРМАЦИЯ ОБ ИЗОБРАЖЕНИЯХ:\n';
      imageDescriptions.forEach(d => {
        imageContext += `- IMAGE ${d.index}: [${d.role.toUpperCase()}] ${d.description}\n`;
      });
    } else {
      imageContext = `\n\nКоличество изображений: ${imageCount}`;
      if (imageCount === 1) {
        imageContext += '\n(Вероятно это фото товара)';
      } else if (imageCount === 2) {
        imageContext += '\n(Вероятно: одно - товар, другое - референс/стиль)';
      }
    }

    // Add edit context
    let editContext = '';
    if (isEdit) {
      editContext = '\n\nКОНТЕКСТ: Пользователь РЕДАКТИРУЕТ существующую карточку. IMAGE 1 или последнее изображение - текущая карточка.';
    }

    // Add previous slide style if available
    let styleContext = '';
    if (previousSlideStyle) {
      styleContext = `\n\nСТИЛЬ ПРЕДЫДУЩИХ СЛАЙДОВ (для консистентности карусели):\n${previousSlideStyle}`;
    }

    const userMessage = `ЗАПРОС ПОЛЬЗОВАТЕЛЯ: "${userPrompt}"
${imageContext}${editContext}${styleContext}

Соотношение сторон: ${aspectRatio}

Создай оптимальный промпт для Gemini.`;

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.4,
        max_completion_tokens: 4000,
      });

      const content = response.choices[0]?.message?.content || '';

      // Parse JSON response
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);

          const result = {
            geminiPrompt: parsed.geminiPrompt || '',
            detectedIntent: parsed.detectedIntent || 'unknown',
            imageRoles: Array.isArray(parsed.imageRoles) ? parsed.imageRoles : [],
          };

          // Add aspect ratio to prompt if not present
          if (!result.geminiPrompt.toLowerCase().includes('aspect ratio')) {
            result.geminiPrompt += `\n\nOutput image aspect ratio: ${aspectRatio}`;
          }

          // Add quality check instructions
          result.geminiPrompt += `

=== SELF-CHECK BEFORE OUTPUT ===
- If text is unreadable or garbled → regenerate
- If any element is duplicated → regenerate
- If product is too small (< 60% of frame) → regenerate
- If the card doesn't look professional → regenerate`;

          console.log(`[OpenAI] Detected intent: ${result.detectedIntent}`);
          console.log(`[OpenAI] Image roles: ${result.imageRoles.join(', ')}`);
          console.log(`[OpenAI] Generated prompt (${result.geminiPrompt.length} chars)`);
          console.log(`[OpenAI] Prompt preview:\n${result.geminiPrompt.substring(0, 500)}...`);
          console.log(`[OpenAI] ==========================================\n`);

          return result;
        }
      } catch (parseError) {
        console.error('[OpenAI] Failed to parse Prompt Architect response:', parseError);
        console.error('[OpenAI] Raw response:', content);
      }

      // Fallback - return the raw response as prompt
      console.warn('[OpenAI] Using fallback - raw response as prompt');
      return {
        geminiPrompt: content,
        detectedIntent: 'unknown',
        imageRoles: [],
      };
    } catch (error: any) {
      console.error('[OpenAI] Prompt Architect error:', error.message);
      throw new Error(`Failed to generate Gemini prompt: ${error.message}`);
    }
  }

  /**
   * Quick image analysis for Prompt Architect
   * Analyzes images to determine their roles before generating the prompt
   */
  async analyzeImagesForArchitect(imageUrls: string[]): Promise<Array<{
    index: number;
    description: string;
    role: 'product' | 'style_reference' | 'card' | 'logo' | 'background' | 'unknown';
  }>> {
    console.log(`[OpenAI] Analyzing ${imageUrls.length} images for Prompt Architect...`);

    // Analyze all images in parallel
    const analysisPromises = imageUrls.map(async (url, index) => {
      try {
        const analysis = await this.describeImage(url);
        return {
          index: index + 1, // 1-indexed for IMAGE 1, IMAGE 2, etc.
          description: analysis.description,
          role: analysis.detectedRole as 'product' | 'style_reference' | 'card' | 'logo' | 'background' | 'unknown',
        };
      } catch (error) {
        console.warn(`[OpenAI] Failed to analyze image ${index + 1}:`, error);
        return {
          index: index + 1,
          description: 'Image',
          role: 'unknown' as const,
        };
      }
    });

    const analysisResults = await Promise.all(analysisPromises);

    console.log(`[OpenAI] Image analysis complete:`);
    analysisResults.forEach(r => {
      console.log(`[OpenAI]   IMAGE ${r.index}: [${r.role}] ${r.description}`);
    });

    return analysisResults;
  }

  /**
   * Translate user edit instructions to Gemini-optimized format
   *
   * Nano Banana (Gemini) doesn't understand:
   * - "сделай на 20% больше"
   * - "увеличь на 150 пикселей"
   * - numerical size values
   *
   * Nano Banana DOES understand:
   * - Relative proportions: "product takes up 80% of frame height"
   * - Comparative descriptions: "larger", "more prominent", "fills the frame"
   * - Photographic terminology: "close-up", "macro shot", "wide angle"
   * - Proportions to other elements: "as big as the badge"
   *
   * This function uses GPT to translate user instructions into Gemini-friendly format.
   */
  async translateEditInstruction(userInstruction: string): Promise<{
    geminiPrompt: string;
    originalIntent: string;
    translatedElements: string[];
  }> {
    console.log(`[OpenAI] Translating edit instruction: "${userInstruction}"`);

    const systemPrompt = `You are an expert at translating user image editing instructions into prompts that Gemini (Nano Banana) image model can understand.

=== CRITICAL: WHAT GEMINI CANNOT UNDERSTAND ===
- ❌ Percentages for size changes: "20% bigger", "на 30% больше"
- ❌ Pixel values: "150px larger", "увеличь на 200 пикселей"
- ❌ Abstract size multipliers: "2x larger", "в 1.5 раза больше"
- ❌ Vague instructions: "немного больше", "чуть-чуть"

=== WHAT GEMINI CAN UNDERSTAND ===
- ✅ Frame proportions: "product occupies 85% of frame height", "fills 70% of the vertical space"
- ✅ Comparative language: "significantly larger", "more prominent", "dominates the composition"
- ✅ Photographic terms: "close-up shot", "macro perspective", "product fills the frame"
- ✅ Positional descriptions: "centered and enlarged", "pushed to foreground"
- ✅ Relative to elements: "product should be as tall as the badge width times 3"
- ✅ Visual hierarchy: "make product the dominant visual element"

=== YOUR TASK ===
1. Understand what the user wants (size, position, effects, etc.)
2. Translate into Gemini-friendly language
3. Be SPECIFIC and VISUAL, not numerical

=== TRANSLATION EXAMPLES ===

Input: "сделай товар на 20% больше"
Output: "Enlarge the product significantly - it should occupy approximately 85% of the frame height, becoming the dominant visual element. Push it slightly forward in the composition."

Input: "товар должен быть крупнее, примерно в 1.5 раза"
Output: "Make the product much more prominent - it should fill most of the frame, leaving minimal space around it. The product should dominate the composition with a close-up, macro-like perspective."

Input: "подвинь товар левее"
Output: "Reposition the product to the left third of the frame, maintaining its current size. The product should be clearly left-aligned with breathing room on the right side."

Input: "добавь тень под товаром"
Output: "Add a soft, natural drop shadow beneath the product. The shadow should be diffused, extending slightly to the bottom-right, giving the product a floating, elevated appearance."

Input: "сделай фон темнее"
Output: "Darken the background significantly while maintaining the product's visibility. The background should have a rich, deep tone that makes the product pop and stand out."

=== OUTPUT FORMAT ===
Return JSON:
{
  "geminiPrompt": "The translated instruction optimized for Gemini",
  "originalIntent": "Brief description of what user wanted",
  "translatedElements": ["element1 changed", "element2 changed"]
}`;

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini', // Fast and cheap for translation
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Translate this instruction for Gemini:\n"${userInstruction}"` },
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const content = response.choices[0]?.message?.content || '';

      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const result = {
            geminiPrompt: parsed.geminiPrompt || userInstruction,
            originalIntent: parsed.originalIntent || 'unknown',
            translatedElements: Array.isArray(parsed.translatedElements) ? parsed.translatedElements : [],
          };

          console.log(`[OpenAI] Translated instruction:`);
          console.log(`[OpenAI]   Original: "${userInstruction}"`);
          console.log(`[OpenAI]   Translated: "${result.geminiPrompt}"`);
          console.log(`[OpenAI]   Intent: ${result.originalIntent}`);

          return result;
        }
      } catch (parseError) {
        console.warn('[OpenAI] Failed to parse translation, using original:', parseError);
      }

      // Fallback - return original with basic enhancement
      return {
        geminiPrompt: userInstruction,
        originalIntent: 'unknown',
        translatedElements: [],
      };
    } catch (error: any) {
      console.error('[OpenAI] Translation error:', error.message);
      return {
        geminiPrompt: userInstruction,
        originalIntent: 'error',
        translatedElements: [],
      };
    }
  }

  /**
   * Batch translate multiple modifications for card copying
   * Used by copyCard() to translate user modifications into Gemini-friendly format
   */
  async translateModifications(modifications: {
    background?: string;
    badges?: string;
    effects?: string;
    text?: string;
    other?: string;
  }): Promise<{
    background?: string;
    badges?: string;
    effects?: string;
    text?: string;
    other?: string;
  }> {
    const translated: typeof modifications = {};

    const translationPromises: Promise<void>[] = [];

    if (modifications.background) {
      translationPromises.push(
        this.translateEditInstruction(modifications.background).then(r => {
          translated.background = r.geminiPrompt;
        })
      );
    }
    if (modifications.badges) {
      translationPromises.push(
        this.translateEditInstruction(modifications.badges).then(r => {
          translated.badges = r.geminiPrompt;
        })
      );
    }
    if (modifications.effects) {
      translationPromises.push(
        this.translateEditInstruction(modifications.effects).then(r => {
          translated.effects = r.geminiPrompt;
        })
      );
    }
    if (modifications.text) {
      translationPromises.push(
        this.translateEditInstruction(modifications.text).then(r => {
          translated.text = r.geminiPrompt;
        })
      );
    }
    if (modifications.other) {
      translationPromises.push(
        this.translateEditInstruction(modifications.other).then(r => {
          translated.other = r.geminiPrompt;
        })
      );
    }

    await Promise.all(translationPromises);

    console.log(`[OpenAI] Translated modifications:`, translated);
    return translated;
  }
}

export const openai = new OpenAIService();