import { Metadata } from 'next';
import { getTranslation } from '@/i18n/getTranslation';
import ContactClientPage from '@/app/contact/contact.client';

const baseUrl = 'https://auroweather.fr';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale);
  const isEn = locale === 'en';
  const path = isEn ? `${baseUrl}/en/contact` : `${baseUrl}/contact`;

  return {
    title: t.meta.contact.title,
    description: t.meta.contact.description,
    alternates: {
      canonical: path,
      languages: { fr: `${baseUrl}/contact`, en: `${baseUrl}/en/contact` },
    },
  };
}

export default function ContactPage() {
  return <ContactClientPage />;
}
