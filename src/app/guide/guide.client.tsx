'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Cloud, Thermometer, Wind, Droplets, Eye, Gauge, Sun, CloudRain } from 'lucide-react';

export default function GuideClientPage() {
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
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Guide météo
            </h1>
          </div>
          <p className="text-xl text-white/70">
            Apprenez à comprendre et interpréter les prévisions météorologiques
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              Comprendre les prévisions météorologiques vous permet de mieux planifier vos activités
              quotidiennes et de prendre des décisions éclairées. Ce guide vous explique comment
              interpréter les différentes informations affichées sur AuroWeather et ce qu'elles
              signifient concrètement pour vous.
            </p>
            <p className="text-white/80 leading-relaxed">
              Les prévisions météo sont basées sur des modèles scientifiques complexes qui analysent
              des millions de données provenant de satellites, stations météo et radars pour prédire
              l'évolution du temps.
            </p>
          </motion.section>

          {/* Temperature */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Thermometer className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-semibold text-white">Température</h2>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Température actuelle</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              C'est la température mesurée actuellement à l'endroit sélectionné. Elle est exprimée
              en degrés Celsius (°C) et provient de stations météorologiques réelles.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Température ressentie</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              La température ressentie (ou "feels like") prend en compte plusieurs facteurs qui
              influencent votre perception de la température :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4 mb-4">
              <li><strong className="text-white">Le vent :</strong> refroidit la peau (effet de refroidissement éolien)</li>
              <li><strong className="text-white">L'humidité :</strong> augmente la sensation de chaleur en été</li>
              <li><strong className="text-white">L'ensoleillement :</strong> peut augmenter la sensation de chaleur</li>
            </ul>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-blue-200 text-sm leading-relaxed">
                <strong className="text-blue-400">Conseil :</strong> Utilisez la température ressentie
                plutôt que la température réelle pour choisir vos vêtements. Par exemple, 10°C avec
                du vent peut donner une sensation de 5°C.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Températures min/max</h3>
            <p className="text-white/80 leading-relaxed">
              Ces valeurs indiquent la température la plus basse et la plus haute prévues pour la
              journée. Elles vous aident à anticiper les variations de température entre le matin
              et l'après-midi.
            </p>
          </motion.section>

          {/* Weather Conditions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cloud className="w-6 h-6 text-slate-400" />
              <h2 className="text-2xl font-semibold text-white">Conditions météo</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-semibold text-white">Ciel dégagé</h3>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Absence de nuages ou couverture nuageuse inférieure à 10%. Idéal pour les activités
                  en plein air. Attention : risque de coup de soleil en été, pensez à la protection
                  solaire.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="w-5 h-5 text-slate-300" />
                  <h3 className="text-xl font-semibold text-white">Nuageux</h3>
                </div>
                <p className="text-white/70 leading-relaxed mb-2">
                  Présence de nuages couvrant partiellement ou totalement le ciel :
                </p>
                <ul className="list-disc list-inside space-y-1 text-white/60 ml-4">
                  <li><strong className="text-white">Peu nuageux :</strong> 10-25% de couverture</li>
                  <li><strong className="text-white">Partiellement nuageux :</strong> 25-50% de couverture</li>
                  <li><strong className="text-white">Très nuageux :</strong> 50-90% de couverture</li>
                  <li><strong className="text-white">Couvert :</strong> plus de 90% de couverture</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Pluie</h3>
                </div>
                <p className="text-white/70 leading-relaxed mb-2">
                  Précipitations liquides. L'intensité peut varier :
                </p>
                <ul className="list-disc list-inside space-y-1 text-white/60 ml-4">
                  <li><strong className="text-white">Bruine :</strong> fines gouttelettes, faible intensité</li>
                  <li><strong className="text-white">Pluie légère :</strong> moins de 2,5 mm/h</li>
                  <li><strong className="text-white">Pluie modérée :</strong> 2,5 à 10 mm/h</li>
                  <li><strong className="text-white">Forte pluie :</strong> plus de 10 mm/h</li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <p className="text-amber-200 text-sm leading-relaxed">
                  <strong className="text-amber-400">Bon à savoir :</strong> Le pourcentage de
                  précipitations (ex: 60%) ne signifie pas qu'il pleuvra 60% du temps, mais qu'il
                  y a 60% de chances qu'il pleuve à un moment donné dans la zone prévue.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Wind */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Wind className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">Vent</h2>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">Vitesse du vent</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              La vitesse est affichée en kilomètres par heure (km/h). Voici comment interpréter
              ces valeurs :
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">0-10 km/h</span>
                <span className="text-white/60 text-sm">Calme à légère brise</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">11-20 km/h</span>
                <span className="text-white/60 text-sm">Brise légère</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">21-40 km/h</span>
                <span className="text-white/60 text-sm">Brise modérée à fraîche</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">41-60 km/h</span>
                <span className="text-white/60 text-sm">Grand frais (difficultés à marcher)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <span className="text-white">60+ km/h</span>
                <span className="text-amber-300 text-sm">Vent fort (attention, danger)</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3">Direction du vent</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              La direction indique d'où vient le vent (et non vers où il va). Par exemple :
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 ml-4">
              <li><strong className="text-white">Vent du Nord :</strong> vient du Nord, souffle vers le Sud</li>
              <li><strong className="text-white">Vent d'Ouest :</strong> vient de l'Ouest, souffle vers l'Est</li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-4">
              En France, les vents d'Ouest apportent généralement de l'air doux et humide de l'océan
              Atlantique, tandis que les vents du Nord apportent de l'air frais.
            </p>
          </motion.section>

          {/* Humidity */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-semibold text-white">Humidité</h2>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">
              L'humidité relative représente la quantité de vapeur d'eau présente dans l'air par
              rapport à la quantité maximale que l'air peut contenir à cette température. Elle
              s'exprime en pourcentage (%).
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Interprétation</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">0-30%</span>
                <span className="text-white/60 text-sm">Air très sec (inconfortable)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-white">30-60%</span>
                <span className="text-green-300 text-sm">Confortable</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">60-80%</span>
                <span className="text-white/60 text-sm">Humide (peut sembler lourd)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <span className="text-white">80-100%</span>
                <span className="text-amber-300 text-sm">Très humide (brouillard possible)</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <p className="text-blue-200 text-sm leading-relaxed">
                <strong className="text-blue-400">Impact sur le confort :</strong> Une humidité
                élevée (&gt;70%) en été augmente la sensation de chaleur car elle empêche l'évaporation
                de la transpiration. En hiver, un air trop sec (&lt;30%) peut irriter les voies
                respiratoires.
              </p>
            </div>
          </motion.section>

          {/* Pressure */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">Pression atmosphérique</h2>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">
              La pression atmosphérique est le poids de l'air au-dessus de nous. Elle se mesure en
              hectopascals (hPa) et influence grandement le temps qu'il fait. La pression normale
              au niveau de la mer est d'environ 1013 hPa.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Interprétation</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">&lt; 1010 hPa</span>
                <span className="text-white/60 text-sm">Basse pression (temps instable, pluie)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-white">1010-1020 hPa</span>
                <span className="text-green-300 text-sm">Pression normale</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">&gt; 1020 hPa</span>
                <span className="text-white/60 text-sm">Haute pression (temps stable, clair)</span>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <p className="text-green-200 text-sm leading-relaxed">
                <strong className="text-green-400">Tendance à surveiller :</strong> Plus important
                que la valeur absolue, observez la tendance. Une pression en hausse indique une
                amélioration du temps, tandis qu'une chute rapide annonce souvent de la pluie ou
                du vent.
              </p>
            </div>
          </motion.section>

          {/* Visibility */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-semibold text-white">Visibilité</h2>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">
              La visibilité indique la distance maximale à laquelle vous pouvez distinguer clairement
              un objet. Elle est exprimée en kilomètres (km) et peut être réduite par le brouillard,
              la pluie, la neige ou la pollution.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-white">&gt; 10 km</span>
                <span className="text-green-300 text-sm">Excellente visibilité</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">4-10 km</span>
                <span className="text-white/60 text-sm">Bonne visibilité</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white">1-4 km</span>
                <span className="text-white/60 text-sm">Visibilité modérée (brume)</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <span className="text-white">&lt; 1 km</span>
                <span className="text-amber-300 text-sm">Brouillard (prudence en conduite)</span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
              <p className="text-amber-200 text-sm leading-relaxed">
                <strong className="text-amber-400">Sécurité routière :</strong> En cas de visibilité
                inférieure à 1 km, adaptez votre vitesse et allumez vos feux de brouillard. Une
                visibilité inférieure à 50 mètres nécessite une extrême prudence.
              </p>
            </div>
          </motion.section>

          {/* Air Quality */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Wind className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-semibold text-white">Qualité de l'air</h2>
            </div>

            <p className="text-white/80 leading-relaxed mb-4">
              L'indice de qualité de l'air (IQA ou AQI en anglais) mesure la concentration de
              polluants atmosphériques nocifs pour la santé. Il est exprimé sur une échelle de 1 à 5.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <span className="text-white">1 - Bonne</span>
                <span className="text-green-300 text-sm">Air de qualité satisfaisante</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-lime-500/10 rounded-lg border border-lime-500/20">
                <span className="text-white">2 - Correcte</span>
                <span className="text-lime-300 text-sm">Acceptable pour la plupart des gens</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <span className="text-white">3 - Moyenne</span>
                <span className="text-yellow-300 text-sm">Sensibles : limiter efforts prolongés</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <span className="text-white">4 - Mauvaise</span>
                <span className="text-orange-300 text-sm">Effets sur la santé possibles</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <span className="text-white">5 - Très mauvaise</span>
                <span className="text-red-300 text-sm">Éviter les activités extérieures</span>
              </div>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-red-200 text-sm leading-relaxed">
                <strong className="text-red-400">Populations sensibles :</strong> Les personnes
                âgées, enfants, femmes enceintes et personnes souffrant de problèmes respiratoires
                ou cardiaques doivent être particulièrement vigilantes lorsque l'indice est de 3 ou plus.
              </p>
            </div>
          </motion.section>

          {/* Tips */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md rounded-2xl p-8 border border-blue-500/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Conseils d'utilisation d'AuroWeather</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Vérifiez plusieurs fois par jour</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Les prévisions sont mises à jour régulièrement. Consultez-les le matin pour
                  planifier votre journée et en cours de journée si nécessaire.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">2. Regardez les prévisions sur 6 jours</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Les prévisions à court terme (1-3 jours) sont plus fiables que celles à long
                  terme. Utilisez-les pour anticiper mais soyez flexible.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">3. Combinez plusieurs indicateurs</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Ne vous fiez pas qu'à la température. Prenez en compte le vent, l'humidité et
                  les précipitations pour avoir une vue complète.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">4. Utilisez la géolocalisation</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Activez "Utiliser ma position" pour obtenir automatiquement les prévisions de
                  votre localisation actuelle, pratique en déplacement.
                </p>
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
            href="/glossaire"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full transition-colors border border-white/20"
          >
            Consulter le glossaire
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors"
          >
            Voir la météo
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
