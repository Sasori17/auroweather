'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Bug, HelpCircle } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
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
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Nous contacter
            </h1>
          </div>
          <p className="text-xl text-white/70">
            Une question, un commentaire ou un problème ? Nous sommes là pour vous aider.
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
            <h2 className="text-2xl font-semibold text-white mb-6">Comment pouvons-nous vous aider ?</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold">Questions générales</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Vous avez des questions sur le fonctionnement d'AuroWeather ou sur nos services ?
                  Consultez d'abord notre{' '}
                  <Link href="/guide" className="text-blue-400 hover:text-blue-300 underline">
                    Guide météo
                  </Link>{' '}
                  et notre{' '}
                  <Link href="/glossaire" className="text-blue-400 hover:text-blue-300 underline">
                    Glossaire
                  </Link>.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Bug className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-white font-semibold">Signaler un bug</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Vous avez rencontré un problème technique ou un comportement inattendu ?
                  Décrivez-nous le problème avec le plus de détails possible pour que nous
                  puissions le résoudre rapidement.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">Suggestions</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Vous avez une idée pour améliorer AuroWeather ? Nous sommes toujours
                  à l'écoute de vos suggestions pour rendre notre service encore meilleur.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold">Autres demandes</h3>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Pour toute autre demande concernant la confidentialité, les conditions
                  d'utilisation ou des partenariats, n'hésitez pas à nous écrire.
                </p>
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
            <h2 className="text-2xl font-semibold text-white mb-6">Envoyez-nous un message</h2>
            <ContactForm />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20"
          >
            <h3 className="text-white font-semibold mb-3">Informations importantes</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>
                  <strong className="text-white">Temps de réponse :</strong> Nous faisons de notre
                  mieux pour répondre rapidement, mais les délais peuvent varier selon le volume
                  de demandes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>
                  <strong className="text-white">Données personnelles :</strong> Pour toute demande
                  concernant vos données personnelles (accès, modification, suppression), consultez
                  notre{' '}
                  <Link href="/confidentialite" className="text-blue-400 hover:text-blue-300 underline">
                    Politique de confidentialité
                  </Link>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>
                  <strong className="text-white">Questions techniques :</strong> Pour les problèmes
                  d'affichage ou de fonctionnement, précisez votre navigateur, système d'exploitation
                  et la nature exacte du problème.
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
            <h2 className="text-2xl font-semibold text-white mb-4">Avant de nous contacter</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Pour une réponse plus rapide, vérifiez si votre question n'a pas déjà une réponse
              dans nos ressources :
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/guide"
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors border border-white/10"
              >
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  Guide météo
                </h3>
                <p className="text-white/60 text-sm">
                  Apprenez à interpréter les prévisions et à utiliser l'application
                </p>
              </Link>

              <Link
                href="/glossaire"
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors border border-white/10"
              >
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-green-400" />
                  Glossaire
                </h3>
                <p className="text-white/60 text-sm">
                  Définitions des termes météorologiques utilisés
                </p>
              </Link>

              <Link
                href="/a-propos"
                className="bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-colors border border-white/10"
              >
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                  À propos
                </h3>
                <p className="text-white/60 text-sm">
                  En savoir plus sur AuroWeather et notre mission
                </p>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
