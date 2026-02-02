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
   * Uses only user-provided descriptions for images
   * 
   * Modes:
   * - isEdit=true: Uses card_edit prompts (for editing existing cards)
   * - isFirstSlide=true: Uses first_slide prompts
   * - else: Uses next_slide prompts
   */
  async generateImagePrompt(params: PromptGenerationParams): Promise<string> {
    // Build image context from user descriptions ONLY
    const imageContext = promptsService.buildImageContext(params.images);

    // Determine which prompts to use
    let systemPromptKey: string;
    let userPromptKey: string;

    if (params.isEdit) {
      // Edit mode: use card edit prompts
      systemPromptKey = 'card_edit_system';
      userPromptKey = 'card_edit_user';
    } else if (params.isFirstSlide) {
      // First generation
      systemPromptKey = 'first_slide_system';
      userPromptKey = 'first_slide_user';
    } else {
      // Subsequent slides
      systemPromptKey = 'next_slide_system';
      userPromptKey = 'next_slide_user';
    }

    // Build style reference section (for non-edit mode)
    let styleReferenceText = '';
    if (!params.isEdit && !params.isFirstSlide && params.styleReference) {
      styleReferenceText = `\nSTYLE REFERENCE FROM SLIDE 1:\n${params.styleReference}`;
    }

    // Build previous slides section (for non-edit mode)
    let previousSlidesText = '';
    if (!params.isEdit && params.previousSlides && params.previousSlides.length > 0) {
      previousSlidesText = '\nPREVIOUS SLIDES:';
      params.previousSlides.forEach((slide, idx) => {
        previousSlidesText += `\nSlide ${idx + 1}: ${slide.prompt}`;
      });
    }

    const systemPrompt = await promptsService.getTemplate(systemPromptKey);
    let userMessage = await promptsService.getTemplate(userPromptKey);
    
    // Replace variables in user template
    userMessage = userMessage
      .replace(/\{\{userPrompt\}\}/g, params.userPrompt)
      .replace(/\{\{imageCount\}\}/g, String(params.images.length))
      .replace(/\{\{imageContext\}\}/g, imageContext)
      .replace(/\{\{slideNumber\}\}/g, String(params.slideNumber))
      .replace(/\{\{styleReference\}\}/g, styleReferenceText)
      .replace(/\{\{previousSlides\}\}/g, previousSlidesText);

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_completion_tokens: 4000,
      });

      const generatedPrompt = response.choices[0]?.message?.content || '';
      
      // Clean up the prompt (remove markdown code blocks if present)
      return generatedPrompt
        .replace(/```[\s\S]*?```/g, (match) => match.replace(/```\w*\n?/g, '').trim())
        .trim();
    } catch (error: any) {
      console.error('OpenAI prompt generation error:', error.message);
      throw new Error(`Failed to generate prompt: ${error.message}`);
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
        temperature: 0.7,
        max_completion_tokens: 4000,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error: any) {
      console.error('OpenAI completion error:', error.message);
      throw new Error(`Failed to complete: ${error.message}`);
    }
  }
}

export const openai = new OpenAIService();