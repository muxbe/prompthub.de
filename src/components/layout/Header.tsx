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
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
              PromptHub
            </Link>
          </div>

          {/* Right: Auth-dependent buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Add Prompt Button */}
                <Link
                  href="/prompts/new"
                  className="inline-flex items-center text-gray-700 hover:text-gray-900"
                  title="Add new prompt"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Link>

                {/* Library Button (Placeholder) */}
                <button
                  onClick={handleLibraryClick}
                  className="inline-flex items-center text-gray-700 hover:text-gray-900"
                  title="Library (Coming soon)"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </button>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{user.email}</span>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </form>
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
