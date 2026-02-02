/**
 * Storage service implementation
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IStorageService, ImageType } from '../interfaces/IStorageService';
import { STORAGE } from '../../core/constants';
import { getSupabaseClient } from './SupabaseClient';

export class StorageService implements IStorageService {
  private client: SupabaseClient;
  private bucketName: string;

  constructor(client?: SupabaseClient, bucketName?: string) {
    this.client = client || getSupabaseClient();
    this.bucketName = bucketName || STORAGE.BUCKET_NAME;
  }

  async uploadImage(
    buffer: Buffer,
    userId: string,
    orderId: string,
    type: ImageType = 'card'
  ): Promise<string | null> {
    try {
      const timestamp = Date.now();
      const fileName = `${type}/${userId}/${orderId}_${timestamp}.jpg`;

      const { error } = await this.client.storage.from(this.bucketName).upload(fileName, buffer, {
        contentType: STORAGE.IMAGE_CONTENT_TYPE,
        upsert: false,
      });

      if (error) {
        console.error('Supabase storage upload error:', error);
        return null;
      }

      return this.getPublicUrl(fileName);
    } catch (error) {
      console.error('Upload image error:', error);
      return null;
    }
  }

  getPublicUrl(filePath: string): string {
    const { data } = this.client.storage.from(this.bucketName).getPublicUrl(filePath);
    return data.publicUrl;
  }

  async deleteImage(filePath: string): Promise<boolean> {
    try {
      const { error } = await this.client.storage.from(this.bucketName).remove([filePath]);

      if (error) {
        console.error('Delete image error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Delete image error:', error);
      return false;
    }
  }
}

// Singleton instance
let storageServiceInstance: StorageService | null = null;

export function getStorageService(): StorageService {
  if (!storageServiceInstance) {
    storageServiceInstance = new StorageService();
  }
  return storageServiceInstance;
}
