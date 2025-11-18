// CopyButton Component
// Client component - copies prompt text to clipboard
// Note: In Step 2, this just copies. Step 4 will add incrementCopyCount

'use client';

import { useState } from 'react';

type CopyButtonProps = {
  promptText: string;
  promptId: string;
};

export function CopyButton({ promptText }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // TODO: Step 4 will call incrementCopyCount here
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy Prompt'}
    </button>
  );
}
