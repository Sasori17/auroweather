'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';
import { blogArticles, type BlogArticle } from '@/data/blogArticles';
import ReactMarkdown from 'react-markdown';

interface BlogArticleClientPageProps {
  article: BlogArticle;
}

export default function BlogArticleClientPage({ article }: BlogArticleClientPageProps) {
  // Find related articles (same category, different slug)
  const relatedArticles = blogArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 text-sm px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/70 mb-6 leading-relaxed">
            {article.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none mb-12"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl font-bold text-white mt-8 mb-4 first:mt-0" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl font-semibold text-white mt-6 mb-3" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-white/80 leading-relaxed mb-4" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside text-white/80 mb-4 space-y-2 ml-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside text-white/80 mb-4 space-y-2 ml-4" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-white/80" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="text-white font-semibold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="text-blue-300" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-white/70 my-4" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-white/10 px-2 py-1 rounded text-blue-300 text-sm" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-blue-400 hover:text-blue-300 underline" {...props} />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20 mb-12"
        >
          <h3 className="text-2xl font-semibold text-white mb-3">
            Consultez la météo en temps réel
          </h3>
          <p className="text-white/70 mb-4">
            Maintenant que vous comprenez mieux les phénomènes météorologiques, utilisez AuroWeather pour suivre les conditions en direct et anticiper les changements.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors"
          >
            Voir la météo →
          </Link>
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Articles similaires</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.slug}
                  href={`/blog/${relatedArticle.slug}`}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:border-white/40 h-full">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2 mb-3">
                      {relatedArticle.description}
                    </p>
                    <div className="text-blue-400 text-sm font-medium group-hover:underline">
                      Lire →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à tous les articles
          </Link>
        </motion.div>
      </article>
    </div>
  );
}
