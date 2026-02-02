/**
 * Shared Supabase client provider
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../../config';

let supabaseClient: SupabaseClient | null = null;

/**
 * Get the shared Supabase client instance
 * Uses singleton pattern for connection reuse
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseClient;
}

/**
 * Create a new Supabase client instance (for testing or isolation)
 */
export function createSupabaseClient(): SupabaseClient {
  return createClient(config.supabase.url, config.supabase.serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
