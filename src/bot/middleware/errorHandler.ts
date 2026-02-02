/**
 * Error handler middleware
 */

import type { ErrorHandler } from 'grammy';
import type { MyContext } from '../context';
import { isAppError, wrapError } from '../../core/errors';
import { TEXTS } from '../../core/constants';

// Create error handler
export function createErrorHandler(): ErrorHandler<MyContext> {
  return async (err) => {
    const ctx = err.ctx;
    const error = wrapError(err.error);

    // Log error
    console.error('Bot error:', {
      code: error.code,
      message: error.message,
      details: error.details,
      userId: ctx.from?.id,
      route: ctx.session?.currentRoute,
    });

    // Try to send user-friendly error message
    try {
      if (isAppError(err.error)) {
        await ctx.reply(err.error.toUserMessage());
      } else {
        await ctx.reply(TEXTS.ERROR_GENERAL);
      }
    } catch (replyError) {
      console.error('Failed to send error reply:', replyError);
    }
  };
}

// Simple logging middleware
export function createLoggingMiddleware() {
  return async (ctx: MyContext, next: () => Promise<void>) => {
    const start = Date.now();

    try {
      await next();
    } finally {
      const duration = Date.now() - start;

      // Log slow requests
      if (duration > 5000) {
        console.warn(`Slow request: ${duration}ms`, {
          userId: ctx.from?.id,
          updateType: ctx.update.message ? 'message' : 'callback',
          route: ctx.session?.currentRoute,
        });
      }
    }
  };
}
