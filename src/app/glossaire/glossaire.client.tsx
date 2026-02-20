'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/i18n/useTranslation';

export default function GlossaryClientPage() {
  const { t, locale } = useTranslation();
  const p = t.pages.glossary;
  const lp = (path: string) => locale === 'en' ? `/en${path}` : path;

  const [searchTerm, setSearchTerm] = useState('');

  const glossaryTerms = p.terms as unknown as Array<{ letter: string; terms: Array<{ term: string; definition: string }> }>;

  const filteredGlossary = glossaryTerms.map(section => ({
    ...section,
    terms: section.terms.filter(item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.terms.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href={lp('/')}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.pages.common.backHome}
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
              {p.title}
            </h1>
          </div>
          <p className="text-xl text-white/70 mb-8">
            {p.subtitle}
          </p>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder={p.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/50"
            />
          </div>
        </motion.div>

        {/* Glossary Content */}
        <div className="space-y-8">
          {filteredGlossary.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
            >
              <p className="text-white/70">{p.noResults} &ldquo;{searchTerm}&rdquo;</p>
            </motion.div>
          ) : (
            filteredGlossary.map((section, sectionIndex) => (
              <motion.section
                key={section.letter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400">{section.letter}</span>
                  </div>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>

                <div className="space-y-6">
                  {section.terms.map((item, index) => (
                    <div key={index} className="group">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {item.term}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))
          )}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20"
        >
          <p className="text-blue-200 text-sm leading-relaxed">
            <strong className="text-blue-400">{'>'}</strong> {p.tip}{' '}
            <Link href={lp('/contact')} className="underline hover:text-blue-300">
              {p.tipContact}
            </Link>.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={lp('/guide')}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full transition-colors border border-white/20"
          >
            {p.cta.guide}
          </Link>
          <Link
            href={lp('/')}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors"
          >
            {p.cta.weather}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
