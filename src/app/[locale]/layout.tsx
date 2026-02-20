import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/cookies/CookieConsent';
import { getTranslation } from '@/i18n/getTranslation';
import type { Locale } from '@/i18n/index';

const baseUrl = 'https://auroweather.fr';

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const canonicalBase = isEn ? `${baseUrl}/en` : baseUrl;

  return {
    title: {
      default: t.meta.home.title,
      template: `%s | AuroWeather`,
    },
    description: t.meta.home.description,
    keywords: ['météo', 'prévisions', 'weather', 'forecast', 'glassmorphism', '3D', 'temps réel'],
    openGraph: {
      type: 'website',
      locale: isEn ? 'en_US' : 'fr_FR',
      siteName: 'AuroWeather',
      url: canonicalBase,
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: canonicalBase,
      languages: {
        fr: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale as Locale) === 'en' ? 'en' : 'fr';

  return (
    <>
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={resolvedLocale} />
      <CookieConsent locale={resolvedLocale} />
    </>
  );
}
