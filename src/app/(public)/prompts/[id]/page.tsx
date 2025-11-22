// Prompt Detail Page
// Server Component - shows full prompt with all details

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getPromptById } from '@/lib/supabase/queries/prompts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
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

  // Get category emoji and label
  const getCategoryInfo = (category: string) => {
    const categories: Record<string, { emoji: string; label: string }> = {
      'writing': { emoji: '🧡', label: 'წერა და კრიატიული' },
      'productivity': { emoji: '📊', label: 'პროდუქტიულობა' },
      'marketing': { emoji: '📢', label: 'მარკეტინგი' },
      'code': { emoji: '💻', label: 'კოდი' },
      'education': { emoji: '📚', label: 'განათლება' },
      'other': { emoji: '🔧', label: 'სხვა' },
    };
    return categories[category] || categories['other'];
  };

  const categoryInfo = getCategoryInfo(prompt.category);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[80%] mx-auto px-6 py-8">
        {/* Top Navigation */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            მთავარი
          </Link>
          <span className="text-gray-400">›</span>
          <span className="flex items-center gap-2">
            <span>{categoryInfo.emoji}</span>
            <span className="text-gray-600">{categoryInfo.label}</span>
          </span>
        </div>

        {/* Title with Edit Button */}
        <div className="flex items-start gap-3 mb-4">
          <h1 className="text-5xl font-bold text-gray-900">{prompt.title}</h1>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mt-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            რედაქტირება
          </button>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {prompt.description}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm">
            Anon
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 text-sm">{prompt.author_email || 'Anonymous'}</span>
            <span className="text-sm text-gray-500">
              {new Date(prompt.created_at).toLocaleDateString('ka-GE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="h-8 w-px bg-gray-300"></div>
          <div className="flex items-center gap-5 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <span>{prompt.like_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{prompt.copy_count}</span>
            </div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Left Column - Prompt Card */}
          <div>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* Card Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-gray-500">›_</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://chat.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    ChatGPT
                  </a>
                  <CopyButton text={prompt.prompt_text} promptId={prompt.id} />
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6 bg-white">
                <pre className="whitespace-pre-wrap font-mono text-base text-gray-900 leading-relaxed">
{prompt.prompt_text}
                </pre>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Actions Container */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
              {/* Like and Save Row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Like Count Display */}
                <div className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-white">
                  <LikeButtonFull promptId={prompt.id} initialLikes={prompt.like_count} />
                </div>

                {/* Save Button */}
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>შენახვა</span>
                </button>
              </div>

              {/* Copy Link Button */}
              <CopyLinkButton />
            </div>

            {/* Similar Prompts */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">მსგავსი პრომპტები</h3>
              <SimilarPrompts currentPromptId={prompt.id} category={prompt.category} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
