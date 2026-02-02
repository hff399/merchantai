/**
 * Bot factory
 * Creates and configures the bot instance
 */

import { Bot } from 'grammy';
import type { MyContext } from './context';
import { createSessionMiddleware } from './middleware/session';
import { createServicesMiddleware } from './middleware/services';
import { createErrorHandler, createLoggingMiddleware } from './middleware/errorHandler';
import { createComposers } from './composers';
import type { ServiceContainer } from '../services';

// Bot configuration options
export interface BotConfig {
  token: string;
  services?: ServiceContainer;
  enableLogging?: boolean;
}

// Create configured bot instance
export function createBot(config: BotConfig): Bot<MyContext> {
  const bot = new Bot<MyContext>(config.token);

  // Session middleware
  bot.use(createSessionMiddleware());

  // Services middleware
  bot.use(createServicesMiddleware(config.services) as any);

  // Logging middleware (optional)
  if (config.enableLogging) {
    bot.use(createLoggingMiddleware());
  }

  // Error handler
  bot.catch(createErrorHandler());

  // Register all composers
  bot.use(createComposers());

  return bot;
}

// Re-export context types
export type { MyContext } from './context';

// Re-export middleware
export * from './middleware';

// Re-export keyboards
export * from './keyboards';

// Re-export composers
export * from './composers';
