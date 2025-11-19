// Server Action for incrementing copy count
// Uses Next.js Server Actions pattern

'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { incrementCopyCount } from '@/lib/supabase/queries/prompts';

/**
 * Increment copy count when user copies a prompt
 * This is called from the client after successful copy
 */
export async function incrementCopyCountAction(promptId: string) {
  try {
    const supabase = await createClient();

    // Increment the counter
    await incrementCopyCount(supabase, promptId);

    // Revalidate the pages that show this prompt's copy count
    revalidatePath('/');
    revalidatePath(`/prompts/${promptId}`);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error in incrementCopyCountAction:', error);
    return {
      success: false,
      error: 'Failed to increment copy count',
    };
  }
}
