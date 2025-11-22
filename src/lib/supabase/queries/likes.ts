// Like query functions
// All functions accept supabase client as parameter (Lab37 Constitution pattern)

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

type Client = SupabaseClient<Database>;

/**
 * Toggle like on a prompt (add or remove)
 * Returns true if liked, false if unliked
 */
export async function toggleLike(
  supabase: Client,
  promptId: string,
  userId: string
): Promise<boolean> {
  // Check if user already liked this prompt
  const { data: existingLike } = await supabase
    .from('prompt_likes')
    .select('id')
    .eq('prompt_id', promptId)
    .eq('user_id', userId)
    .maybeSingle();

  if (existingLike) {
    // Unlike: remove the like
    const { error } = await supabase
      .from('prompt_likes')
      .delete()
      .eq('prompt_id', promptId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error removing like:', error);
      throw new Error('Failed to unlike prompt');
    }

    return false; // Unliked
  } else {
    // Like: add new like
    const { error } = await supabase
      .from('prompt_likes')
      .insert([{
        prompt_id: promptId,
        user_id: userId,
      }]);

    if (error) {
      console.error('Error adding like:', error);
      throw new Error('Failed to like prompt');
    }

    return true; // Liked
  }
}

/**
 * Check if a user has liked a specific prompt
 */
export async function hasUserLiked(
  supabase: Client,
  promptId: string,
  userId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('prompt_likes')
    .select('id')
    .eq('prompt_id', promptId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    // No like found (not an error condition)
    return false;
  }

  return !!data;
}

/**
 * Get total like count for a prompt
 * Note: Usually you'd get this from prompts_with_stats view
 * This is here for standalone use if needed
 */
export async function getLikeCount(
  supabase: Client,
  promptId: string
): Promise<number> {
  const { count, error } = await supabase
    .from('prompt_likes')
    .select('*', { count: 'exact', head: true })
    .eq('prompt_id', promptId);

  if (error) {
    console.error('Error counting likes:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Get all prompts a user has liked
 * Useful for "My Liked Prompts" feature (future)
 */
export async function getLikedPromptsByUser(
  supabase: Client,
  userId: string
): Promise<string[]> {
  const { data, error } = await supabase
    .from('prompt_likes')
    .select('prompt_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching liked prompts:', error);
    return [];
  }

  return data?.map((like) => like.prompt_id) || [];
}
