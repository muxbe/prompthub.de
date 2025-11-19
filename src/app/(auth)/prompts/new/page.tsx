// Add Prompt Page
// Protected route - requires authentication
// Following Lab37 Constitution patterns

import { requireAuth } from '@/lib/supabase/queries/auth';
import { createClient } from '@/lib/supabase/server';
import { getPlatforms } from '@/lib/supabase/queries/platforms';
import { AddPromptForm } from '@/components/prompts/AddPromptForm';
import { BackButton } from '@/components/ui/BackButton';

export default async function NewPromptPage() {
  // Server-side auth check - redirects to login if not authenticated
  const user = await requireAuth();

  // Fetch AI platforms from database
  const supabase = await createClient();
  const platforms = await getPlatforms(supabase);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <AddPromptForm platforms={platforms} userId={user.id} />
      </div>
    </main>
  );
}
