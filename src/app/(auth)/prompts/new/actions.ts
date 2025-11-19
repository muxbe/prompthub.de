// Server Actions for creating prompts
// Following Lab37 Constitution - Forms use Server Actions + Zod validation

'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { getOptionalUser } from '@/lib/supabase/queries/auth';
import { createPrompt } from '@/lib/supabase/queries/prompts';
import { promptSchema } from '@/lib/validations/prompt';

export async function createPromptAction(formData: FormData) {
  try {
    // 1. Check authentication
    const user = await getOptionalUser();
    if (!user) {
      return { error: 'Authentication required. Please log in.' };
    }

    // 2. Extract form data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const prompt_text = formData.get('prompt_text') as string;
    const category = formData.get('category') as string;
    const platform_ids = formData.getAll('platform_ids') as string[];

    // 3. Validate with Zod schema (server-side validation)
    const parsed = promptSchema.safeParse({
      title,
      description,
      prompt_text,
      category,
      platform_ids,
    });

    if (!parsed.success) {
      // Return first error message
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors)[0];
      return {
        error: firstError ? firstError[0] : 'Validation failed',
      };
    }

    // 4. Get Supabase client
    const supabase = await createClient();

    // 5. Create prompt in database
    const promptData = {
      user_id: user.id,
      title: parsed.data.title,
      description: parsed.data.description,
      prompt_text: parsed.data.prompt_text,
      category: parsed.data.category,
    };

    const promptId = await createPrompt(
      supabase,
      promptData,
      parsed.data.platform_ids || []
    );

    // 6. Revalidate homepage to show new prompt
    revalidatePath('/');

    // 7. Return success
    return { success: true, promptId };
  } catch (error) {
    console.error('Error in createPromptAction:', error);
    return {
      error: 'Failed to create prompt. Please try again.',
    };
  }
}
