import { Metadata } from 'next';
import PrivacyClientPage from './confidentialite.client';

export const metadata: Metadata = {
  title: "Politique de Confidentialité - AuroWeather",
  description: "Politique de confidentialité d'AuroWeather : découvrez comment nous collectons, utilisons et protégeons vos données personnelles. Conformité RGPD.",
  alternates: {
    canonical: '/confidentialite',
  },
  openGraph: {
    title: "Politique de Confidentialité - AuroWeather",
    description: "Politique de confidentialité d'AuroWeather : découvrez comment nous collectons, utilisons et protégeons vos données personnelles",
    url: '/confidentialite',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <PrivacyClientPage />;
}
