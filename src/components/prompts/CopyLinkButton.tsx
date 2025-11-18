// CopyLinkButton Component
// Client component - copies current page URL to clipboard

'use client';

export function CopyLinkButton() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <button
      onClick={handleCopyLink}
      className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
    >
      Copy link
    </button>
  );
}
