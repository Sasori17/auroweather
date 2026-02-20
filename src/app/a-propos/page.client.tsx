'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Cloud, Zap, Heart, Globe } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

export default function AboutPageClient() {
  const { t, locale } = useTranslation();
  const p = t.pages.about;
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {p.title}
          </h1>
          <p className="text-xl text-white/70">
            {p.subtitle}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-semibold text-white">{p.mission.title}</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">{p.mission.p1}</p>
            <p className="text-white/80 leading-relaxed">{p.mission.p2}</p>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-semibold text-white">{p.features.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-2">{p.features.modern.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.features.modern.desc}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">{p.features.realtime.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.features.realtime.desc}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">{p.features.complete.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.features.complete.desc}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">{p.features.accessible.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.features.accessible.desc}</p>
              </div>
            </div>
          </motion.section>

          {/* Technology Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">{p.tech.title}</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">{p.tech.intro}</p>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Next.js 16</strong> - {p.tech.nextjs}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">React 19</strong> - {p.tech.react}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">OpenWeatherMap API</strong> - {p.tech.owm}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Framer Motion</strong> - {p.tech.framer}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Three.js</strong> - {p.tech.threejs}</span>
              </li>
            </ul>
          </motion.section>

          {/* Commitment Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-semibold text-white">{p.commitment.title}</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">{p.commitment.p1}</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
                <div className="text-white/60 text-sm">{p.commitment.free}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
                <div className="text-white/60 text-sm">{p.commitment.available}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-400 mb-1">{p.commitment.precise}</div>
                <div className="text-white/60 text-sm">{p.commitment.reliable}</div>
              </div>
            </div>
          </motion.section>

          {/* Data Source */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20"
          >
            <h3 className="text-white font-semibold mb-2">{p.dataSource.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{p.dataSource.text}</p>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href={lp('/')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors"
          >
            {p.cta}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
