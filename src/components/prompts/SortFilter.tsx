// SortFilter Component
// Client component for sort options

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'new', label: 'New' },
  { value: 'most_copied', label: 'Most Copied' },
];

type SortFilterProps = {
  currentSort: string;
};

export function SortFilter({ currentSort }: SortFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'new') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  };

  const currentLabel = sortOptions.find((opt) => opt.value === currentSort)?.label || 'New';

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        disabled={isPending}
        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
