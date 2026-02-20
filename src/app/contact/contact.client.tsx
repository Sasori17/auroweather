'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Bug, HelpCircle } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { useTranslation } from '@/i18n/useTranslation';

export default function ContactClientPage() {
  const { t, locale } = useTranslation();
  const p = t.pages.contact;
  const lp = (path: string) => locale === 'en' ? `/en${path}` : path;

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
            <Mail className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {p.title}
            </h1>
          </div>
          <p className="text-xl text-white/70">
            {p.subtitle}
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">{p.helpTitle}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold">{p.general.title}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  {p.general.desc}{' '}
                  <Link href={lp('/guide')} className="text-blue-400 hover:text-blue-300 underline">
                    {p.general.guide}
                  </Link>{' '}
                  {p.general.and}{' '}
                  <Link href={lp('/glossaire')} className="text-blue-400 hover:text-blue-300 underline">
                    {p.general.glossary}
                  </Link>.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Bug className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold">{p.bug.title}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{p.bug.desc}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">{p.suggestions.title}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{p.suggestions.desc}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold">{p.other.title}</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{p.other.desc}</p>
              </div>
            </div>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">{p.formTitle}</h2>
            <ContactForm />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20"
          >
            <h3 className="text-white font-semibold mb-3">{p.infoTitle}</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>
                  <strong className="text-white">{p.info.responseLabel}</strong> {p.info.responseText}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>
                  <strong className="text-white">{p.info.dataLabel}</strong> {p.info.dataText}{' '}
                  <Link href={lp('/confidentialite')} className="text-blue-400 hover:text-blue-300 underline">
                    {p.info.dataLink}
                  </Link>
                  {p.info.dataEnd}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>
                  <strong className="text-white">{p.info.techLabel}</strong> {p.info.techText}
                </span>
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">{p.beforeTitle}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.beforeText}</p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href={lp('/guide')} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors border border-white/10">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  {p.links.guide}
                </h3>
                <p className="text-white/60 text-sm">{p.links.guideDesc}</p>
              </Link>

              <Link href={lp('/glossaire')} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors border border-white/10">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  {p.links.glossary}
                </h3>
                <p className="text-white/60 text-sm">{p.links.glossaryDesc}</p>
              </Link>

              <Link href={lp('/a-propos')} className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors border border-white/10">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                  {p.links.about}
                </h3>
                <p className="text-white/60 text-sm">{p.links.aboutDesc}</p>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
