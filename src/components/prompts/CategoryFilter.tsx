// CategoryFilter Component
// Client component for category filtering

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

type CategoryFilterProps = {
  currentCategory: string;
};

export function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const newScrollLeft = direction === 'left'
      ? scrollContainerRef.current.scrollLeft - scrollAmount
      : scrollContainerRef.current.scrollLeft + scrollAmount;

    scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  // Hardcoded categories - custom categories will show under "Other"
  const categories = [
    { value: 'all', label: 'ყველა', icon: '🔍' },
    { value: 'არტი და კრეატიული', label: 'არტი და კრეატიული', icon: '🧠' },
    { value: 'ბიზნესი', label: 'ბიზნესი', icon: '💼' },
    { value: 'განათლება', label: 'განათლება', icon: '🎓' },
    { value: 'დეველოპმენტი', label: 'დეველოპმენტი', icon: '💻' },
    { value: 'თარგმნა', label: 'თარგმნა', icon: '🌐' },
    { value: 'კვლევა', label: 'კვლევა', icon: '🔬' },
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
    <div className="relative flex items-center gap-3 group">
      {/* Left Arrow - Only visible on hover */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 flex-shrink-0 px-4 py-2.5 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 shadow-sm text-sm font-medium text-gray-700"
          aria-label="Scroll left"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>დაბრუნი</span>
        </button>
      )}

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-12"
      >
        {categories.map((cat) => {
          const isActive = currentCategory === cat.value;

          return (
            <Link
              key={cat.value}
              href={buildUrl(cat.value)}
              className={`
                px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 border-2
                ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-gray-200 text-gray-700 bg-white hover:border-gray-300'
                }
              `}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Right Arrow - Only visible on hover */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 flex-shrink-0 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
          aria-label="Scroll right"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
