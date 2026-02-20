'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

export default function TermsClientPage() {
  const { t, locale } = useTranslation();
  const p = t.pages.terms;
  const lp = (path: string) => locale === 'en' ? `/en${path}` : path;
  const lastUpdate = '23 décembre 2025';

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
            <FileText className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {p.title}
            </h1>
          </div>
          <p className="text-white/60">
            {t.pages.common.lastUpdate} {lastUpdate}
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s1.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s1.p1}</p>
            <p className="text-white/80 leading-relaxed">
              {p.s1.p2}{' '}
              <Link href={lp('/confidentialite')} className="text-blue-400 hover:text-blue-300 underline">
                {p.s1.p2b}
              </Link>
              {', '}{p.s1.p2c}
            </p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s2.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s2.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>{p.s2.li1}</li>
              <li>{p.s2.li2}</li>
              <li>{p.s2.li3}</li>
              <li>{p.s2.li4}</li>
              <li>{p.s2.li5}</li>
            </ul>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s3.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s3.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mb-4">
              <li>{p.s3.li1}</li>
              <li>{p.s3.li2}</li>
              <li>{p.s3.li3}</li>
              <li>{p.s3.li4}</li>
              <li>{p.s3.li5}</li>
            </ul>
            <p className="text-white/80 leading-relaxed">{p.s3.p2}</p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s4.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s4.p1}</p>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-amber-200 text-sm leading-relaxed">
                <strong className="text-amber-400">{p.s4.warningLabel}</strong> {p.s4.warning}
              </p>
            </div>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s5.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s5.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>{p.s5.li1}</li>
              <li>{p.s5.li2}</li>
              <li>{p.s5.li3}</li>
              <li>{p.s5.li4}</li>
            </ul>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s6.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s6.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mb-4">
              <li>{p.s6.li1}</li>
              <li>{p.s6.li2}</li>
              <li>{p.s6.li3}</li>
              <li>{p.s6.li4}</li>
            </ul>
            <p className="text-white/80 leading-relaxed mb-4">{p.s6.p2}</p>
            <p className="text-white/70 leading-relaxed text-sm">{p.s6.p3}</p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s7.title}</h2>
            <p className="text-white/80 leading-relaxed">{p.s7.p1}</p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s8.title}</h2>
            <p className="text-white/80 leading-relaxed">{p.s8.p1}</p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s9.title}</h2>
            <p className="text-white/80 leading-relaxed">{p.s9.p1}</p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s10.title}</h2>
            <p className="text-white/80 leading-relaxed">{p.s10.p1}</p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s11.title}</h2>
            <p className="text-white/80 leading-relaxed">{p.s11.p1}</p>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s12.title}</h2>
            <p className="text-white/80 leading-relaxed">
              {p.s12.p1}{' '}
              <Link href={lp('/contact')} className="text-blue-400 hover:text-blue-300 underline">
                {p.s12.link}
              </Link>
              {p.s12.p1b}
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
