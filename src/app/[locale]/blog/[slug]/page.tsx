import { Metadata } from 'next';
import { blogArticles } from '@/data/blogArticles';
import { notFound } from 'next/navigation';
import BlogArticleClientPage from '@/app/blog/[slug]/blog-article.client';

const baseUrl = 'https://auroweather.fr';

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) return {};

  const isEn = locale === 'en';
  const path = isEn
    ? `${baseUrl}/en/blog/${article.slug}`
    : `${baseUrl}/blog/${article.slug}`;

  return {
    title: `${article.title} - AuroWeather Blog`,
    description: article.description,
    alternates: {
      canonical: path,
      languages: {
        fr: `${baseUrl}/blog/${article.slug}`,
        en: `${baseUrl}/en/blog/${article.slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: path,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return <BlogArticleClientPage article={article} />;
}
