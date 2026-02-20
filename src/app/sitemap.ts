import { MetadataRoute } from 'next';
import { blogArticles } from '@/data/blogArticles';

const staticSlugs = [
  { path: '', frequency: 'daily' as const, priority: 1.0 },
  { path: '/guide', frequency: 'monthly' as const, priority: 0.9 },
  { path: '/glossaire', frequency: 'monthly' as const, priority: 0.9 },
  { path: '/a-propos', frequency: 'monthly' as const, priority: 0.8 },
  { path: '/blog', frequency: 'weekly' as const, priority: 0.9 },
  { path: '/contact', frequency: 'monthly' as const, priority: 0.7 },
  { path: '/confidentialite', frequency: 'yearly' as const, priority: 0.5 },
  { path: '/conditions', frequency: 'yearly' as const, priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://auroweather.fr';
  const currentDate = new Date().toISOString();

  // French static pages (clean URLs via middleware rewrite)
  const frStaticPages: MetadataRoute.Sitemap = staticSlugs.map(({ path, frequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: frequency,
    priority,
  }));

  // English static pages (/en/...)
  const enStaticPages: MetadataRoute.Sitemap = staticSlugs.map(({ path, frequency, priority }) => ({
    url: `${baseUrl}/en${path}`,
    lastModified: currentDate,
    changeFrequency: frequency,
    priority: priority * 0.9, // Slightly lower priority for EN version
  }));

  // French blog pages
  const frBlogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.publishedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // English blog pages
  const enBlogPages: MetadataRoute.Sitemap = blogArticles.map((article) => ({
    url: `${baseUrl}/en/blog/${article.slug}`,
    lastModified: article.publishedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...frStaticPages, ...enStaticPages, ...frBlogPages, ...enBlogPages];
}
