'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Cloud, Zap, Heart, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-12">
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            À propos d'AuroWeather
          </h1>
          <p className="text-xl text-white/70">
            Votre compagnon météo moderne et fiable
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
              <h2 className="text-2xl font-semibold text-white">Notre mission</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              AuroWeather a été créé avec une vision simple : rendre les informations météorologiques
              accessibles, précises et agréables à consulter. Dans un monde où la météo influence nos
              décisions quotidiennes, nous croyons que chacun mérite d'avoir accès à des prévisions
              fiables présentées de manière claire et élégante.
            </p>
            <p className="text-white/80 leading-relaxed">
              Notre application combine les dernières technologies web avec des données météorologiques
              de qualité pour vous offrir une expérience utilisateur exceptionnelle, que vous planifiez
              votre journée, votre semaine ou vos activités en plein air.
            </p>
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
              <h2 className="text-2xl font-semibold text-white">Ce qui nous distingue</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Interface moderne</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Design glassmorphism avec animations fluides et effets 3D pour une expérience
                  visuelle immersive et agréable.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Données en temps réel</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Prévisions actualisées provenant de sources météorologiques professionnelles
                  pour des informations toujours à jour.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Informations complètes</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Température, ressenti, vent, humidité, pression, visibilité, qualité de l'air
                  et prévisions sur 6 jours.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Accessible partout</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Application web responsive qui fonctionne sur tous vos appareils : ordinateur,
                  tablette et smartphone.
                </p>
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
              <h2 className="text-2xl font-semibold text-white">Technologies utilisées</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              AuroWeather est développé avec les technologies web les plus modernes pour vous
              garantir rapidité, fiabilité et sécurité :
            </p>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Next.js 16</strong> - Framework React de dernière génération avec Turbopack pour des performances optimales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">React 19</strong> - Bibliothèque JavaScript pour une interface réactive et fluide</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">OpenWeatherMap API</strong> - Données météorologiques professionnelles utilisées par des millions d'applications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Framer Motion</strong> - Animations sophistiquées et transitions fluides</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span><strong className="text-white">Three.js</strong> - Effets 3D et arrière-plans animés immersifs</span>
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
              <h2 className="text-2xl font-semibold text-white">Notre engagement</h2>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              Nous nous engageons à améliorer continuellement AuroWeather en fonction de vos besoins
              et de vos retours. La météo est un service public essentiel, et nous voulons que notre
              application soit :
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
                <div className="text-white/60 text-sm">Gratuite</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
                <div className="text-white/60 text-sm">Disponible</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-amber-400 mb-1">Précise</div>
                <div className="text-white/60 text-sm">Et fiable</div>
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
            <h3 className="text-white font-semibold mb-2">Source des données</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Les prévisions météorologiques affichées sur AuroWeather proviennent d'OpenWeatherMap,
              un service météorologique professionnel qui collecte et traite des données provenant
              de plus de 40 000 stations météo dans le monde, de satellites et de radars météorologiques.
              Ces données sont actualisées en temps réel pour vous garantir les informations les plus
              précises possibles.
            </p>
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
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors"
          >
            Découvrir la météo
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
