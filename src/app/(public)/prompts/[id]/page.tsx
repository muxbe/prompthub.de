// Prompt Detail Page
// Server Component - shows full prompt with all details

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getPromptById } from '@/lib/supabase/queries/prompts';
import { Header } from '@/components/layout/Header';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { PlatformButtons } from '@/components/prompts/PlatformButtons';
import { SimilarPrompts } from '@/components/prompts/SimilarPrompts';
import { CopyButton } from '@/components/prompts/CopyButton';
import { CopyLinkButton } from '@/components/prompts/CopyLinkButton';
import { LikeButtonFull } from '@/components/prompts/LikeButtonFull';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PromptDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const prompt = await getPromptById(supabase, id);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to prompts
          </Link>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Badge */}
            <div>
              <CategoryBadge category={prompt.category} size="medium" />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{prompt.title}</h1>

            {/* Description */}
            <div className="text-lg text-gray-700 leading-relaxed">
              {prompt.description}
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Prompt Text */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Prompt:</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900">
                  {prompt.prompt_text}
                </pre>
              </div>
            </div>

            {/* Author Info (Mobile - shows here on mobile) */}
            <div className="lg:hidden border-t border-gray-200 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{prompt.author_email || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Info (1/3 width) */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Like Button - Full width button above copy buttons */}
              <LikeButtonFull promptId={prompt.id} initialLikes={prompt.like_count} />

              <CopyButton promptText={prompt.prompt_text} promptId={prompt.id} />
              <CopyLinkButton />
            </div>

            {/* Platform Buttons */}
            <PlatformButtons platforms={prompt.platforms} promptText={prompt.prompt_text} />

            {/* Stats Block */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{prompt.like_count}</div>
                  <div className="text-xs text-gray-500">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{prompt.copy_count}</div>
                  <div className="text-xs text-gray-500">Copied</div>
                </div>
              </div>
            </div>

            {/* Author Info (Desktop - shows here on desktop) */}
            <div className="hidden lg:block border-t border-gray-200 pt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Author</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{prompt.author_email || 'Anonymous'}</p>
                </div>
              </div>
            </div>

            {/* Similar Prompts */}
            <div className="border-t border-gray-200 pt-6">
              <SimilarPrompts currentPromptId={prompt.id} category={prompt.category} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
