import { Metadata } from 'next';
import { getTranslation } from '@/i18n/getTranslation';
import GlossaireClientPage from '@/app/glossaire/glossaire.client';

const baseUrl = 'https://auroweather.fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const path = isEn ? `${baseUrl}/en/glossaire` : `${baseUrl}/glossaire`;

  return {
    title: t.meta.glossary.title,
    description: t.meta.glossary.description,
    alternates: {
      canonical: path,
      languages: { fr: `${baseUrl}/glossaire`, en: `${baseUrl}/en/glossaire` },
    },
  };
}

export default function GlossairePage() {
  return <GlossaireClientPage />;
}
