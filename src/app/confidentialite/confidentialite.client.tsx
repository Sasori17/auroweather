'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

export default function PrivacyClientPage() {
  const { t, locale } = useTranslation();
  const p = t.pages.privacy;
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
            <Shield className="w-8 h-8 text-blue-400" />
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
          {/* Introduction */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.intro.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.intro.p1}</p>
            <p className="text-white/80 leading-relaxed">{p.intro.p2}</p>
          </motion.section>

          {/* Section 1 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s1.title}</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.s1.location.title}</h3>
            <p className="text-white/80 leading-relaxed mb-4">{p.s1.location.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>{p.s1.location.li1}</li>
              <li>{p.s1.location.li2}</li>
              <li>{p.s1.location.li3}</li>
              <li>{p.s1.location.li4}</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.s1.navigation.title}</h3>
            <p className="text-white/80 leading-relaxed mb-4">{p.s1.navigation.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>{p.s1.navigation.li1}</li>
              <li>{p.s1.navigation.li2}</li>
              <li>{p.s1.navigation.li3}</li>
              <li>{p.s1.navigation.li4}</li>
              <li>{p.s1.navigation.li5}</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.s1.cookies.title}</h3>
            <p className="text-white/80 leading-relaxed mb-4">{p.s1.cookies.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>{p.s1.cookies.li1}</li>
              <li>{p.s1.cookies.li2}</li>
              <li>{p.s1.cookies.li3}</li>
            </ul>
          </motion.section>

          {/* Section 2 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
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

          {/* Section 3 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s3.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s3.p1}</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.s3.providers.title}</h3>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li><strong className="text-white">OpenWeatherMap</strong> : {p.s3.providers.li1}</li>
              <li><strong className="text-white">Google AdSense</strong> : {p.s3.providers.li2}</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.s3.legal.title}</h3>
            <p className="text-white/70 leading-relaxed">{p.s3.legal.p1}</p>
          </motion.section>

          {/* Section 4 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s4.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s4.p1}</p>
            <p className="text-white/80 leading-relaxed mb-4">
              {p.s4.p2}{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                {p.s4.p2link}
              </a>.
            </p>
            <p className="text-white/70 leading-relaxed text-sm">
              {p.s4.p3}{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                https://policies.google.com/privacy
              </a>.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s5.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s5.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li><strong className="text-white">{p.s5.li1label}</strong> : {p.s5.li1}</li>
              <li><strong className="text-white">{p.s5.li2label}</strong> : {p.s5.li2}</li>
              <li><strong className="text-white">{p.s5.li3label}</strong> : {p.s5.li3}</li>
              <li><strong className="text-white">{p.s5.li4label}</strong> : {p.s5.li4}</li>
              <li><strong className="text-white">{p.s5.li5label}</strong> : {p.s5.li5}</li>
            </ul>
            <p className="text-white/80 leading-relaxed mt-4">
              {p.s5.p2}{' '}
              <Link href={lp('/contact')} className="text-blue-400 hover:text-blue-300 underline">
                {p.s5.link}
              </Link>
              {p.s5.p2b}
            </p>
          </motion.section>

          {/* Section 6 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s6.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.s6.p1}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>{p.s6.li1}</li>
              <li>{p.s6.li2}</li>
              <li>{p.s6.li3}</li>
              <li>{p.s6.li4}</li>
            </ul>
          </motion.section>

          {/* Section 7 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s7.title}</h2>
            <p className="text-white/80 leading-relaxed">{p.s7.p1}</p>
          </motion.section>

          {/* Section 8 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s8.title}</h2>
            <p className="text-white/80 leading-relaxed">{p.s8.p1}</p>
          </motion.section>

          {/* Section 9 */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.s9.title}</h2>
            <p className="text-white/80 leading-relaxed">
              {p.s9.p1}{' '}
              <Link href={lp('/contact')} className="text-blue-400 hover:text-blue-300 underline">
                {p.s9.link}
              </Link>
              {p.s9.p1b}
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
