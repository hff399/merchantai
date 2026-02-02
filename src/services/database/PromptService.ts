/**
 * Prompt service implementation
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IPromptService } from '../interfaces/IPromptService';
import type { PromptTemplate } from '../../core/types';
import { getSupabaseClient } from './SupabaseClient';

export class PromptService implements IPromptService {
  private client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    this.client = client || getSupabaseClient();
  }

  async getPromptTemplate(id: string): Promise<{ id: string; template: string } | null> {
    const { data, error } = await this.client
      .from('prompt_templates')
      .select('id, template')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error('getPromptTemplate error:', error);
      return null;
    }

    return data;
  }

  async getAllPromptTemplates(): Promise<PromptTemplate[]> {
    const { data, error } = await this.client
      .from('prompt_templates')
      .select('*')
      .order('category')
      .order('is_system', { ascending: false });

    if (error) {
      console.error('getAllPromptTemplates error:', error);
      return [];
    }

    return data || [];
  }

  async updatePromptTemplate(id: string, template: string): Promise<boolean> {
    const { error } = await this.client
      .from('prompt_templates')
      .update({
        template,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('updatePromptTemplate error:', error);
      return false;
    }

    return true;
  }

  async createPromptTemplate(data: {
    id: string;
    name: string;
    description?: string;
    template: string;
    variables?: string[];
    category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
    is_system?: boolean;
  }): Promise<boolean> {
    const { error } = await this.client.from('prompt_templates').insert({
      id: data.id,
      name: data.name,
      description: data.description || '',
      template: data.template,
      variables: data.variables || [],
      category: data.category,
      is_system: data.is_system || false,
      is_active: true,
    });

    if (error) {
      console.error('createPromptTemplate error:', error);
      return false;
    }

    return true;
  }

  async deletePromptTemplate(id: string): Promise<boolean> {
    const { error } = await this.client
      .from('prompt_templates')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('deletePromptTemplate error:', error);
      return false;
    }

    return true;
  }
}

// Singleton instance
let promptServiceInstance: PromptService | null = null;

export function getPromptService(): PromptService {
  if (!promptServiceInstance) {
    promptServiceInstance = new PromptService();
  }
  return promptServiceInstance;
}
