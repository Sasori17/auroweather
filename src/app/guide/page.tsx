import { Metadata } from 'next';
import GuideClientPage from './guide.client';

export const metadata: Metadata = {
  title: "Guide Météo - Comprendre les Prévisions - AuroWeather",
  description: "Apprenez à comprendre et interpréter les prévisions météorologiques : température, vent, humidité, pression, visibilité et qualité de l'air. Guide complet et détaillé.",
  alternates: {
    canonical: '/guide',
  },
  openGraph: {
    title: "Guide Météo - Comprendre les Prévisions",
    description: "Apprenez à comprendre et interpréter les prévisions météorologiques : température, vent, humidité, pression, visibilité et qualité de l'air",
    url: '/guide',
    type: 'website',
  },
};

export default function GuidePage() {
  return <GuideClientPage />;
}
