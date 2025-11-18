// Authentication query functions
// Following Lab37 Constitution pattern

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * Get the current user if logged in, null otherwise
 * Use in Server Components for optional auth
 */
export async function getOptionalUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Require authentication - redirects to login if not authenticated
 * Use in Server Components that require auth
 */
export async function requireAuth() {
  const user = await getOptionalUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}
