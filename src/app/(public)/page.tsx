// Homepage - Prompts List Page
// Server Component - fetches data on server

import { createClient } from '@/lib/supabase/server';
import { getPrompts } from '@/lib/supabase/queries/prompts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* 3D Cube Icon */}
          <div className="flex justify-center mb-6">
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-gray-800">
              <g transform="translate(50,35)">
                {/* Back left face */}
                <path d="M -15,-8 L -15,8 L -30,16 L -30,0 Z" fill="currentColor" opacity="0.4" />
                {/* Back right face */}
                <path d="M 15,-8 L 15,8 L 30,16 L 30,0 Z" fill="currentColor" opacity="0.5" />
                {/* Back top */}
                <path d="M 0,-16 L -15,-8 L 0,0 L 15,-8 Z" fill="currentColor" opacity="0.6" />

                {/* Front left face */}
                <path d="M -15,8 L -15,24 L -30,32 L -30,16 Z" fill="currentColor" opacity="0.6" />
                {/* Front right face */}
                <path d="M 15,8 L 15,24 L 30,32 L 30,16 Z" fill="currentColor" opacity="0.75" />
                {/* Front top */}
                <path d="M 0,0 L -15,8 L 0,16 L 15,8 Z" fill="currentColor" opacity="0.85" />

                {/* Top face highlight */}
                <path d="M 0,0 L -15,8 L -15,12 L 0,20 L 15,12 L 15,8 Z" fill="currentColor" opacity="0.95" />
              </g>
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-neutral-900 leading-tight max-w-lg mx-auto mb-2">
            პრომპტების საუკეთესო ბაზა საქართველოში
          </h1>
          <p className="text-sm text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-8">
            იპოვე, გააზიარე და შეაფასე პრომპტები პროდუქტიულობის გასაზრდელად.
          </p>

          {/* Search Bar */}
          <SearchBar initialValue={params.search} />
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Categories Section Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">კატეგორიები</h2>
            <a href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              ყველას ნახვა →
            </a>
          </div>

          {/* Category Filter */}
          <CategoryFilter currentCategory={params.category || 'all'} />
        </div>
      </section>

      {/* Prompts Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Prompts Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">პრომპტები</h2>
          {/* Sort Filter */}
          <SortFilter currentSort={params.sort || 'new'} />
        </div>

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
            <h3 className="text-lg font-medium text-gray-900 mb-2">ვერ მოიძებნა პრომპტები</h3>
            <p className="text-gray-600">
              {params.search || params.category
                ? 'სცადეთ ფილტრების ან საძიებო სიტყვების შეცვლა'
                : 'იყავი პირველი, დაამატე პრომპტი!'}
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

      {/* Top Members Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">ტოპ წევრები</h2>
            <a href="/members" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              ყველას ნახვა →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
