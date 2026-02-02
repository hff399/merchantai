/**
 * Service Container
 * Central factory for all services with dependency injection support
 */

import { getUserService } from './database/UserService';
import { getOrderService, getPaymentService } from './database/OrderService';
import { getStorageService } from './database/StorageService';
import { getPromptService } from './database/PromptService';
import type { IUserService } from './interfaces/IUserService';
import type { IOrderService, IPaymentService } from './interfaces/IOrderService';
import type { IStorageService } from './interfaces/IStorageService';
import type { IPromptService } from './interfaces/IPromptService';

// Service container interface
export interface ServiceContainer {
  user: IUserService;
  order: IOrderService;
  payment: IPaymentService;
  storage: IStorageService;
  prompt: IPromptService;
}

// Create service container with real implementations
export function createServiceContainer(): ServiceContainer {
  return {
    user: getUserService(),
    order: getOrderService(),
    payment: getPaymentService(),
    storage: getStorageService(),
    prompt: getPromptService(),
  };
}

// Create service container with custom implementations (for testing)
export function createCustomServiceContainer(overrides: Partial<ServiceContainer>): ServiceContainer {
  return {
    user: overrides.user || getUserService(),
    order: overrides.order || getOrderService(),
    payment: overrides.payment || getPaymentService(),
    storage: overrides.storage || getStorageService(),
    prompt: overrides.prompt || getPromptService(),
  };
}

// Singleton service container
let serviceContainerInstance: ServiceContainer | null = null;

export function getServiceContainer(): ServiceContainer {
  if (!serviceContainerInstance) {
    serviceContainerInstance = createServiceContainer();
  }
  return serviceContainerInstance;
}

// Reset service container (for testing)
export function resetServiceContainer(): void {
  serviceContainerInstance = null;
}

// Re-export interfaces and implementations
export * from './interfaces';
export * from './database';

// Re-export existing services for backward compatibility
export { supabase } from './supabase';
