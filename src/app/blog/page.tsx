import { Metadata } from 'next';
import BlogClientPage from './blog.client';

export const metadata: Metadata = {
  title: "Blog Météo - Guides, Analyses et Conseils - AuroWeather",
  description: "Guides complets, analyses approfondies et conseils pratiques pour mieux comprendre la météo et ses impacts sur votre quotidien. Articles rédigés par des experts météo.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "Blog Météo - Guides et Conseils",
    description: "Guides complets, analyses approfondies et conseils pratiques pour mieux comprendre la météo et ses impacts sur votre quotidien",
    url: '/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogClientPage />;
}
