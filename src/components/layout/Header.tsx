// Header Component
// Shows navigation, logo, and auth-dependent buttons
// Following Lab37 Constitution - uses useAuth() hook

'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { logoutAction } from '@/app/actions/auth';
import { useState, useRef, useEffect } from 'react';

export function Header() {
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLibraryClick = () => {
    alert('Coming soon! Library feature will be available in v2.');
  };

  const handleLogout = async () => {
    await logoutAction();
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

                {/* User Icon with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
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

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                      {/* User Email */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {/* My Prompts */}
                        <Link
                          href="/my-prompts"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <span>ჩემი პრომფტები</span>
                        </Link>

                        {/* Settings */}
                        <Link
                          href="/settings"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>პროფილის რედაქტირება</span>
                        </Link>

                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>გასვლა</span>
                        </button>
                      </div>
                    </div>
                  )}
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
