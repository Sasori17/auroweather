'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Calendar, User } from 'lucide-react';
import { blogArticles } from '@/data/blogArticles';

export default function BlogPage() {
  // Grouper les articles par catégorie
  const categories = Array.from(new Set(blogArticles.map(article => article.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Blog Météo
            </h1>
          </div>
          <p className="text-xl text-white/70">
            Guides complets, analyses approfondies et conseils pratiques pour mieux comprendre la météo et ses impacts sur votre quotidien
          </p>
        </motion.div>

        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <div
              key={category}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-sm border border-white/20"
            >
              {category}
            </div>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="block group h-full"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all h-full flex flex-col hover:border-white/40">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="text-white/70 text-sm mb-4 line-clamp-3 flex-grow">
                    {article.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-white/50 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.publishedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </div>

                  {/* Read More */}
                  <div className="mt-4 text-blue-400 text-sm font-medium group-hover:underline">
                    Lire l'article →
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* SEO Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-blue-500/10 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Pourquoi consulter notre blog météo ?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-white/80">
            <div>
              <h3 className="font-semibold text-white mb-2">Contenu Expert et Approfondi</h3>
              <p className="text-sm leading-relaxed">
                Nos articles sont rédigés par des passionnés de météorologie, combinant connaissances scientifiques
                et applications pratiques pour votre quotidien.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Guides Pratiques et Actionnables</h3>
              <p className="text-sm leading-relaxed">
                Chaque article vous donne des conseils concrets que vous pouvez appliquer immédiatement,
                que ce soit pour votre sécurité, votre santé ou vos activités.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Mise à Jour Régulière</h3>
              <p className="text-sm leading-relaxed">
                Nous enrichissons constamment notre blog avec de nouveaux articles couvrant tous les aspects
                de la météorologie et ses impacts sur la vie quotidienne.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Pour Tous les Publics</h3>
              <p className="text-sm leading-relaxed">
                Du débutant curieux au professionnel (agriculteur, sportif), nos articles sont accessibles
                et riches en informations utiles pour tous.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors"
          >
            Consulter la météo en direct
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
