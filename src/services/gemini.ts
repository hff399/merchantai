import axios from 'axios';
import { config } from '../config';


export interface GeminiImageInput {
  base64: string;
  mimeType: string;
}

export interface GeminiGenerationResult {
  success: boolean;
  imageBuffer?: Buffer;
  mimeType?: string;
  error?: string;
  textResponse?: string;
}

class GeminiService {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.gemini.apiKey;
    this.model = config.gemini.model;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  }

  /**
   * Download image from URL and convert to base64
   */
  async downloadImageAsBase64(url: string): Promise<GeminiImageInput> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
      });

      const buffer = Buffer.from(response.data);
      const base64 = buffer.toString('base64');
      
      // Detect mime type from response header, URL extension, or magic bytes
      let mimeType = this.detectMimeType(
        response.headers['content-type'],
        url,
        buffer
      );

      return { base64, mimeType };
    } catch (error: any) {
      console.error(`Failed to download image from ${url}:`, error.message);
      throw new Error(`Failed to download image: ${error.message}`);
    }
  }

  /**
   * Detect MIME type from various sources
   */
  private detectMimeType(
    contentType: string | undefined,
    url: string,
    buffer: Buffer
  ): string {
    // 1. Try content-type header (if not octet-stream)
    if (contentType && !contentType.includes('octet-stream')) {
      const mime = contentType.split(';')[0].trim();
      if (mime.startsWith('image/')) {
        return mime;
      }
    }

    // 2. Try URL extension
    const urlLower = url.toLowerCase();
    if (urlLower.includes('.jpg') || urlLower.includes('.jpeg')) {
      return 'image/jpeg';
    }
    if (urlLower.includes('.png')) {
      return 'image/png';
    }
    if (urlLower.includes('.gif')) {
      return 'image/gif';
    }
    if (urlLower.includes('.webp')) {
      return 'image/webp';
    }

    // 3. Try magic bytes
    if (buffer.length >= 4) {
      // JPEG: FF D8 FF
      if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
        return 'image/jpeg';
      }
      // PNG: 89 50 4E 47
      if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
        return 'image/png';
      }
      // GIF: 47 49 46 38
      if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
        return 'image/gif';
      }
      // WebP: 52 49 46 46 ... 57 45 42 50
      if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
        if (buffer.length >= 12 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
          return 'image/webp';
        }
      }
    }

    // 4. Default to JPEG (most common for photos)
    console.log(`[Gemini] Could not detect MIME type, defaulting to image/jpeg`);
    return 'image/jpeg';
  }

  /**
   * Generate image using Gemini with multiple input images
   * Supports up to 8 input images
   */
  async generateImage(
    prompt: string,
    images: GeminiImageInput[]
  ): Promise<GeminiGenerationResult> {
    if (images.length === 0) {
      return { success: false, error: 'At least one image is required' };
    }

    if (images.length > 8) {
      return { success: false, error: 'Maximum 8 images allowed' };
    }

    // Build parts array: images first, then text prompt
    const parts: any[] = [];

    // Add all images
    for (const img of images) {
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.base64,
        },
      });
    }

    // Add text prompt
    parts.push({
      text: prompt,
    });

    const requestBody = {
      contents: [
        {
          parts,
        },
      ],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 120000, // 2 minutes timeout
        }
      );

      // Extract image from response
      const candidates = response.data?.candidates;
      if (!candidates || candidates.length === 0) {
        return { success: false, error: 'No candidates in response' };
      }

      const content = candidates[0]?.content;
      if (!content?.parts) {
        return { success: false, error: 'No content parts in response' };
      }

      // Find image part
      let imageData: string | null = null;
      let imageMimeType = 'image/png';
      let textResponse = '';

      for (const part of content.parts) {
        if (part.inlineData) {
          imageData = part.inlineData.data;
          imageMimeType = part.inlineData.mimeType || 'image/png';
        }
        if (part.text) {
          textResponse += part.text;
        }
      }

      if (!imageData) {
        return { 
          success: false, 
          error: 'No image in response',
          textResponse: textResponse || undefined,
        };
      }

      const imageBuffer = Buffer.from(imageData, 'base64');

      return {
        success: true,
        imageBuffer,
        mimeType: imageMimeType,
        textResponse: textResponse || undefined,
      };
    } catch (error: any) {
      console.error('Gemini API error:', error.response?.data || error.message);
      
      // Extract error message from API response
      const apiError = error.response?.data?.error?.message || error.message;
      
      return {
        success: false,
        error: `Gemini generation failed: ${apiError}`,
      };
    }
  }

  /**
   * Generate image from URLs (convenience method)
   * Downloads all images and calls generateImage
   */
  async generateImageFromUrls(
    prompt: string,
    imageUrls: string[]
  ): Promise<GeminiGenerationResult> {
    try {
      console.log(`\n[Gemini] ========== GENERATION REQUEST ==========`);
      console.log(`[Gemini] Images: ${imageUrls.length}`);
      console.log(`[Gemini] Prompt length: ${prompt.length} chars`);
      console.log(`[Gemini] FINAL PROMPT:\n${prompt}`);
      console.log(`[Gemini] ==========================================\n`);
      
      // Download all images in parallel
      const downloadPromises = imageUrls.map(url => this.downloadImageAsBase64(url));
      const images = await Promise.all(downloadPromises);

      return this.generateImage(prompt, images);
    } catch (error: any) {
      return {
        success: false,
        error: `Failed to prepare images: ${error.message}`,
      };
    }
  }

  /**
   * Edit/transform an image with a prompt
   */
  async editImage(
    prompt: string,
    imageUrl: string
  ): Promise<GeminiGenerationResult> {
    return this.generateImageFromUrls(prompt, [imageUrl]);
  }
}

export const gemini = new GeminiService();