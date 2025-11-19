// Prompt validation schemas using Zod
// Following Lab37 Constitution - Forms use Server Actions + Zod

import { z } from 'zod';

export const promptSchema = z.object({
  title: z.string()
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must be 200 characters or less"),

  description: z.string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be 1000 characters or less"),

  prompt_text: z.string()
    .min(20, "Prompt text must be at least 20 characters")
    .max(5000, "Prompt text must be 5000 characters or less"), // DECISION: 5000 chars, not 500

  category: z.string()
    .min(1, "Please select a category"),

  custom_category: z.string()
    .min(3, "Custom category must be at least 3 characters")
    .max(50, "Custom category must be 50 characters or less")
    .optional(),

  platform_ids: z.array(z.string().uuid()).optional(),
});

export type PromptFormData = z.infer<typeof promptSchema>;
