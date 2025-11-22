// AI Platform query functions
// All functions accept supabase client as parameter (Lab37 Constitution pattern)

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Client = SupabaseClient<Database>;
type Platform = Database['public']['Tables']['ai_platforms']['Row'];

/**
 * Get all AI platforms
 * Used in the "Add Prompt" form to populate checkboxes
 */
export async function getPlatforms(supabase: Client): Promise<Platform[]> {
  const { data, error } = await (supabase
    .from('ai_platforms') as any)
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching platforms:', error);
    throw new Error('Failed to fetch platforms');
  }

  return data || [];
}

/**
 * Get a single platform by ID
 */
export async function getPlatformById(
  supabase: Client,
  id: string
): Promise<Platform | null> {
  const { data, error } = await (supabase
    .from('ai_platforms') as any)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching platform:', error);
    return null;
  }

  return data;
}

/**
 * Get a platform by name
 */
export async function getPlatformByName(
  supabase: Client,
  name: string
): Promise<Platform | null> {
  const { data, error } = await (supabase
    .from('ai_platforms') as any)
    .select('*')
    .eq('name', name)
    .single();

  if (error) {
    console.error('Error fetching platform:', error);
    return null;
  }

  return data;
}
