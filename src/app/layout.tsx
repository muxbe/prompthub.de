// Root Layout - wraps entire app
// Fetches auth state on server, passes to client via AuthProvider

import type { Metadata } from 'next';
import { getOptionalUser } from '@/lib/supabase/queries/auth';
import { AuthProvider } from '@/lib/auth/auth-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'PromptHub - Share and Discover AI Prompts',
  description: 'A platform for sharing and discovering AI prompts for ChatGPT, Claude, Gemini, and more.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getOptionalUser();

  return (
    <html lang="en">
      <body>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
