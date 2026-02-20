import { Metadata } from 'next';
import { getTranslation } from '@/i18n/getTranslation';
import BlogClientPage from '@/app/blog/blog.client';

const baseUrl = 'https://auroweather.fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const path = isEn ? `${baseUrl}/en/blog` : `${baseUrl}/blog`;

  return {
    title: t.meta.blog.title,
    description: t.meta.blog.description,
    alternates: {
      canonical: path,
      languages: { fr: `${baseUrl}/blog`, en: `${baseUrl}/en/blog` },
    },
    openGraph: {
      title: t.meta.blog.title,
      description: t.meta.blog.description,
      url: path,
      type: 'website',
    },
  };
}

export default function BlogPage() {
  return <BlogClientPage />;
}
