/**
 * Prompt service interface
 */

import type { PromptTemplate } from '../../core/types';

export interface IPromptService {
  // Get prompt template by ID
  getPromptTemplate(id: string): Promise<{ id: string; template: string } | null>;

  // Get all prompt templates
  getAllPromptTemplates(): Promise<PromptTemplate[]>;

  // Update prompt template
  updatePromptTemplate(id: string, template: string): Promise<boolean>;

  // Create prompt template
  createPromptTemplate(data: {
    id: string;
    name: string;
    description?: string;
    template: string;
    variables?: string[];
    category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
    is_system?: boolean;
  }): Promise<boolean>;

  // Delete (deactivate) prompt template
  deletePromptTemplate(id: string): Promise<boolean>;
}
