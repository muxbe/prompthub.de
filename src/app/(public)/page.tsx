// Homepage - Prompts List Page
// Server Component - fetches data on server

import { createClient } from '@/lib/supabase/server';
import { getPrompts } from '@/lib/supabase/queries/prompts';
import { Header } from '@/components/layout/Header';
import { PromptCard } from '@/components/prompts/PromptCard';
import { SearchBar } from '@/components/prompts/SearchBar';
import { CategoryFilter } from '@/components/prompts/CategoryFilter';
import { SortFilter } from '@/components/prompts/SortFilter';

type PageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: 'popular' | 'new' | 'most_copied';
  }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Fetch prompts with filters
  const prompts = await getPrompts(supabase, {
    search: params.search,
    category: params.category,
    sortBy: params.sort || 'new',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Discover AI Prompts
          </h1>
          <h3 className="text-xl text-gray-600 mb-8">
            Find, share, and explore prompts for ChatGPT, Claude, Gemini, and more
          </h3>

          {/* Search Bar */}
          <SearchBar initialValue={params.search} />
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Category Filter */}
            <CategoryFilter currentCategory={params.category || 'all'} />

            {/* Sort Filter */}
            <SortFilter currentSort={params.sort || 'new'} />
          </div>
        </div>
      </section>

      {/* Prompts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {prompts.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
            <p className="text-gray-600">
              {params.search || params.category
                ? 'Try adjusting your filters or search terms'
                : 'Be the first to add a prompt!'}
            </p>
          </div>
        ) : (
          // Prompts Grid (3 columns on desktop)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        )}

        {/* Results Count */}
        {prompts.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-600">
            Showing {prompts.length} {prompts.length === 1 ? 'prompt' : 'prompts'}
          </div>
        )}
      </main>
    </div>
  );
}
