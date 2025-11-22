// PromptFormPreview Component
// Shows live preview of prompt as user types

'use client';

import { CategoryBadge } from '../ui/CategoryBadge';

type PromptFormPreviewProps = {
  title: string;
  description: string;
  promptText: string;
  category: string;
  customCategory?: string;
};

export function PromptFormPreview({
  title,
  description,
  promptText,
  category,
  customCategory,
}: PromptFormPreviewProps) {
  // Determine which category to display
  const displayCategory = category === 'თავემი' && customCategory ? customCategory : category;

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
      <h5 className="text-base font-medium text-gray-700 mb-6">გადახედვა</h5>

      {/* Preview Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title || 'თქვენი პრომპტის სათაური'}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {description || 'თქვენი პრომპტის აღწერა გამოჩნდება აქ...'}
        </p>

        {/* Bottom Stats */}
        <div className="flex items-center gap-4 text-sm">
          {/* User Icon */}
          <div className="flex items-center gap-1.5 text-gray-700">
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>თქვენი</span>
          </div>
          {/* Like/Thumbs Up Icon - Orange */}
          <div className="flex items-center gap-1.5 text-gray-700">
            <svg className="w-4 h-4" fill="#f97316" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span>0</span>
          </div>
          {/* Clipboard/Copy Icon */}
          <div className="flex items-center gap-1.5 text-gray-700">
            <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
              <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
            </svg>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
