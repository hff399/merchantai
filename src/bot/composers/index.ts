/**
 * Composer aggregator
 * Combines all composers into a single composer
 */

import { Composer } from 'grammy';
import type { MyContext } from '../context';
import { createCommandsComposer } from './commands';
import { createMainMenuComposer } from './mainMenu';
import { createProfileComposer } from './profile';
import { createSupportComposer } from './support';
import { createCreditsComposer } from './credits';

// Create aggregated composer with all handlers
export function createComposers(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // Register all composers
  composer.use(createCommandsComposer());
  composer.use(createMainMenuComposer());
  composer.use(createProfileComposer());
  composer.use(createSupportComposer());
  composer.use(createCreditsComposer());

  return composer;
}

// Export individual composers for granular use
export { createCommandsComposer } from './commands';
export { createMainMenuComposer } from './mainMenu';
export { createProfileComposer } from './profile';
export { createSupportComposer } from './support';
export { createCreditsComposer } from './credits';
