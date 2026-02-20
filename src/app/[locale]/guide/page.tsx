import { Metadata } from 'next';
import { getTranslation } from '@/i18n/getTranslation';
import GuideClientPage from '@/app/guide/guide.client';

const baseUrl = 'https://auroweather.fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const path = isEn ? `${baseUrl}/en/guide` : `${baseUrl}/guide`;

  return {
    title: t.meta.guide.title,
    description: t.meta.guide.description,
    alternates: {
      canonical: path,
      languages: { fr: `${baseUrl}/guide`, en: `${baseUrl}/en/guide` },
    },
  };
}

export default function GuidePage() {
  return <GuideClientPage />;
}
