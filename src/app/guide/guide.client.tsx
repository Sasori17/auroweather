'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Cloud, Thermometer, Wind, Droplets, Eye, Gauge, Sun, CloudRain } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

export default function GuideClientPage() {
  const { t, locale } = useTranslation();
  const p = t.pages.guide;
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
            <BookOpen className="w-8 h-8 text-blue-400" />
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
          {/* Introduction */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.intro.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{p.intro.p1}</p>
            <p className="text-white/80 leading-relaxed">{p.intro.p2}</p>
          </motion.section>

          {/* Temperature */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Thermometer className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-semibold text-white">{p.temp.title}</h2>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.temp.current.title}</h3>
            <p className="text-white/80 leading-relaxed mb-4">{p.temp.current.desc}</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.temp.feelsLike.title}</h3>
            <p className="text-white/80 leading-relaxed mb-4">{p.temp.feelsLike.desc}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mb-4">
              <li><strong className="text-white">{p.temp.feelsLike.wind.split(':')[0]} :</strong> {p.temp.feelsLike.wind.split(':').slice(1).join(':').trim()}</li>
              <li><strong className="text-white">{p.temp.feelsLike.humidity.split(':')[0]} :</strong> {p.temp.feelsLike.humidity.split(':').slice(1).join(':').trim()}</li>
              <li><strong className="text-white">{p.temp.feelsLike.sun.split(':')[0]} :</strong> {p.temp.feelsLike.sun.split(':').slice(1).join(':').trim()}</li>
            </ul>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-blue-200 text-sm leading-relaxed">
                <strong className="text-blue-400">{p.temp.feelsLike.tipLabel}</strong> {p.temp.feelsLike.tip}
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.temp.minMax.title}</h3>
            <p className="text-white/80 leading-relaxed">{p.temp.minMax.desc}</p>
          </motion.section>

          {/* Weather Conditions */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-6 h-6 text-slate-400" />
              <h2 className="text-2xl font-semibold text-white">{p.conditions.title}</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-semibold text-white">{p.conditions.clear.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed">{p.conditions.clear.desc}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="w-5 h-5 text-slate-300" />
                  <h3 className="text-xl font-semibold text-white">{p.conditions.cloudy.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed mb-2">{p.conditions.cloudy.desc}</p>
                <ul className="list-disc list-inside space-y-1 text-white/60 ml-4">
                  <li><strong className="text-white">{p.conditions.cloudy.few.split(':')[0]} :</strong> {p.conditions.cloudy.few.split(':').slice(1).join(':').trim()}</li>
                  <li><strong className="text-white">{p.conditions.cloudy.partly.split(':')[0]} :</strong> {p.conditions.cloudy.partly.split(':').slice(1).join(':').trim()}</li>
                  <li><strong className="text-white">{p.conditions.cloudy.mostly.split(':')[0]} :</strong> {p.conditions.cloudy.mostly.split(':').slice(1).join(':').trim()}</li>
                  <li><strong className="text-white">{p.conditions.cloudy.overcast.split(':')[0]} :</strong> {p.conditions.cloudy.overcast.split(':').slice(1).join(':').trim()}</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">{p.conditions.rain.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed mb-2">{p.conditions.rain.desc}</p>
                <ul className="list-disc list-inside space-y-1 text-white/60 ml-4">
                  <li><strong className="text-white">{p.conditions.rain.drizzle.split(':')[0]} :</strong> {p.conditions.rain.drizzle.split(':').slice(1).join(':').trim()}</li>
                  <li><strong className="text-white">{p.conditions.rain.light.split(':')[0]} :</strong> {p.conditions.rain.light.split(':').slice(1).join(':').trim()}</li>
                  <li><strong className="text-white">{p.conditions.rain.moderate.split(':')[0]} :</strong> {p.conditions.rain.moderate.split(':').slice(1).join(':').trim()}</li>
                  <li><strong className="text-white">{p.conditions.rain.heavy.split(':')[0]} :</strong> {p.conditions.rain.heavy.split(':').slice(1).join(':').trim()}</li>
                </ul>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mt-4">
                  <p className="text-amber-200 text-sm leading-relaxed">
                    <strong className="text-amber-400">{p.conditions.rain.noteLabel}</strong> {p.conditions.rain.note}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Wind */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Wind className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">{p.wind.title}</h2>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">{p.wind.speed.title}</h3>
            <p className="text-white/80 leading-relaxed mb-4">{p.wind.speed.desc}</p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">0-10 km/h</span>
                <span className="text-white/60 text-sm">{p.wind.speed.calm}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">11-20 km/h</span>
                <span className="text-white/60 text-sm">{p.wind.speed.light}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">21-40 km/h</span>
                <span className="text-white/60 text-sm">{p.wind.speed.moderate}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">41-60 km/h</span>
                <span className="text-white/60 text-sm">{p.wind.speed.fresh}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <span className="text-white">60+ km/h</span>
                <span className="text-amber-300 text-sm">{p.wind.speed.strong}</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">{p.wind.direction.title}</h3>
            <p className="text-white/80 leading-relaxed mb-4">{p.wind.direction.desc}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li><strong className="text-white">{p.wind.direction.north.split(':')[0]} :</strong> {p.wind.direction.north.split(':').slice(1).join(':').trim()}</li>
              <li><strong className="text-white">{p.wind.direction.west.split(':')[0]} :</strong> {p.wind.direction.west.split(':').slice(1).join(':').trim()}</li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">{p.wind.direction.note}</p>
          </motion.section>

          {/* Humidity */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-semibold text-white">{p.humidity.title}</h2>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">{p.humidity.desc}</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.humidity.interpretation}</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">0-30%</span>
                <span className="text-white/60 text-sm">{p.humidity.dry}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-white">30-60%</span>
                <span className="text-green-300 text-sm">{p.humidity.comfortable}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">60-80%</span>
                <span className="text-white/60 text-sm">{p.humidity.humid}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <span className="text-white">80-100%</span>
                <span className="text-amber-300 text-sm">{p.humidity.veryHumid}</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-blue-200 text-sm leading-relaxed">
                <strong className="text-blue-400">{p.humidity.tipLabel}</strong> {p.humidity.tip}
              </p>
            </div>
          </motion.section>

          {/* Pressure */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">{p.pressure.title}</h2>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">{p.pressure.desc}</p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">{p.pressure.interpretation}</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">&lt; 1010 hPa</span>
                <span className="text-white/60 text-sm">{p.pressure.low}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-white">1010-1020 hPa</span>
                <span className="text-green-300 text-sm">{p.pressure.normal}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">&gt; 1020 hPa</span>
                <span className="text-white/60 text-sm">{p.pressure.high}</span>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <p className="text-green-200 text-sm leading-relaxed">
                <strong className="text-green-400">{p.pressure.tipLabel}</strong> {p.pressure.tip}
              </p>
            </div>
          </motion.section>

          {/* Visibility */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">{p.visibility.title}</h2>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">{p.visibility.desc}</p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-white">&gt; 10 km</span>
                <span className="text-green-300 text-sm">{p.visibility.excellent}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">4-10 km</span>
                <span className="text-white/60 text-sm">{p.visibility.good}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">1-4 km</span>
                <span className="text-white/60 text-sm">{p.visibility.moderate}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <span className="text-white">&lt; 1 km</span>
                <span className="text-amber-300 text-sm">{p.visibility.fog}</span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-amber-200 text-sm leading-relaxed">
                <strong className="text-amber-400">{p.visibility.tipLabel}</strong> {p.visibility.tip}
              </p>
            </div>
          </motion.section>

          {/* Air Quality */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Wind className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-semibold text-white">{p.airQuality.title}</h2>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">{p.airQuality.desc}</p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-white">1</span>
                <span className="text-green-300 text-sm">{p.airQuality.levels.good}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-lime-500/10 rounded-lg border border-lime-500/20">
                <span className="text-white">2</span>
                <span className="text-lime-300 text-sm">{p.airQuality.levels.fair}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <span className="text-white">3</span>
                <span className="text-yellow-300 text-sm">{p.airQuality.levels.moderate}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <span className="text-white">4</span>
                <span className="text-orange-300 text-sm">{p.airQuality.levels.poor}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <span className="text-white">5</span>
                <span className="text-red-300 text-sm">{p.airQuality.levels.veryPoor}</span>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-200 text-sm leading-relaxed">
                <strong className="text-red-400">{p.airQuality.tipLabel}</strong> {p.airQuality.tip}
              </p>
            </div>
          </motion.section>

          {/* Tips */}
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20">
            <h2 className="text-2xl font-semibold text-white mb-4">{p.tips.title}</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">{p.tips.t1.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.tips.t1.desc}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">{p.tips.t2.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.tips.t2.desc}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">{p.tips.t3.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.tips.t3.desc}</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">{p.tips.t4.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.tips.t4.desc}</p>
              </div>
            </div>
          </motion.section>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={lp('/glossaire')}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full transition-colors border border-white/20"
          >
            {p.cta.glossary}
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
