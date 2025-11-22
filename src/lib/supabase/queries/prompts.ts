// Prompt query functions
// All functions accept supabase client as parameter (Lab37 Constitution pattern)

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Client = SupabaseClient<Database>;
type PromptWithStats = Database['public']['Views']['prompts_with_stats']['Row'];
type PromptInsert = Database['public']['Tables']['prompts']['Insert'];

export interface GetPromptsOptions {
  category?: string;
  search?: string;
  sortBy?: 'popular' | 'new' | 'most_copied';
}

/**
 * Get all prompts with enriched data (likes, platforms, author)
 * Uses the prompts_with_stats view for efficiency
 */
export async function getPrompts(
  supabase: Client,
  options: GetPromptsOptions = {}
): Promise<PromptWithStats[]> {
  let query = (supabase.from('prompts_with_stats') as any).select('*');

  // Filter by category
  if (options.category && options.category !== 'all') {
    if (options.category === 'Other') {
      // Show all custom categories (not in the main 4)
      query = query
        .neq('category', 'Copywriting')
        .neq('category', 'Development')
        .neq('category', 'Marketing')
        .neq('category', 'Education');
    } else {
      query = query.eq('category', options.category);
    }
  }

  // Search in title and description
  if (options.search) {
    query = query.or(
      `title.ilike.%${options.search}%,description.ilike.%${options.search}%`
    );
  }

  // Sort
  switch (options.sortBy) {
    case 'popular':
      query = query.order('like_count', { ascending: false });
      break;
    case 'most_copied':
      query = query.order('copy_count', { ascending: false });
      break;
    case 'new':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching prompts:', error);
    throw new Error('Failed to fetch prompts');
  }

  return data || [];
}

/**
 * Get a single prompt by ID with all details
 * Uses the prompts_with_stats view
 */
export async function getPromptById(
  supabase: Client,
  id: string
): Promise<PromptWithStats | null> {
  const { data, error } = await supabase
    .from('prompts_with_stats')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching prompt:', error);
    return null;
  }

  return data;
}

/**
 * Create a new prompt
 * Also creates the prompt-platform relationships
 */
export async function createPrompt(
  supabase: Client,
  prompt: Omit<PromptInsert, 'id' | 'created_at' | 'updated_at' | 'copy_count'>,
  platformIds: string[]
): Promise<string> {
  // Insert prompt
  const { data: newPrompt, error: promptError } = await (supabase
    .from('prompts') as any)
    .insert(prompt)
    .select('id')
    .single();

  if (promptError || !newPrompt) {
    console.error('Error creating prompt:', promptError);
    throw new Error('Failed to create prompt');
  }

  // Insert platform relationships
  if (platformIds.length > 0) {
    const platformLinks = platformIds.map((platformId) => ({
      prompt_id: newPrompt.id,
      platform_id: platformId,
    }));

    const { error: platformError } = await (supabase
      .from('prompt_platforms') as any)
      .insert(platformLinks);

    if (platformError) {
      console.error('Error linking platforms:', platformError);
      // Prompt was created but platforms failed - still return success
      // User can edit later in v2
    }
  }

  return newPrompt.id;
}

/**
 * Increment the copy count for a prompt
 * Called when user clicks the copy button
 */
export async function incrementCopyCount(
  supabase: Client,
  promptId: string
): Promise<void> {
  const { error } = await (supabase as any).rpc('increment_copy_count', {
    prompt_id: promptId,
  });

  if (error) {
    console.error('Error incrementing copy count:', error);
    // Don't throw - this is not critical
  }
}

/**
 * Get prompts by a specific user
 * Useful for "My Prompts" page in v2
 */
export async function getPromptsByUser(
  supabase: Client,
  userId: string
): Promise<PromptWithStats[]> {
  const { data, error } = await supabase
    .from('prompts_with_stats')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user prompts:', error);
    throw new Error('Failed to fetch user prompts');
  }

  return data || [];
}

/**
 * Get similar prompts (same category, excluding current prompt)
 * Used on prompt detail page
 */
export async function getSimilarPrompts(
  supabase: Client,
  promptId: string,
  category: string,
  limit: number = 3
): Promise<PromptWithStats[]> {
  const { data, error } = await supabase
    .from('prompts_with_stats')
    .select('*')
    .eq('category', category)
    .neq('id', promptId)
    .order('like_count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching similar prompts:', error);
    return [];
  }

  return data || [];
}

/**
 * Get all unique categories from prompts
 * Used for dynamic category filter
 */
export async function getUniqueCategories(supabase: Client): Promise<string[]> {
  const { data, error } = await (supabase
    .from('prompts') as any)
    .select('category')
    .order('category');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Get unique categories
  const uniqueCategories = [...new Set(data.map((item: any) => item.category))] as string[];
  return uniqueCategories;
}
