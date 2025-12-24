'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  const lastUpdate = "23 décembre 2025";

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
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Politique de confidentialité
            </h1>
          </div>
          <p className="text-white/60">
            Dernière mise à jour : {lastUpdate}
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
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Chez AuroWeather, nous accordons une grande importance à la protection de votre vie privée
              et de vos données personnelles. Cette politique de confidentialité explique comment nous
              collectons, utilisons et protégeons vos informations lorsque vous utilisez notre service
              de prévisions météorologiques.
            </p>
            <p className="text-white/80 leading-relaxed">
              En utilisant AuroWeather, vous acceptez les pratiques décrites dans cette politique.
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">1. Données collectées</h2>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">1.1 Données de localisation</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Lorsque vous utilisez la fonction "Utiliser ma position", nous accédons temporairement
              à votre position géographique (latitude et longitude) uniquement pour afficher les
              prévisions météo correspondant à votre emplacement. Ces données :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Ne sont jamais stockées sur nos serveurs</li>
              <li>Ne sont pas partagées avec des tiers (sauf OpenWeatherMap pour obtenir les prévisions)</li>
              <li>Sont uniquement utilisées pendant votre session de navigation</li>
              <li>Nécessitent votre autorisation explicite via votre navigateur</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">1.2 Données de navigation</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Nous collectons automatiquement certaines informations techniques lorsque vous visitez
              notre site :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Adresse IP (anonymisée)</li>
              <li>Type de navigateur et version</li>
              <li>Système d'exploitation</li>
              <li>Pages visitées et durée de visite</li>
              <li>Ville recherchée (non associée à votre identité)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">1.3 Cookies et technologies similaires</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Nous utilisons des cookies et technologies similaires pour :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Mémoriser vos préférences (dernière ville recherchée)</li>
              <li>Analyser l'utilisation du site et améliorer nos services</li>
              <li>Afficher des publicités pertinentes via Google AdSense</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">2. Utilisation des données</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Nous utilisons les informations collectées pour :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Fournir les prévisions météorologiques demandées</li>
              <li>Améliorer la qualité et les fonctionnalités de notre service</li>
              <li>Analyser les tendances d'utilisation et optimiser l'expérience utilisateur</li>
              <li>Assurer la sécurité et prévenir les abus</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">3. Partage des données</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Vos données peuvent être partagées dans les cas suivants :
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.1 Fournisseurs de services</h3>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li><strong className="text-white">OpenWeatherMap</strong> : pour obtenir les données météorologiques (coordonnées géographiques uniquement)</li>
              <li><strong className="text-white">Google AdSense</strong> : pour afficher des publicités (selon leur propre politique de confidentialité)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.2 Obligations légales</h3>
            <p className="text-white/70 leading-relaxed">
              Nous pouvons divulguer vos informations si la loi l'exige ou pour protéger nos droits,
              votre sécurité ou celle d'autrui.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">4. Google AdSense et publicités</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Notre site utilise Google AdSense pour afficher des publicités. Google peut utiliser
              des cookies pour diffuser des annonces personnalisées basées sur vos visites sur ce site
              et d'autres sites web.
            </p>
            <p className="text-white/80 leading-relaxed mb-4">
              Vous pouvez désactiver les annonces personnalisées en visitant la page{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Paramètres des annonces Google
              </a>.
            </p>
            <p className="text-white/70 leading-relaxed text-sm">
              Pour plus d'informations sur la politique de confidentialité de Google, consultez{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                https://policies.google.com/privacy
              </a>.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">5. Vos droits (RGPD)</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li><strong className="text-white">Droit d'accès</strong> : vous pouvez demander une copie de vos données personnelles</li>
              <li><strong className="text-white">Droit de rectification</strong> : vous pouvez corriger des données inexactes</li>
              <li><strong className="text-white">Droit à l'effacement</strong> : vous pouvez demander la suppression de vos données</li>
              <li><strong className="text-white">Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données</li>
              <li><strong className="text-white">Droit à la portabilité</strong> : vous pouvez recevoir vos données dans un format structuré</li>
            </ul>
            <p className="text-white/80 leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous via notre{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                page de contact
              </Link>.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">6. Sécurité des données</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
              appropriées pour protéger vos données contre tout accès non autorisé, modification,
              divulgation ou destruction :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Chiffrement HTTPS pour toutes les communications</li>
              <li>Pas de stockage de données sensibles sur nos serveurs</li>
              <li>Accès limité aux données par le personnel autorisé uniquement</li>
              <li>Surveillance régulière de nos systèmes</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">7. Conservation des données</h2>
            <p className="text-white/80 leading-relaxed">
              Les données de localisation ne sont jamais conservées. Les données analytiques et
              cookies sont conservés pour une durée maximale de 26 mois conformément aux
              recommandations de la CNIL.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">8. Modifications de cette politique</h2>
            <p className="text-white/80 leading-relaxed">
              Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications
              seront publiées sur cette page avec une nouvelle date de mise à jour. Nous vous encourageons
              à consulter régulièrement cette page pour rester informé de la façon dont nous protégeons
              vos données.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">9. Contact</h2>
            <p className="text-white/80 leading-relaxed">
              Pour toute question concernant cette politique de confidentialité ou pour exercer vos
              droits, vous pouvez nous contacter via notre{' '}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline">
                formulaire de contact
              </Link>.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
