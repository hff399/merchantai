import axios from 'axios';
import { config } from '../config';

interface ImageGenerationParams {
  photoUrl: string;
  description?: string;
  style?: string;
  userId: string;
  orderId: string;
  sessionId: string;
}

interface ImageEditParams {
  photoUrl: string;
  description: string;
  userId: string;
  orderId: string;
  sessionId: string;
}

interface PhotoSessionParams {
  photoUrl: string;
  description?: string;
  count?: number;
  userId: string;
  orderId: string;
}

interface CarouselImageInput {
  url: string;
  role: 'product' | 'style_reference' | 'previous_slide' | 'inspiration' | 'background' | 'element' | 'logo' | 'other';
  description?: string;
  index: number;
}

interface CarouselSlideParams {
  // Multiple input images (up to 8)
  images: CarouselImageInput[];
  
  // Legacy: primary product image URL (for backward compatibility)
  originalImageUrl: string;
  
  // Prompt and slide info
  prompt: string;
  slideNumber: number;
  isFirstSlide: boolean;
  
  // Style reference (for slides 2+)
  styleReference?: {
    imageUrl: string;
    styleDescription: string;
  } | null;
  
  // Previous slides context
  previousSlides: Array<{
    imageUrl: string;
    prompt: string;
    style?: string;
  }>;
  
  // IDs
  userId: string;
  orderId: string;
  sessionId: string;
}

interface N8NResponse {
  success: boolean;
  images?: string[];
  buffer?: Uint8Array;
  contentType?: string;
  filename?: string;
  error?: string;
  message?: string;
  extractedStyle?: string;
}

class N8NService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = config.n8n.webhookUrl;
  }

  async generateImageCard(params: ImageGenerationParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/carousel-slide`,
        {
          photo_url: params.photoUrl,
          description: params.description || '',
          style: params.style || 'modern',
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          action: 'generate_card',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
      };
    } catch (error: any) {
      console.error('n8n image card generation error:', error.message);
      return {
        success: false,
        error: 'Ошибка генерации карточки',
      };
    }
  }

  async editImage(params: ImageEditParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/image-edit`,
        {
          photo_url: params.photoUrl,
          description: params.description,
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          action: 'edit_image',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
      };
    } catch (error: any) {
      console.error('n8n image edit error:', error.message);
      return {
        success: false,
        error: 'Ошибка редактирования изображения',
      };
    }
  }

  async generatePhotoSession(params: PhotoSessionParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/photo-session`,
        {
          photo_url: params.photoUrl,
          description: params.description || '',
          count: params.count || 5,
          user_id: params.userId,
          order_id: params.orderId,
          action: 'generate_session',
        },
        {
          timeout: 180000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
      };
    } catch (error: any) {
      console.error('n8n photo session generation error:', error.message);
      return {
        success: false,
        error: 'Ошибка генерации фотосессии',
      };
    }
  }

  async checkStatus(orderId: string): Promise<N8NResponse> {
    try {
      const response = await axios.get(`${this.webhookUrl}/status/${orderId}`, {
        timeout: 10000,
      });

      return response.data;
    } catch (error: any) {
      console.error('n8n status check error:', error.message);
      return {
        success: false,
        error: 'Ошибка проверки статуса',
      };
    }
  }

  /**
   * Generate a carousel slide with style consistency
   * Supports up to 8 input images with role attribution
   * Falls back to /carousel-slide endpoint if /carousel-slide is not available
   */
  async generateCarouselSlide(params: CarouselSlideParams): Promise<N8NResponse> {
    try {
      // Prepare images array with attribution
      const imagesPayload = params.images.map((img, idx) => ({
        url: img.url,
        role: img.role,
        description: img.description || this.getDefaultDescription(img.role),
        index: img.index || idx + 1,
      }));

      // Try carousel-specific endpoint first
      const response = await axios.post(
        `${this.webhookUrl}/carousel-slide`,
        {
          // Multiple images with attribution (up to 8)
          images: imagesPayload,
          
          // Legacy field for backward compatibility
          original_image_url: params.originalImageUrl,
          
          // Current slide info
          prompt: params.prompt,
          slide_number: params.slideNumber,
          is_first_slide: params.isFirstSlide,
          
          // Style reference (for slides 2+)
          style_reference: params.styleReference ? {
            image_url: params.styleReference.imageUrl,
            style_description: params.styleReference.styleDescription,
          } : null,
          
          // Previous slides for context
          previous_slides: params.previousSlides.map(s => ({
            image_url: s.imageUrl,
            prompt: s.prompt,
            style: s.style || null,
          })),
          
          // IDs for tracking
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          
          action: 'generate_carousel_slide',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);
      const extractedStyle = response.headers['x-extracted-style'] || undefined;

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
        extractedStyle,
      };
    } catch (error: any) {
      // If carousel endpoint fails, fallback to image-card endpoint
      console.log('Carousel endpoint failed, falling back to image-card:', error.message);
      
      try {
        // Build enhanced prompt with image context
        let enhancedPrompt = params.prompt;
        
        // Add image context to prompt
        if (params.images.length > 1) {
          const imageContext = params.images
            .filter(img => img.role !== 'product')
            .map(img => `[${img.role.toUpperCase()}]: ${img.description || 'reference image'}`)
            .join('\n');
          
          if (imageContext) {
            enhancedPrompt = `${params.prompt}\n\nADDITIONAL REFERENCES:\n${imageContext}`;
          }
        }
        
        if (!params.isFirstSlide && params.styleReference) {
          enhancedPrompt = `CAROUSEL SLIDE ${params.slideNumber} - MUST MATCH STYLE OF SLIDE 1\n\n` +
            `Style Reference: ${params.styleReference.styleDescription}\n\n` +
            `This slide should show: ${enhancedPrompt}\n\n` +
            `IMPORTANT: Maintain exact same visual style, colors, typography, and mood as the first slide.`;
        }
        
        const fallbackResponse = await axios.post(
          `${this.webhookUrl}/carousel-slide`,
          {
            photo_url: params.originalImageUrl,
            description: enhancedPrompt,
            style: 'carousel',
            user_id: params.userId,
            order_id: params.orderId,
            session_id: params.sessionId,
            action: 'generate_card',
          },
          {
            timeout: 120000,
            responseType: 'arraybuffer',
            transformResponse: (data) => data,
            headers: {
              Accept: 'image/jpeg,image/png',
            },
          }
        );

        const uint8 = new Uint8Array(fallbackResponse.data);

        return {
          success: true,
          buffer: uint8,
          contentType: fallbackResponse.headers['content-type'],
        };
      } catch (fallbackError: any) {
        console.error('Fallback to image-card also failed:', fallbackError.message);
        return {
          success: false,
          error: 'Ошибка генерации слайда карусели',
        };
      }
    }
  }

  /**
   * Get default description for image role
   */
  private getDefaultDescription(role: string): string {
    const descriptions: Record<string, string> = {
      product: 'Main product photo - DO NOT modify the product itself',
      style_reference: 'Style reference - match this visual style exactly',
      previous_slide: 'Previous carousel slide - maintain consistency',
      inspiration: 'Design inspiration - use as creative reference',
      background: 'Background reference - use similar background style',
      element: 'Design element - incorporate this element',
      logo: 'Brand logo - place appropriately on the card',
      other: 'Additional reference image',
    };
    return descriptions[role] || 'Reference image';
  }
}

export const n8n = new N8NService();