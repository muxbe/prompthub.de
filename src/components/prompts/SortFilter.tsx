// SortFilter Component
// Client component for sort options

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';

const sortOptions = [
  { value: 'popular', label: 'პოპულარული', icon: '⭐' },
  { value: 'new', label: 'ახალი', icon: '🔥' },
  { value: 'most_copied', label: 'გამოყენებული', icon: '☑️' },
  { value: 'trending', label: 'ახალი', icon: '⚡' },
];

type SortFilterProps = {
  currentSort: string;
};

export function SortFilter({ currentSort }: SortFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsOpen(false);
  };

  const currentOption = sortOptions.find((opt) => opt.value === currentSort) || sortOptions[1];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        <span className="text-base">{currentOption.icon}</span>
        <span>{currentOption.label}</span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {sortOptions.map((option) => {
            const isActive = option.value === currentSort;
            return (
              <button
                key={option.value}
                onClick={() => handleSort(option.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
