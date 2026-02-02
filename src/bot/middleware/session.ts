/**
 * Session middleware
 */

import { session } from 'grammy';
import type { SessionData } from '../../core/types';
import { ROUTES } from '../../core/types';

// Initial session data
export function getInitialSessionData(): SessionData {
  return {
    currentRoute: ROUTES.MAIN_MENU,
    tempData: {},
  };
}

// Create session middleware
export function createSessionMiddleware() {
  return session({
    initial: getInitialSessionData,
  });
}
