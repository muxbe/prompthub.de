// SimilarPrompts Component
// Server Component - fetches 3 similar prompts from same category

import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getSimilarPrompts } from '@/lib/supabase/queries/prompts';
import { CategoryBadge } from '@/components/ui/CategoryBadge';

type SimilarPromptsProps = {
  currentPromptId: string;
  category: string;
};

export async function SimilarPrompts({
  currentPromptId,
  category,
}: SimilarPromptsProps) {
  const supabase = await createClient();
  const similarPrompts = await getSimilarPrompts(supabase, currentPromptId, category, 3);

  if (similarPrompts.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        No similar prompts found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Similar Prompts</h4>
      <div className="space-y-3">
        {similarPrompts.map((prompt) => (
          <Link
            key={prompt.id}
            href={`/prompts/${prompt.id}`}
            className="block border border-gray-200 rounded-md p-3 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="mb-2">
              <CategoryBadge category={prompt.category} size="small" />
            </div>
            <h5 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
              {prompt.title}
            </h5>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
              {prompt.description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {prompt.like_count}
                </span>
              </div>
              <span className="text-blue-600 font-medium">View →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
