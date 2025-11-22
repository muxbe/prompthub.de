// Login Page
// If already logged in, redirect to homepage

import { redirect } from 'next/navigation';
import { getOptionalUser } from '@/lib/supabase/queries/auth';
import LoginForm from './LoginForm';
import Link from 'next/link';

export default async function LoginPage() {
  const user = await getOptionalUser();

  // Already logged in? Redirect to homepage
  if (user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">უკან</span>
        </Link>

        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <svg width="80" height="80" viewBox="0 0 100 100" className="text-gray-800">
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

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            შესვლა
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            შეიყვანეთ თქვენი ელ. ფოსტა ანგარიშში შესასვლელად
          </p>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
