import { Metadata } from 'next';
import { getTranslation } from '@/i18n/getTranslation';
import ConfidentialiteClientPage from '@/app/confidentialite/confidentialite.client';

const baseUrl = 'https://auroweather.fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const path = isEn ? `${baseUrl}/en/confidentialite` : `${baseUrl}/confidentialite`;

  return {
    title: t.meta.privacy.title,
    description: t.meta.privacy.description,
    alternates: {
      canonical: path,
      languages: {
        fr: `${baseUrl}/confidentialite`,
        en: `${baseUrl}/en/confidentialite`,
      },
    },
  };
}

export default function ConfidentialitePage() {
  return <ConfidentialiteClientPage />;
}
