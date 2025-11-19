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
  const displayCategory = category === 'Other' && customCategory ? customCategory : category;

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <h5 className="text-lg font-semibold mb-4">Preview</h5>

      {/* Title Preview Section */}
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        {category && (
          <div className="mb-2">
            <CategoryBadge category={displayCategory} />
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900">
          {title || 'Your title will appear here'}
        </h3>
      </div>

      {/* Description Preview Section */}
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-gray-700 text-sm">
          {description || 'Your prompt description will be shown here'}
        </p>
      </div>

      {/* Prompt Text Preview Section */}
      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-xs font-medium text-gray-500 mb-2">Your prompt text:</p>
        <div className="bg-gray-50 p-3 rounded border border-gray-100 font-mono text-sm text-gray-800 whitespace-pre-wrap">
          {promptText || 'Your prompt will appear here'}
        </div>
      </div>

      {/* Bottom Icons Section */}
      <hr className="border-gray-200 mb-4" />
      <div className="flex justify-end items-center gap-3 text-gray-400">
        <span className="text-xl">👤</span>
        <span className="text-xl">❤️</span>
        <span className="text-xl">📋</span>
      </div>
    </div>
  );
}
