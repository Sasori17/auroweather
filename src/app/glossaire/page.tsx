import { Metadata } from 'next';
import GlossaryClientPage from './glossaire.client';

export const metadata: Metadata = {
  title: "Glossaire Météo - Dictionnaire des Termes - AuroWeather",
  description: "Dictionnaire complet des termes météorologiques pour mieux comprendre les prévisions : anticyclone, dépression, humidité, pression atmosphérique et plus encore.",
  alternates: {
    canonical: '/glossaire',
  },
  openGraph: {
    title: "Glossaire Météo - Dictionnaire des Termes",
    description: "Dictionnaire complet des termes météorologiques pour mieux comprendre les prévisions",
    url: '/glossaire',
    type: 'website',
  },
};

export default function GlossaryPage() {
  return <GlossaryClientPage />;
}
