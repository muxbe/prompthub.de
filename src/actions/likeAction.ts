// Server Action for toggling likes
// Uses Next.js Server Actions pattern

'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { toggleLike, hasUserLiked } from '@/lib/supabase/queries/likes';

/**
 * Toggle like on a prompt
 * Returns the new like status and count
 */
export async function toggleLikeAction(promptId: string) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: 'You must be logged in to like prompts',
        isLiked: false,
      };
    }

    // Toggle the like
    const isLiked = await toggleLike(supabase, promptId, user.id);

    // Revalidate the pages that show this prompt
    revalidatePath('/');
    revalidatePath(`/prompts/${promptId}`);

    return {
      success: true,
      isLiked,
    };
  } catch (error) {
    console.error('Error in toggleLikeAction:', error);
    return {
      success: false,
      error: 'Failed to toggle like',
      isLiked: false,
    };
  }
}

/**
 * Check if current user has liked a prompt
 * Used to set initial state in client components
 */
export async function checkUserLikedAction(promptId: string) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { isLiked: false };
    }

    const isLiked = await hasUserLiked(supabase, promptId, user.id);

    return { isLiked };
  } catch (error) {
    console.error('Error in checkUserLikedAction:', error);
    return { isLiked: false };
  }
}
