import { Metadata } from 'next';
import TestAPIClientPage from './test-api.client';

export const metadata: Metadata = {
  title: "Test API OpenWeatherMap - AuroWeather",
  description: "Testez votre clé API OpenWeatherMap pour vérifier qu'elle est correctement configurée et activée. Outil de diagnostic pour développeurs.",
  alternates: {
    canonical: '/test-api',
  },
  openGraph: {
    title: "Test API OpenWeatherMap - AuroWeather",
    description: "Testez votre clé API OpenWeatherMap pour vérifier qu'elle est correctement configurée et activée",
    url: '/test-api',
    type: 'website',
  },
};

export default function TestAPIPage() {
  return <TestAPIClientPage />;
}
