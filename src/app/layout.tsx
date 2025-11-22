// Root Layout - wraps entire app
// Fetches auth state on server, passes to client via AuthProvider

import type { Metadata } from 'next';
import { getOptionalUser } from '@/lib/supabase/queries/auth';
import { AuthProvider } from '@/lib/auth/auth-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'PromptHub - პრომპტების საუკეთესო ბაზა საქართველოში',
  description: 'იპოვე, გააზიარე და შეაფასე პრომპტები პროდუქტიულობის გასაზრდელად. AI პრომპტები ChatGPT, Claude, Gemini და სხვა AI მოდელებისთვის.',
  keywords: ['პრომპტები', 'AI', 'ChatGPT', 'Claude', 'Gemini', 'PromptHub', 'საქართველო', 'პრომპტების ბაზა'],
  authors: [{ name: 'PromptHub Georgia' }],
  creator: 'PromptHub Georgia',
  publisher: 'PromptHub Georgia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'PromptHub - პრომპტების საუკეთესო ბაზა საქართველოში',
    description: 'იპოვე, გააზიარე და შეაფასე პრომპტები პროდუქტიულობის გასაზრდელად.',
    url: '/',
    siteName: 'PromptHub Georgia',
    locale: 'ka_GE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptHub - პრომპტების საუკეთესო ბაზა საქართველოში',
    description: 'იპოვე, გააზიარე და შეაფასე პრომპტები პროდუქტიულობის გასაზრდელად.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification here when ready
    // google: 'verification_token',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getOptionalUser();

  return (
    <html lang="ka">
      <body>
        <AuthProvider initialUser={user}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
