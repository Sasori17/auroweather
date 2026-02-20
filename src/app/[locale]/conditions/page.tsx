import { Metadata } from 'next';
import { getTranslation } from '@/i18n/getTranslation';
import ConditionsClientPage from '@/app/conditions/conditions.client';

const baseUrl = 'https://auroweather.fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const path = isEn ? `${baseUrl}/en/conditions` : `${baseUrl}/conditions`;

  return {
    title: t.meta.terms.title,
    description: t.meta.terms.description,
    alternates: {
      canonical: path,
      languages: { fr: `${baseUrl}/conditions`, en: `${baseUrl}/en/conditions` },
    },
  };
}

export default function ConditionsPage() {
  return <ConditionsClientPage />;
}
