/**
 * Storage service interface
 */

export type ImageType = 'card' | 'edit' | 'session';

export interface IStorageService {
  // Upload image to storage
  uploadImage(
    buffer: Buffer,
    userId: string,
    orderId: string,
    type?: ImageType
  ): Promise<string | null>;

  // Get public URL for a file
  getPublicUrl(filePath: string): string;

  // Delete image from storage
  deleteImage(filePath: string): Promise<boolean>;
}
