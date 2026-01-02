import axios from 'axios';
import { config } from '../config';

interface ImageGenerationParams {
  photoUrl: string;
  description?: string;
  style?: string;
  userId: string;
  orderId: string;
  sessionId: string; // Unique session ID for ChatGPT memory
}

interface ImageEditParams {
  photoUrl: string;
  description: string;
  userId: string;
  orderId: string;
  sessionId: string; // Unique session ID for ChatGPT memory
}

interface PhotoSessionParams {
  photoUrl: string;
  description?: string;
  count?: number;
  userId: string;
  orderId: string;
}

interface N8NResponse {
  success: boolean;

  // JSON-based response (recommended path)
  images?: string[];

  // Binary-based response (when returning raw image)
  buffer?: Uint8Array;
  contentType?: string;
  filename?: string;

  // Errors / messages
  error?: string;
  message?: string;
}

class N8NService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = config.n8n.webhookUrl;
  }

  async generateImageCard(params: ImageGenerationParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/image-card`,
        {
          photo_url: params.photoUrl,
          description: params.description || '',
          style: params.style || 'modern',
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId, // For ChatGPT memory
          action: 'generate_card',
        },
        {
          timeout: 120000,

          // CRITICAL: do NOT let axios touch encoding
          responseType: 'arraybuffer',
          transformResponse: (data) => data,

          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      // response.data is now a REAL ArrayBuffer
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
          session_id: params.sessionId, // For ChatGPT memory
          action: 'edit_image',
        },
        {
          timeout: 120000,

          // CRITICAL: do NOT let axios touch encoding
          responseType: 'arraybuffer',
          transformResponse: (data) => data,

          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      // response.data is now a REAL ArrayBuffer
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
          timeout: 180000, // 3 minutes timeout
        }
      );

      return response.data;
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
}

export const n8n = new N8NService();