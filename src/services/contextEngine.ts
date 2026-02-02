/**
 * Context-Aware Generation Engine
 *
 * Умная система управления контекстом для генерации карточек:
 *
 * 1. IMAGE REGISTRY - хранит ВСЕ картинки сессии с метаданными
 * 2. CONVERSATION MEMORY - помнит все запросы и результаты
 * 3. SMART PROMPT BUILDER - динамически собирает промпт из контекста
 * 4. REFERENCE RESOLVER - понимает "та картинка", "стиль как раньше"
 *
 * Flow:
 * User uploads images → GPT Vision analyzes each → stored in registry
 * User sends prompt → GPT analyzes intent → resolves references → builds prompt
 * Prompt + relevant images → Gemini → result stored in memory
 */

import { openai } from './openai';

// ============================================
// TYPES
// ============================================

export type ImageRole =
  | 'product'           // Main product photo
  | 'style_reference'   // Design/style example to copy
  | 'logo'              // Brand logo
  | 'background'        // Background image/texture
  | 'detail'            // Close-up/detail shot
  | 'previous_result'   // Previously generated card
  | 'unknown';

export interface RegisteredImage {
  id: string;                    // Unique ID (uuid)
  url: string;                   // Telegram file URL
  fileId: string;                // Telegram file_id for quick access
  role: ImageRole;               // Detected/assigned role
  description: string;           // GPT Vision description
  userCaption?: string;          // User's caption if provided
  uploadedAt: string;            // ISO timestamp
  usedInGenerations: string[];   // IDs of generations that used this image
  isActive: boolean;             // Still in active context
}

export interface GenerationRecord {
  id: string;                    // Generation ID
  prompt: string;                // User's original prompt
  analyzedIntent: AnalyzedIntent; // GPT's analysis of what user wants
  usedImages: string[];          // Image IDs used
  generatedPrompt: string;       // Final prompt sent to Gemini
  resultImageUrl?: string;       // Generated image URL
  resultImageId?: string;        // Stored as RegisteredImage
  createdAt: string;
  success: boolean;
  error?: string;
}

export interface AnalyzedIntent {
  action: 'create' | 'edit' | 'regenerate' | 'change_style' | 'add_element' | 'remove_element';
  productReferences: string[];     // Which product images to use
  styleReferences: string[];       // Which style references to use
  previousResultRef?: string;      // If editing previous result
  requestedChanges?: string;       // What to change (for edits)
  detectedProduct?: string;        // "часы", "триммер", etc.
  detectedStyle?: string;          // "минимализм", "премиум", etc.
  extractedFeatures: string[];     // Features mentioned by user
  extractedUSP?: string;           // Main selling point
  language: 'ru' | 'en';
  confidence: number;              // 0-1 how confident in analysis
}

export interface SessionContext {
  sessionId: string;
  userId: string;
  images: Map<string, RegisteredImage>;
  generations: GenerationRecord[];
  conversationHistory: ConversationTurn[];
  currentProduct?: string;         // Last detected product type
  currentStyle?: string;           // Last used style
  createdAt: string;
  lastActivityAt: string;
}

export interface ConversationTurn {
  role: 'user' | 'assistant' | 'system';
  content: string;
  imageIds?: string[];             // Images attached to this turn
  timestamp: string;
}

// ============================================
// CONTEXT ENGINE
// ============================================

class ContextEngine {
  private sessions: Map<string, SessionContext> = new Map();

  /**
   * Get or create session context
   */
  getSession(sessionId: string, userId: string): SessionContext {
    let session = this.sessions.get(sessionId);

    if (!session) {
      session = {
        sessionId,
        userId,
        images: new Map(),
        generations: [],
        conversationHistory: [],
        createdAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString(),
      };
      this.sessions.set(sessionId, session);
    }

    session.lastActivityAt = new Date().toISOString();
    return session;
  }

  /**
   * Register a new image with GPT Vision analysis
   */
  async registerImage(
    session: SessionContext,
    url: string,
    fileId: string,
    userCaption?: string
  ): Promise<RegisteredImage> {
    const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log(`\n[ContextEngine] ========== REGISTERING IMAGE ==========`);
    console.log(`[ContextEngine] ID: ${id}`);
    console.log(`[ContextEngine] User caption: ${userCaption || '(none)'}`);

    // Always analyze with GPT Vision
    let role: ImageRole = 'unknown';
    let description = userCaption || 'Uploaded image';

    try {
      const analysis = await openai.describeImage(url);
      role = analysis.detectedRole as ImageRole;
      description = analysis.description;

      console.log(`[ContextEngine] GPT Vision: role=${role}`);
      console.log(`[ContextEngine] GPT Vision: desc=${description.substring(0, 80)}...`);
    } catch (err) {
      console.error(`[ContextEngine] GPT Vision failed:`, err);
    }

    const image: RegisteredImage = {
      id,
      url,
      fileId,
      role,
      description,
      userCaption,
      uploadedAt: new Date().toISOString(),
      usedInGenerations: [],
      isActive: true,
    };

    session.images.set(id, image);

    // Add to conversation history
    session.conversationHistory.push({
      role: 'user',
      content: userCaption || `[Uploaded image: ${description}]`,
      imageIds: [id],
      timestamp: new Date().toISOString(),
    });

    console.log(`[ContextEngine] Registered: ${id} as ${role}`);
    console.log(`[ContextEngine] Total images in session: ${session.images.size}`);
    console.log(`[ContextEngine] ==========================================\n`);

    return image;
  }

  /**
   * Analyze user's prompt and determine intent
   */
  async analyzeIntent(
    session: SessionContext,
    userPrompt: string
  ): Promise<AnalyzedIntent> {
    console.log(`\n[ContextEngine] ========== ANALYZING INTENT ==========`);
    console.log(`[ContextEngine] User prompt: ${userPrompt}`);

    // Build context summary for GPT
    const imagesSummary = Array.from(session.images.values())
      .filter(img => img.isActive)
      .map((img, i) => `IMAGE_${i + 1} (${img.id}): [${img.role}] ${img.description}`)
      .join('\n');

    const previousGenerations = session.generations
      .slice(-3) // Last 3 generations
      .map((gen, i) => `GEN_${i + 1}: "${gen.prompt}" → ${gen.success ? 'успешно' : 'ошибка'}`)
      .join('\n');

    const systemPrompt = `You are an intent analyzer for an e-commerce card generation bot.

AVAILABLE IMAGES IN SESSION:
${imagesSummary || '(no images yet)'}

PREVIOUS GENERATIONS:
${previousGenerations || '(none)'}

CURRENT PRODUCT TYPE: ${session.currentProduct || 'unknown'}
CURRENT STYLE: ${session.currentStyle || 'not set'}

Analyze the user's request and determine:
1. What ACTION they want (create new card, edit existing, regenerate, change style, add/remove elements)
2. Which IMAGES to use (refer by IMAGE_X or by description)
3. What PRODUCT this is about
4. What STYLE they want
5. Any specific FEATURES or USP mentioned

Output JSON only:
{
  "action": "create|edit|regenerate|change_style|add_element|remove_element",
  "productReferences": ["IMAGE_1", "IMAGE_2"],
  "styleReferences": ["IMAGE_3"],
  "previousResultRef": "GEN_1 or null",
  "requestedChanges": "description of changes if edit",
  "detectedProduct": "product type in Russian",
  "detectedStyle": "style name",
  "extractedFeatures": ["feature1", "feature2"],
  "extractedUSP": "main selling point if mentioned",
  "language": "ru|en",
  "confidence": 0.0-1.0
}`;

    try {
      const response = await openai.complete(userPrompt, systemPrompt);
      const jsonMatch = response.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        // Map IMAGE_X references to actual image IDs
        const imageArray = Array.from(session.images.values()).filter(img => img.isActive);

        const resolveRefs = (refs: string[]): string[] => {
          return refs.map(ref => {
            const match = ref.match(/IMAGE_(\d+)/);
            if (match) {
              const idx = parseInt(match[1]) - 1;
              return imageArray[idx]?.id || ref;
            }
            return ref;
          }).filter(Boolean);
        };

        const intent: AnalyzedIntent = {
          action: parsed.action || 'create',
          productReferences: resolveRefs(parsed.productReferences || []),
          styleReferences: resolveRefs(parsed.styleReferences || []),
          previousResultRef: parsed.previousResultRef,
          requestedChanges: parsed.requestedChanges,
          detectedProduct: parsed.detectedProduct,
          detectedStyle: parsed.detectedStyle,
          extractedFeatures: parsed.extractedFeatures || [],
          extractedUSP: parsed.extractedUSP,
          language: parsed.language || 'ru',
          confidence: parsed.confidence || 0.5,
        };

        // Update session context
        if (intent.detectedProduct) {
          session.currentProduct = intent.detectedProduct;
        }
        if (intent.detectedStyle) {
          session.currentStyle = intent.detectedStyle;
        }

        console.log(`[ContextEngine] Action: ${intent.action}`);
        console.log(`[ContextEngine] Product refs: ${intent.productReferences.join(', ')}`);
        console.log(`[ContextEngine] Style refs: ${intent.styleReferences.join(', ')}`);
        console.log(`[ContextEngine] Confidence: ${intent.confidence}`);
        console.log(`[ContextEngine] ==========================================\n`);

        return intent;
      }
    } catch (err) {
      console.error(`[ContextEngine] Intent analysis failed:`, err);
    }

    // Fallback: use all product images
    const productImages = Array.from(session.images.values())
      .filter(img => img.isActive && img.role === 'product')
      .map(img => img.id);

    const styleImages = Array.from(session.images.values())
      .filter(img => img.isActive && img.role === 'style_reference')
      .map(img => img.id);

    return {
      action: 'create',
      productReferences: productImages,
      styleReferences: styleImages,
      extractedFeatures: [],
      language: 'ru',
      confidence: 0.3,
    };
  }

  /**
   * Build final prompt for Gemini based on analyzed intent
   */
  buildGeminiRequest(
    session: SessionContext,
    intent: AnalyzedIntent,
    userPrompt: string
  ): {
    productImages: RegisteredImage[];
    styleImages: RegisteredImage[];
    prompt: string;
    styleHint?: string;
  } {
    console.log(`\n[ContextEngine] ========== BUILDING GEMINI REQUEST ==========`);

    // Resolve image references
    const productImages: RegisteredImage[] = [];
    const styleImages: RegisteredImage[] = [];

    for (const ref of intent.productReferences) {
      const img = session.images.get(ref);
      if (img) productImages.push(img);
    }

    for (const ref of intent.styleReferences) {
      const img = session.images.get(ref);
      if (img) styleImages.push(img);
    }

    // If no explicit product refs, use all products
    if (productImages.length === 0) {
      for (const img of session.images.values()) {
        if (img.isActive && img.role === 'product') {
          productImages.push(img);
        }
      }
    }

    // If no explicit style refs, use all style_references
    if (styleImages.length === 0) {
      for (const img of session.images.values()) {
        if (img.isActive && img.role === 'style_reference') {
          styleImages.push(img);
        }
      }
    }

    // Build enhanced prompt
    let enhancedPrompt = userPrompt;

    if (intent.detectedProduct) {
      enhancedPrompt += `\n\nProduct: ${intent.detectedProduct}`;
    }

    if (intent.extractedFeatures.length > 0) {
      enhancedPrompt += `\nFeatures: ${intent.extractedFeatures.join(', ')}`;
    }

    if (intent.extractedUSP) {
      enhancedPrompt += `\nMain USP: ${intent.extractedUSP}`;
    }

    // Style hint for cardGenerator
    let styleHint: string | undefined;
    if (styleImages.length > 0) {
      styleHint = `User provided ${styleImages.length} style reference(s). MATCH THAT EXACT VISUAL STYLE: layout, typography, colors, badges, composition.`;
    }

    console.log(`[ContextEngine] Product images: ${productImages.length}`);
    productImages.forEach(img => console.log(`[ContextEngine]   - ${img.id}: ${img.description.substring(0, 40)}...`));
    console.log(`[ContextEngine] Style images: ${styleImages.length}`);
    styleImages.forEach(img => console.log(`[ContextEngine]   - ${img.id}: ${img.description.substring(0, 40)}...`));
    console.log(`[ContextEngine] Style hint: ${styleHint || '(none)'}`);
    console.log(`[ContextEngine] ==========================================\n`);

    return {
      productImages,
      styleImages,
      prompt: enhancedPrompt,
      styleHint,
    };
  }

  /**
   * Record generation result
   */
  recordGeneration(
    session: SessionContext,
    intent: AnalyzedIntent,
    userPrompt: string,
    generatedPrompt: string,
    usedImageIds: string[],
    resultImageUrl?: string,
    success: boolean = true,
    error?: string
  ): GenerationRecord {
    const record: GenerationRecord = {
      id: `gen_${Date.now()}`,
      prompt: userPrompt,
      analyzedIntent: intent,
      usedImages: usedImageIds,
      generatedPrompt,
      resultImageUrl,
      createdAt: new Date().toISOString(),
      success,
      error,
    };

    session.generations.push(record);

    // Mark images as used
    for (const imgId of usedImageIds) {
      const img = session.images.get(imgId);
      if (img) {
        img.usedInGenerations.push(record.id);
      }
    }

    // If successful, register result as a previous_result image
    if (success && resultImageUrl) {
      const resultImage: RegisteredImage = {
        id: `result_${record.id}`,
        url: resultImageUrl,
        fileId: '', // Will be set when sent to Telegram
        role: 'previous_result',
        description: `Generated card: ${userPrompt.substring(0, 50)}...`,
        uploadedAt: new Date().toISOString(),
        usedInGenerations: [],
        isActive: true,
      };
      session.images.set(resultImage.id, resultImage);
      record.resultImageId = resultImage.id;
    }

    // Add to conversation history
    session.conversationHistory.push({
      role: 'assistant',
      content: success
        ? `Generated card for: ${userPrompt.substring(0, 50)}...`
        : `Failed: ${error}`,
      timestamp: new Date().toISOString(),
    });

    return record;
  }

  /**
   * Get session summary for debugging
   */
  getSessionSummary(session: SessionContext): string {
    const images = Array.from(session.images.values());
    const activeImages = images.filter(img => img.isActive);

    return `
Session: ${session.sessionId}
Images: ${activeImages.length} active / ${images.length} total
  - Products: ${activeImages.filter(i => i.role === 'product').length}
  - Style refs: ${activeImages.filter(i => i.role === 'style_reference').length}
  - Previous results: ${activeImages.filter(i => i.role === 'previous_result').length}
Generations: ${session.generations.length}
Current product: ${session.currentProduct || 'unknown'}
Current style: ${session.currentStyle || 'not set'}
    `.trim();
  }

  /**
   * Clear old sessions (call periodically)
   */
  cleanupOldSessions(maxAgeMs: number = 24 * 60 * 60 * 1000): void {
    const now = Date.now();
    for (const [id, session] of this.sessions) {
      const lastActivity = new Date(session.lastActivityAt).getTime();
      if (now - lastActivity > maxAgeMs) {
        this.sessions.delete(id);
        console.log(`[ContextEngine] Cleaned up old session: ${id}`);
      }
    }
  }
}

// Singleton export
export const contextEngine = new ContextEngine();
