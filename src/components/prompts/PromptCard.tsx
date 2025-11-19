// PromptCard Component
// Displays prompt preview in grid layout

'use client';

import { useRouter } from 'next/navigation';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { LikeButton } from '@/components/prompts/LikeButton';
import type { Database } from '@/types/database';

type PromptWithStats = Database['public']['Views']['prompts_with_stats']['Row'];

type PromptCardProps = {
  prompt: PromptWithStats;
};

export function PromptCard({ prompt }: PromptCardProps) {
  const router = useRouter();

  // Truncate description to 2 lines (roughly 100 chars)
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Handle card click (navigate to detail page)
  const handleCardClick = () => {
    router.push(`/prompts/${prompt.id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group h-full bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer"
    >
        {/* Category Badge */}
        <div className="mb-3">
          <CategoryBadge category={prompt.category} size="small" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
          {prompt.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {truncateText(prompt.description)}
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Footer: Author, Stats, Like Button */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          {/* Left: Author and Copy count */}
          <div className="flex items-center gap-3">
            {/* Author */}
            <div className="flex items-center gap-1 truncate">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="truncate">{prompt.author_email || 'Anonymous'}</span>
            </div>

            {/* Copy count */}
            <div className="flex items-center gap-1" title={`${prompt.copy_count} copies`}>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>{prompt.copy_count}</span>
            </div>
          </div>

          {/* Right: Like Button (clickable, stops propagation) */}
          <div
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
            }}
            className="flex-shrink-0"
          >
            <LikeButton
              promptId={prompt.id}
              initialLikes={prompt.like_count || 0}
              variant="compact"
            />
          </div>
        </div>
      </article>
    );
  }
