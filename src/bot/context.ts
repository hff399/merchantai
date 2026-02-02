/**
 * Bot context type definitions
 */

import { Context, SessionFlavor } from 'grammy';
import type { SessionData } from '../core/types';
import type { ServiceContainer } from '../services';

// Services flavor for context
export interface ServicesFlavor {
  services: ServiceContainer;
}

// Full bot context type
export type MyContext = Context & SessionFlavor<SessionData> & ServicesFlavor;

// Context without services (for middleware before services are injected)
export type BaseContext = Context & SessionFlavor<SessionData>;
