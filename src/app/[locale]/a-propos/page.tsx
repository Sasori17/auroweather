import { Metadata } from 'next';
import { getTranslation } from '@/i18n/getTranslation';
import AboutPageClient from '@/app/a-propos/page.client';

const baseUrl = 'https://auroweather.fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const path = isEn ? `${baseUrl}/en/a-propos` : `${baseUrl}/a-propos`;

  return {
    title: t.meta.about.title,
    description: t.meta.about.description,
    alternates: {
      canonical: path,
      languages: { fr: `${baseUrl}/a-propos`, en: `${baseUrl}/en/a-propos` },
    },
    openGraph: {
      title: t.meta.about.title,
      description: t.meta.about.description,
      url: path,
      type: 'website',
    },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
