import { Metadata } from 'next';
import TermsClientPage from './conditions.client';

export const metadata: Metadata = {
  title: "Conditions d'Utilisation - AuroWeather",
  description: "Conditions d'utilisation d'AuroWeather : règles d'utilisation, limitations de responsabilité, propriété intellectuelle et mentions légales.",
  alternates: {
    canonical: '/conditions',
  },
  openGraph: {
    title: "Conditions d'Utilisation - AuroWeather",
    description: "Conditions d'utilisation d'AuroWeather : règles d'utilisation, limitations de responsabilité et mentions légales",
    url: '/conditions',
    type: 'website',
  },
};

export default function TermsPage() {
  return <TermsClientPage />;
}
