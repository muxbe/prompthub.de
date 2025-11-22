// BackButton Component
// Simple back navigation button

'use client';

import Link from 'next/link';

type BackButtonProps = {
  href?: string;
  text?: string;
};

export function BackButton({ href = '/', text = '← უკან მთავარ გვერდზე' }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-block text-gray-600 hover:text-gray-900 transition-colors mb-6"
    >
      {text}
    </Link>
  );
}
