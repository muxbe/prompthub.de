// Custom 404 Not Found Page
'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* 404 Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <span className="text-9xl font-bold text-gray-200">404</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 100 100" className="text-gray-400">
                  <g transform="translate(50,35)">
                    {/* Back left face */}
                    <path d="M -15,-8 L -15,8 L -30,16 L -30,0 Z" fill="currentColor" opacity="0.4" />
                    {/* Back right face */}
                    <path d="M 15,-8 L 15,8 L 30,16 L 30,0 Z" fill="currentColor" opacity="0.5" />
                    {/* Back top */}
                    <path d="M 0,-16 L -15,-8 L 0,0 L 15,-8 Z" fill="currentColor" opacity="0.6" />

                    {/* Front left face */}
                    <path d="M -15,8 L -15,24 L -30,32 L -30,16 Z" fill="currentColor" opacity="0.6" />
                    {/* Front right face */}
                    <path d="M 15,8 L 15,24 L 30,32 L 30,16 Z" fill="currentColor" opacity="0.75" />
                    {/* Front top */}
                    <path d="M 0,0 L -15,8 L 0,16 L 15,8 Z" fill="currentColor" opacity="0.85" />

                    {/* Top face highlight */}
                    <path d="M 0,0 L -15,8 L -15,12 L 0,20 L 15,12 L 15,8 Z" fill="currentColor" opacity="0.95" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            გვერდი ვერ მოიძებნა
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            სამწუხაროდ, თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს ან გადატანილია.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              მთავარ გვერდზე დაბრუნება
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              უკან დაბრუნება
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">სასარგებლო ბმულები:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                პრომპტები
              </Link>
              <Link href="/prompts/new" className="text-blue-600 hover:text-blue-800">
                პრომპტის დამატება
              </Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-800">
                შესვლა
              </Link>
              <Link href="/register" className="text-blue-600 hover:text-blue-800">
                რეგისტრაცია
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
