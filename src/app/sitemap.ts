// Dynamic Sitemap Generation
import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prompthub.ge';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/prompts/new`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic prompt pages
  try {
    const supabase = await createClient();
    const { data: prompts } = await supabase
      .from('prompts')
      .select('id, updated_at')
      .order('updated_at', { ascending: false });

    const promptPages: MetadataRoute.Sitemap = (prompts || []).map((prompt) => ({
      url: `${baseUrl}/prompts/${prompt.id}`,
      lastModified: new Date(prompt.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...promptPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages if there's an error fetching prompts
    return staticPages;
  }
}
