import { Metadata } from 'next';
import { blogArticles } from '@/data/blogArticles';
import { notFound } from 'next/navigation';
import BlogArticleClientPage from './blog-article.client';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} - AuroWeather Blog`,
    description: article.description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <BlogArticleClientPage article={article} />;
}
