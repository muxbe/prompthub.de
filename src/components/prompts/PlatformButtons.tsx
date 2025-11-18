// PlatformButtons Component
// Shows platform buttons with "Coming soon" tooltips (v1)

'use client';

import { useState } from 'react';
import type { Json } from '@/types/database';

type Platform = {
  id: string;
  name: string;
};

type PlatformButtonsProps = {
  platforms: Json;
  promptText: string;
};

export function PlatformButtons({ platforms }: PlatformButtonsProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Parse platforms JSON
  const platformList: Platform[] = Array.isArray(platforms)
    ? (platforms as Platform[])
    : [];

  if (platformList.length === 0) {
    return null;
  }

  const handleClick = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  const platformIcons: Record<string, string> = {
    ChatGPT: '🤖',
    Claude: '🧠',
    Gemini: '✨',
    Other: '💡',
  };

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Compatible with:</h4>
      <div className="space-y-2">
        {platformList.map((platform) => (
          <div key={platform.id} className="relative">
            <button
              onClick={handleClick}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              title="Coming soon"
            >
              <span>{platformIcons[platform.name] || '💡'}</span>
              <span>Open in {platform.name}</span>
            </button>
            {showTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-10">
                Coming soon - copy prompt manually for now
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
