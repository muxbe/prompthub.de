// CategoryFilter Component
// Client component for category filtering

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type CategoryFilterProps = {
  currentCategory: string;
};

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const searchParams = useSearchParams();

  // Hardcoded categories - custom categories will show under "Other"
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'Copywriting', label: 'Copywriting' },
    { value: 'Development', label: 'Development' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Education', label: 'Education' },
    { value: 'Other', label: 'Other' },
  ];

  const buildUrl = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }

    return `/?${params.toString()}`;
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const isActive = currentCategory === cat.value;

        return (
          <Link
            key={cat.value}
            href={buildUrl(cat.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
