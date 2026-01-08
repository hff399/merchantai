import { supabase } from './supabase';
import {
  FIRST_SLIDE_SYSTEM_PROMPT,
  FIRST_SLIDE_USER_PROMPT,
  NEXT_SLIDE_SYSTEM_PROMPT,
  NEXT_SLIDE_USER_PROMPT,
  IMAGE_EDIT_SYSTEM_PROMPT,
  IMAGE_EDIT_USER_PROMPT,
  CARD_EDIT_SYSTEM_PROMPT,
  CARD_EDIT_USER_PROMPT,
  buildImageContext,
  type PromptTemplate,
} from '../constants/prompts';

interface CachedPrompt {
  template: string;
  cachedAt: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

class PromptsService {
  private cache: Map<string, CachedPrompt> = new Map();

  /**
   * Get prompt template from database or fallback to default
   */
  async getTemplate(id: string): Promise<string> {
    // Check cache first
    const cached = this.cache.get(id);
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL) {
      return cached.template;
    }

    try {
      const data = await supabase.getPromptTemplate(id);

      if (data) {
        this.cache.set(id, {
          template: data.template,
          cachedAt: Date.now(),
        });
        return data.template;
      }
    } catch (e) {
      // Silently fallback to defaults
    }

    return this.getDefaultTemplate(id);
  }

  /**
   * Get default template (hardcoded fallback)
   */
  private getDefaultTemplate(id: string): string {
    const defaults: Record<string, string> = {
      first_slide_system: FIRST_SLIDE_SYSTEM_PROMPT,
      first_slide_user: FIRST_SLIDE_USER_PROMPT,
      next_slide_system: NEXT_SLIDE_SYSTEM_PROMPT,
      next_slide_user: NEXT_SLIDE_USER_PROMPT,
      image_edit_system: IMAGE_EDIT_SYSTEM_PROMPT,
      image_edit_user: IMAGE_EDIT_USER_PROMPT,
      card_edit_system: CARD_EDIT_SYSTEM_PROMPT,
      card_edit_user: CARD_EDIT_USER_PROMPT,
    };

    return defaults[id] || '';
  }

  /**
   * Get all templates (for admin panel)
   */
  async getAllTemplates(): Promise<PromptTemplate[]> {
    const data = await supabase.getAllPromptTemplates();
    return data.map(d => ({
      id: d.id,
      name: d.name,
      description: d.description,
      template: d.template,
      variables: d.variables,
      category: d.category as PromptTemplate['category'],
      isSystem: d.is_system,
    }));
  }

  /**
   * Update template (from admin panel)
   */
  async updateTemplate(id: string, template: string): Promise<boolean> {
    const success = await supabase.updatePromptTemplate(id, template);
    if (success) {
      this.cache.delete(id);
    }
    return success;
  }

  /**
   * Create new template
   */
  async createTemplate(data: {
    id: string;
    name: string;
    description?: string;
    template: string;
    variables?: string[];
    category: PromptTemplate['category'];
    isSystem?: boolean;
  }): Promise<boolean> {
    return supabase.createPromptTemplate({
      id: data.id,
      name: data.name,
      description: data.description,
      template: data.template,
      variables: data.variables,
      category: data.category,
      is_system: data.isSystem,
    });
  }

  /**
   * Delete template
   */
  async deleteTemplate(id: string): Promise<boolean> {
    const success = await supabase.deletePromptTemplate(id);
    if (success) {
      this.cache.delete(id);
    }
    return success;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Build image context from user descriptions
   */
  buildImageContext(images: Array<{ description?: string }>): string {
    return buildImageContext(images);
  }
}

export const promptsService = new PromptsService();