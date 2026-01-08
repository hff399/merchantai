import dotenv from 'dotenv';

dotenv.config();

interface Config {
  botToken: string;
  notificationBotToken: string;
  notificationChatIds: number[];
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  yookassa: {
    shopId: string;
    secretKey: string;
  };
  n8n: {
    webhookUrl: string;
  };
  openai: {
    apiKey: string;
    model: string;
  };
  gemini: {
    apiKey: string;
    model: string;
  };
  media: {
    introVideoFileId: string | null;
  };
  nodeEnv: string;
  port: number;
}

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

const getOptionalEnvVar = (key: string, defaultValue = ''): string => {
  return process.env[key] || defaultValue;
};

export const config: Config = {
  botToken: getEnvVar('BOT_TOKEN'),
  notificationBotToken: getOptionalEnvVar('NOTIFICATION_BOT_TOKEN'),
  notificationChatIds: process.env.NOTIFICATION_CHAT_IDS?.split(',').map(Number).filter(Boolean) || [],
  supabase: {
    url: getEnvVar('SUPABASE_URL'),
    anonKey: getEnvVar('SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  },
  yookassa: {
    shopId: getEnvVar('YOOKASSA_SHOP_ID'),
    secretKey: getEnvVar('YOOKASSA_SECRET_KEY'),
  },
  n8n: {
    webhookUrl: getOptionalEnvVar('N8N_WEBHOOK_URL'),
  },
  openai: {
    apiKey: getEnvVar('OPENAI_API_KEY'),
    model: getOptionalEnvVar('OPENAI_MODEL', 'gpt-4o'),
  },
  gemini: {
    apiKey: getEnvVar('GEMINI_API_KEY'),
    model: getOptionalEnvVar('GEMINI_MODEL', 'gemini-2.0-flash-exp-image-generation'),
  },
  media: {
    introVideoFileId: getOptionalEnvVar('INTRO_VIDEO_FILE_ID') || null,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
};