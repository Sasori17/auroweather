import { Metadata } from 'next';
import ContactClientPage from './contact.client';

export const metadata: Metadata = {
  title: "Nous Contacter - AuroWeather",
  description: "Une question, un commentaire ou un problème ? Contactez l'équipe AuroWeather. Nous sommes là pour vous aider et répondre à toutes vos questions.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Nous Contacter - AuroWeather",
    description: "Une question, un commentaire ou un problème ? Contactez l'équipe AuroWeather",
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClientPage />;
}
