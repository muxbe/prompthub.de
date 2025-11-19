// CopyButton Component
// Client component - copies prompt text to clipboard

'use client';

import { useState } from 'react';
import { incrementCopyCountAction } from '@/actions/copyAction';

type CopyButtonProps = {
  promptText: string;
  promptId: string;
};

export function CopyButton({ promptText, promptId }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or non-HTTPS contexts
        const textArea = document.createElement('textarea');
        textArea.value = promptText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
          alert('Failed to copy to clipboard');
        }

        document.body.removeChild(textArea);
      }

      // Increment copy count in background (don't await, fire and forget)
      incrementCopyCountAction(promptId).catch((error) => {
        console.error('Failed to increment copy count:', error);
        // Don't show error to user - this is not critical
      });
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy Prompt'}
    </button>
  );
}
