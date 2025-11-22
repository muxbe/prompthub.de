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
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-900">გადახედეთ</h4>
      <div className="space-y-3">
        {similarPrompts.map((prompt) => (
          <Link
            key={prompt.id}
            href={`/prompts/${prompt.id}`}
            className="block bg-gray-50 border-2 border-gray-100 rounded-lg p-4 hover:shadow-md hover:border-gray-200 transition-all"
          >
            <h5 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
              {prompt.title}
            </h5>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {prompt.description}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              {/* Author */}
              <div className="flex items-center gap-1.5">
                <span className="text-base leading-none" style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}>👤</span>
                <span className="text-gray-700">{prompt.author_email?.split('@')[0] || 'ანონიმი'}</span>
              </div>
              {/* Likes */}
              <div className="flex items-center gap-1.5">
                <span className="text-base leading-none" style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}>👍</span>
                <span className="text-gray-700">{prompt.like_count || 0}</span>
              </div>
              {/* Comments */}
              <div className="flex items-center gap-1.5">
                <span className="text-base leading-none" style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}>📋</span>
                <span className="text-gray-700">{prompt.copy_count || 0}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
