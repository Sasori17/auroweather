import { Metadata } from 'next';
import AboutPageClient from './page.client';

export const metadata: Metadata = {
  title: "À propos d'AuroWeather - Votre compagnon météo moderne",
  description: "Découvrez AuroWeather, votre application météo moderne et fiable. Interface élégante, données en temps réel et technologies de pointe pour des prévisions précises.",
  alternates: {
    canonical: '/a-propos',
  },
  openGraph: {
    title: "À propos d'AuroWeather",
    description: "Découvrez AuroWeather, votre application météo moderne et fiable.",
    url: '/a-propos',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
