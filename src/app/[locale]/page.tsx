import { IntegratedWeatherPage } from '@/components/weather/IntegratedWeatherPage';
import { getTranslation } from '@/i18n/getTranslation';
import type { Metadata } from 'next';

const baseUrl = 'https://auroweather.fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const canonical = isEn ? `${baseUrl}/en` : baseUrl;

  return {
    title: t.meta.home.title,
    description: t.meta.home.description,
    alternates: {
      canonical,
      languages: { fr: baseUrl, en: `${baseUrl}/en` },
    },
    openGraph: {
      title: t.meta.home.title,
      description: t.meta.home.description,
      url: canonical,
      type: 'website',
    },
    twitter: {
      title: t.meta.home.title,
      description: t.meta.home.description,
    },
  };
}

export default function Home() {
  return <IntegratedWeatherPage />;
}
