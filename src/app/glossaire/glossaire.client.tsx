'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function GlossaryClientPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const glossaryTerms = [
    {
      letter: 'A',
      terms: [
        {
          term: 'Anticyclone',
          definition: 'Zone de haute pression atmosphérique caractérisée par un temps généralement stable et clair. L\'air descend et se réchauffe, empêchant la formation de nuages.'
        },
        {
          term: 'AQI (Air Quality Index)',
          definition: 'Indice de qualité de l\'air qui mesure la concentration de polluants atmosphériques. Varie de 1 (bonne) à 5 (très mauvaise) et indique l\'impact potentiel sur la santé.'
        },
        {
          term: 'Atmosphère',
          definition: 'Couche de gaz entourant la Terre, composée principalement d\'azote (78%) et d\'oxygène (21%). C\'est dans l\'atmosphère que se produisent tous les phénomènes météorologiques.'
        },
      ]
    },
    {
      letter: 'B',
      terms: [
        {
          term: 'Brouillard',
          definition: 'Nuage au niveau du sol réduisant la visibilité à moins de 1 km. Se forme lorsque l\'air humide se refroidit et que la vapeur d\'eau se condense en minuscules gouttelettes.'
        },
        {
          term: 'Brise',
          definition: 'Vent léger à modéré. On distingue la brise de mer (qui souffle de la mer vers la terre le jour) et la brise de terre (qui souffle de la terre vers la mer la nuit).'
        },
        {
          term: 'Bruine',
          definition: 'Précipitation composée de très fines gouttelettes d\'eau (moins de 0,5 mm de diamètre) tombant lentement et uniformément.'
        },
      ]
    },
    {
      letter: 'C',
      terms: [
        {
          term: 'Celsius (°C)',
          definition: 'Unité de mesure de température. L\'échelle Celsius fixe le point de congélation de l\'eau à 0°C et son point d\'ébullition à 100°C au niveau de la mer.'
        },
        {
          term: 'Ciel dégagé',
          definition: 'Condition météorologique où la couverture nuageuse est inférieure à 10%. Aussi appelé "ciel clair".'
        },
        {
          term: 'Cumulus',
          definition: 'Nuages blancs et cotonneux à base horizontale et sommet arrondi, typiques du beau temps. Peuvent évoluer en cumulonimbus orageux.'
        },
      ]
    },
    {
      letter: 'D',
      terms: [
        {
          term: 'Dépression',
          definition: 'Zone de basse pression atmosphérique associée à un temps généralement instable avec nuages et précipitations. L\'air monte, se refroidit et forme des nuages.'
        },
        {
          term: 'Degrés',
          definition: 'Unité de mesure pour la température (°C, °F) ou pour les angles (direction du vent en degrés, 0° = Nord, 90° = Est, 180° = Sud, 270° = Ouest).'
        },
      ]
    },
    {
      letter: 'E',
      terms: [
        {
          term: 'Évaporation',
          definition: 'Transformation de l\'eau liquide en vapeur d\'eau sous l\'effet de la chaleur. C\'est un processus clé du cycle de l\'eau.'
        },
      ]
    },
    {
      letter: 'F',
      terms: [
        {
          term: 'Front',
          definition: 'Zone de transition entre deux masses d\'air de températures différentes. Un front froid apporte de l\'air plus froid, un front chaud de l\'air plus doux.'
        },
        {
          term: 'Front froid',
          definition: 'Limite où une masse d\'air froid remplace une masse d\'air chaud. Provoque souvent des précipitations intenses mais brèves et une baisse de température.'
        },
      ]
    },
    {
      letter: 'G',
      terms: [
        {
          term: 'Grêle',
          definition: 'Précipitation solide sous forme de billes de glace de plus de 5 mm de diamètre. Se forme dans les cumulonimbus lors d\'orages violents.'
        },
      ]
    },
    {
      letter: 'H',
      terms: [
        {
          term: 'hPa (Hectopascal)',
          definition: 'Unité de mesure de la pression atmosphérique. 1 hPa = 100 Pascals. La pression normale au niveau de la mer est d\'environ 1013 hPa.'
        },
        {
          term: 'Humidité relative',
          definition: 'Pourcentage de vapeur d\'eau présente dans l\'air par rapport à la quantité maximale que l\'air peut contenir à cette température. Varie de 0% (air très sec) à 100% (air saturé).'
        },
      ]
    },
    {
      letter: 'I',
      terms: [
        {
          term: 'Isobare',
          definition: 'Ligne sur une carte météo reliant les points de même pression atmosphérique. Permet de visualiser les zones de haute et basse pression.'
        },
      ]
    },
    {
      letter: 'M',
      terms: [
        {
          term: 'Météorologie',
          definition: 'Science qui étudie les phénomènes atmosphériques pour comprendre et prévoir le temps qu\'il fait.'
        },
        {
          term: 'mm (Millimètre)',
          definition: 'Unité de mesure des précipitations. 1 mm de pluie correspond à 1 litre d\'eau par mètre carré.'
        },
      ]
    },
    {
      letter: 'N',
      terms: [
        {
          term: 'Nébulosité',
          definition: 'Fraction du ciel couverte par des nuages, exprimée en pourcentage ou en octas (huitièmes de ciel). 0/8 = ciel dégagé, 8/8 = ciel couvert.'
        },
        {
          term: 'Neige',
          definition: 'Précipitation solide formée de cristaux de glace. Se produit lorsque la température est inférieure à 0°C dans toute la couche d\'air traversée.'
        },
      ]
    },
    {
      letter: 'O',
      terms: [
        {
          term: 'Orage',
          definition: 'Phénomène météorologique violent caractérisé par des éclairs, du tonnerre, des pluies intenses et parfois de la grêle. Se forme dans les cumulonimbus.'
        },
        {
          term: 'Ozone (O₃)',
          definition: 'Gaz présent dans l\'atmosphère. En altitude, il nous protège des UV. Au sol, c\'est un polluant irritant formé par réaction chimique lors de fortes chaleurs.'
        },
      ]
    },
    {
      letter: 'P',
      terms: [
        {
          term: 'Précipitations',
          definition: 'Eau qui tombe de l\'atmosphère vers le sol sous forme liquide (pluie, bruine) ou solide (neige, grêle, grésil).'
        },
        {
          term: 'Pression atmosphérique',
          definition: 'Force exercée par le poids de l\'air sur une surface. Mesurée en hPa, elle influence grandement le temps qu\'il fait.'
        },
        {
          term: 'Prévisions météo',
          definition: 'Estimation de l\'évolution du temps à venir basée sur des modèles mathématiques complexes et l\'analyse de millions de données.'
        },
      ]
    },
    {
      letter: 'R',
      terms: [
        {
          term: 'Rafale',
          definition: 'Augmentation soudaine et brève de la vitesse du vent. Les rafales peuvent être significativement plus fortes que le vent moyen.'
        },
        {
          term: 'Rayonnement solaire',
          definition: 'Énergie émise par le Soleil sous forme de lumière et de chaleur. Principal moteur de la météorologie et du climat terrestre.'
        },
      ]
    },
    {
      letter: 'T',
      terms: [
        {
          term: 'Température',
          definition: 'Mesure du degré de chaleur ou de froid de l\'air. Varie selon l\'heure, la saison, la latitude et l\'altitude.'
        },
        {
          term: 'Température ressentie',
          definition: 'Température perçue par le corps humain en tenant compte du vent et de l\'humidité. Peut être très différente de la température réelle.'
        },
        {
          term: 'Tempête',
          definition: 'Perturbation atmosphérique violente caractérisée par des vents très forts (plus de 90 km/h) souvent accompagnés de fortes pluies.'
        },
      ]
    },
    {
      letter: 'V',
      terms: [
        {
          term: 'Vent',
          definition: 'Déplacement horizontal de l\'air causé par les différences de pression atmosphérique. Va toujours des hautes pressions vers les basses pressions.'
        },
        {
          term: 'Visibilité',
          definition: 'Distance maximale à laquelle on peut distinguer clairement un objet. Peut être réduite par le brouillard, la pluie, la neige ou la pollution.'
        },
      ]
    },
  ];

  const filteredGlossary = glossaryTerms.map(section => ({
    ...section,
    terms: section.terms.filter(item =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.terms.length > 0);

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
              Glossaire météo
            </h1>
          </div>
          <p className="text-xl text-white/70 mb-8">
            Dictionnaire des termes météorologiques pour mieux comprendre les prévisions
          </p>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un terme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:border-blue-400/50 transition-colors placeholder:text-white/50"
            />
          </div>
        </motion.div>

        {/* Glossary Content */}
        <div className="space-y-8">
          {filteredGlossary.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
            >
              <p className="text-white/70">Aucun terme trouvé pour "{searchTerm}"</p>
            </motion.div>
          ) : (
            filteredGlossary.map((section, sectionIndex) => (
              <motion.section
                key={section.letter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400">{section.letter}</span>
                  </div>
                  <div className="h-px flex-1 bg-white/10"></div>
                </div>

                <div className="space-y-6">
                  {section.terms.map((item, index) => (
                    <div key={index} className="group">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {item.term}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            ))
          )}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-blue-500/10 backdrop-blur-md rounded-2xl p-6 border border-blue-500/20"
        >
          <p className="text-blue-200 text-sm leading-relaxed">
            <strong className="text-blue-400">Bon à savoir :</strong> Ce glossaire est régulièrement
            enrichi avec de nouveaux termes. Si vous souhaitez la définition d'un terme spécifique,
            n'hésitez pas à nous{' '}
            <Link href="/contact" className="underline hover:text-blue-300">
              contacter
            </Link>.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/guide"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full transition-colors border border-white/20"
          >
            Consulter le guide météo
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
