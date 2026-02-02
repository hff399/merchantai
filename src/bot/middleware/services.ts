/**
 * Services middleware
 * Injects service container into context
 */

import type { MiddlewareFn } from 'grammy';
import type { MyContext, BaseContext } from '../context';
import { getServiceContainer, type ServiceContainer } from '../../services';

// Create services middleware
export function createServicesMiddleware(
  container?: ServiceContainer
): MiddlewareFn<BaseContext> {
  const services = container || getServiceContainer();

  return async (ctx, next) => {
    // Type assertion to add services to context
    (ctx as MyContext).services = services;
    await next();
  };
}
