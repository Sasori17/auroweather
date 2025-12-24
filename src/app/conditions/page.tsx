'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage() {
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
            <FileText className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Conditions d'utilisation
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
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptation des conditions</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              En accédant et en utilisant AuroWeather (ci-après "le Service"), vous acceptez d'être
              lié par les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions,
              veuillez ne pas utiliser notre Service.
            </p>
            <p className="text-white/80 leading-relaxed">
              L'utilisation du Service est également soumise à notre{' '}
              <Link href="/confidentialite" className="text-blue-400 hover:text-blue-300 underline">
                Politique de confidentialité
              </Link>, que nous vous encourageons à lire attentivement.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description du service</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              AuroWeather est une application web gratuite qui fournit des informations météorologiques
              en temps réel et des prévisions pour les villes du monde entier. Le Service comprend :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Conditions météorologiques actuelles (température, vent, humidité, etc.)</li>
              <li>Prévisions sur 6 jours</li>
              <li>Graphiques de température</li>
              <li>Informations sur la qualité de l'air</li>
              <li>Recherche de villes et géolocalisation</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">3. Utilisation acceptable</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              En utilisant AuroWeather, vous vous engagez à :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mb-4">
              <li>Utiliser le Service uniquement à des fins personnelles et légales</li>
              <li>Ne pas tenter de perturber, surcharger ou compromettre le fonctionnement du Service</li>
              <li>Ne pas utiliser de robots, scrapers ou autres outils automatisés pour accéder au Service</li>
              <li>Ne pas copier, reproduire ou redistribuer le contenu sans autorisation</li>
              <li>Respecter les droits de propriété intellectuelle</li>
            </ul>
            <p className="text-white/80 leading-relaxed">
              Toute utilisation abusive ou contraire à ces conditions peut entraîner la suspension
              ou la restriction de votre accès au Service.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">4. Exactitude des informations</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Bien que nous nous efforcions de fournir des informations météorologiques précises
              et à jour en provenance de sources fiables (OpenWeatherMap), nous ne pouvons garantir
              l'exactitude, l'exhaustivité ou l'actualité des prévisions météorologiques.
            </p>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-amber-200 text-sm leading-relaxed">
                <strong className="text-amber-400">Important :</strong> Les prévisions météorologiques
                sont des estimations basées sur des modèles scientifiques et peuvent être sujettes
                à des changements. Ne prenez pas de décisions critiques (notamment en matière de
                sécurité) basées uniquement sur nos prévisions sans consulter d'autres sources
                officielles.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation de responsabilité</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Dans toute la mesure permise par la loi :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li>Le Service est fourni "tel quel" sans garantie d'aucune sorte</li>
              <li>Nous ne sommes pas responsables des dommages directs, indirects ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser le Service</li>
              <li>Nous ne sommes pas responsables des décisions prises sur la base des informations fournies</li>
              <li>Nous ne garantissons pas que le Service sera ininterrompu, sécurisé ou exempt d'erreurs</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">6. Propriété intellectuelle</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Tous les droits de propriété intellectuelle relatifs à AuroWeather, y compris mais
              sans s'y limiter :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mb-4">
              <li>Le code source et l'architecture logicielle</li>
              <li>Le design et l'interface utilisateur</li>
              <li>Le logo et les éléments graphiques</li>
              <li>Les textes et contenus originaux</li>
            </ul>
            <p className="text-white/80 leading-relaxed mb-4">
              sont la propriété exclusive d'AuroWeather et sont protégés par les lois sur le droit
              d'auteur et la propriété intellectuelle.
            </p>
            <p className="text-white/70 leading-relaxed text-sm">
              Les données météorologiques sont fournies par OpenWeatherMap et sont soumises à leurs
              propres conditions d'utilisation.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">7. Publicités</h2>
            <p className="text-white/80 leading-relaxed">
              Le Service est financé par la publicité via Google AdSense. En utilisant AuroWeather,
              vous acceptez la présence de publicités sur le site. Les annonceurs tiers peuvent
              utiliser des cookies et autres technologies de suivi conformément à leurs propres
              politiques de confidentialité.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">8. Liens vers des sites tiers</h2>
            <p className="text-white/80 leading-relaxed">
              Le Service peut contenir des liens vers des sites web ou services tiers. Nous ne
              sommes pas responsables du contenu, des politiques de confidentialité ou des pratiques
              de ces sites tiers. L'accès à ces sites se fait à vos propres risques.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">9. Modifications du service</h2>
            <p className="text-white/80 leading-relaxed">
              Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie
              du Service à tout moment, avec ou sans préavis. Nous ne serons pas responsables
              envers vous ou tout tiers de toute modification, suspension ou interruption du Service.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">10. Modifications des conditions</h2>
            <p className="text-white/80 leading-relaxed">
              Nous pouvons modifier ces conditions d'utilisation à tout moment. Les modifications
              entreront en vigueur dès leur publication sur cette page avec une nouvelle date de
              mise à jour. Votre utilisation continue du Service après la publication des modifications
              constitue votre acceptation des nouvelles conditions.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">11. Droit applicable</h2>
            <p className="text-white/80 leading-relaxed">
              Ces conditions d'utilisation sont régies par le droit français. Tout litige relatif
              à l'utilisation du Service sera soumis à la compétence exclusive des tribunaux français.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">12. Contact</h2>
            <p className="text-white/80 leading-relaxed">
              Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter
              via notre{' '}
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
