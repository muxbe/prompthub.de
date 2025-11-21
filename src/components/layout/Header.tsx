// Header Component
// Shows navigation, logo, and auth-dependent buttons
// Following Lab37 Constitution - uses useAuth() hook

'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { logoutAction } from '@/app/actions/auth';

export function Header() {
  const { user } = useAuth();

  const handleLibraryClick = () => {
    alert('Coming soon! Library feature will be available in v2.');
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-gray-700">
              <svg
                className="w-8 h-8"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {/* 3D Cube/Puzzle Icon */}
                <path d="M16 2L26 8L26 18L16 24L6 18L6 8L16 2Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2L16 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 12L26 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 12L6 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 12L26 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 12L6 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 5L21 10L16 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 5L11 10L16 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>prompthub.ge</span>
            </Link>
          </div>

          {/* Right: Auth-dependent buttons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Add Prompt Button */}
                <Link
                  href="/prompts/new"
                  className="inline-flex items-center gap-2 text-gray-800 hover:text-gray-900"
                  title="დამატება"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                    <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                  </svg>
                  <span className="text-sm font-medium">დამატება</span>
                </Link>

                {/* Library Button (Placeholder) */}
                <button
                  onClick={handleLibraryClick}
                  className="inline-flex items-center gap-2 text-gray-800 hover:text-gray-900"
                  title="ბიბლიოთეკა"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    {/* Colorful layered books/library icon */}
                    <rect x="3" y="6" width="18" height="3" rx="0.5" fill="#FCD34D" stroke="#1F2937" strokeWidth="0.8"/>
                    <rect x="3" y="10" width="18" height="3" rx="0.5" fill="#34D399" stroke="#1F2937" strokeWidth="0.8"/>
                    <rect x="3" y="14" width="18" height="3" rx="0.5" fill="#60A5FA" stroke="#1F2937" strokeWidth="0.8"/>
                    <rect x="3" y="18" width="18" height="3" rx="0.5" fill="#F87171" stroke="#1F2937" strokeWidth="0.8"/>
                  </svg>
                  <span className="text-sm font-medium">ბიბლიოთეკა</span>
                </button>

                {/* User Icon */}
                <div className="flex items-center">
                  <button
                    className="inline-flex items-center text-gray-700 hover:text-gray-900"
                    title={user.email}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/>
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:border-gray-400"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
