/**
 * Types module - re-exports from core/types for backward compatibility
 *
 * DEPRECATED: Import directly from './core/types' for new code
 */

import { Context, SessionFlavor } from 'grammy';

// Re-export all types from core
export * from './core/types';

// Re-export constants from core
export { CREDIT_PACKAGES, PLANS } from './core/constants';

// Import types needed for MyContext
import type { SessionData } from './core/types';

// MyContext type for grammy - the main context type used throughout the app
export type MyContext = Context & SessionFlavor<SessionData>;

// Re-export CreditPackage and PlanDetails for backward compatibility
export type { CreditPackage, PlanDetails } from './core/types';