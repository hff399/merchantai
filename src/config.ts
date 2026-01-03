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
    webhookUrl: getEnvVar('N8N_WEBHOOK_URL'),
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
};