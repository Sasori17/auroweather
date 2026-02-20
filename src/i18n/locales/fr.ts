export const fr = {
  common: {
    search: 'Rechercher',
    loading: 'Chargement...',
    error: 'Erreur',
    notFound: 'Non trouvé',
    back: 'Retour',
    retry: 'Réessayer',
  },
  header: {
    home: 'Accueil',
  },
  footer: {
    aboutText:
      'Votre application météo moderne avec prévisions en temps réel, interface élégante et données précises pour toutes vos activités.',
    quickLinks: 'Liens rapides',
    legal: 'Informations légales',
    copyright: 'Tous droits réservés.',
    dataSource: 'Données météo fournies par OpenWeatherMap',
    links: {
      about: 'À propos',
      blog: 'Blog météo',
      guide: 'Guide météo',
      glossary: 'Glossaire',
      contact: 'Contact',
      privacy: 'Politique de confidentialité',
      terms: "Conditions d'utilisation",
    },
  },
  weather: {
    wind: 'Vent',
    humidity: 'Humidité',
    pressure: 'Pression atmosphérique',
    visibility: 'Visibilité',
    feelsLike: 'Ressenti',
    minMax: 'Min / Max',
    cloudCover: 'Couverture nuageuse',
    windDirection: 'Direction du vent',
    rainRisk: 'Risque de pluie (3h)',
    airQuality: "Qualité de l'air",
    pressureVis: 'Pression & Visibilité',
    otherInfo: 'Autres informations',
    pressure_low: 'Bas',
    pressure_normal: 'Normal',
    pressure_high: 'Haut',
    visibility_low: 'Faible',
    visibility_moderate: 'Modérée',
    visibility_excellent: 'Excellente',
    rain_low: 'Faible',
    rain_moderate: 'Modéré',
    rain_high: 'Élevé',
    air_good: 'Bonne',
    air_moderate: 'Moyenne',
    air_bad: 'Mauvaise',
    air_quality_good: 'Bonne',
    air_quality_fair: 'Correcte',
    air_quality_moderate: 'Moyenne',
    air_quality_poor: 'Mauvaise',
    air_quality_very_poor: 'Très mauvaise',
    air_quality_unknown: 'Inconnue',
    windAbbr: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'],
    windFull: [
      'Nord', 'Nord-Nord-Est', 'Nord-Est', 'Est-Nord-Est',
      'Est', 'Est-Sud-Est', 'Sud-Est', 'Sud-Sud-Est',
      'Sud', 'Sud-Sud-Ouest', 'Sud-Ouest', 'Ouest-Sud-Ouest',
      'Ouest', 'Ouest-Nord-Ouest', 'Nord-Ouest', 'Nord-Nord-Ouest',
    ],
  },
  home: {
    welcome: 'Bienvenue sur AuroWeather',
    subtitle:
      "Découvrez les prévisions météo en temps réel avec une interface moderne et élégante. Recherchez votre ville pour commencer.",
    realtime: 'Météo en temps réel',
    realtimeDesc:
      "Obtenez les conditions météorologiques actuelles et précises pour n'importe quelle ville",
    forecast: 'Prévisions 6 jours',
    forecastDesc:
      'Consultez les prévisions détaillées pour planifier vos activités en toute sérénité',
    data: 'Données complètes',
    dataDesc: "Température, vent, humidité, pression, visibilité et qualité de l'air",
    useLocation: 'Utiliser ma position',
  },
  search: {
    placeholder: 'Rechercher une ville...',
  },
  errors: {
    rateLimit:
      "Limite quotidienne d'appels API atteinte (1000/jour). Réessayez demain à minuit.",
    apiKey:
      "Clé API invalide ou non activée. Les nouvelles clés OpenWeatherMap peuvent prendre jusqu'à 2 heures pour être activées.",
    cityNotFound: "Ville non trouvée. Vérifiez l'orthographe et réessayez.",
    generic: 'Erreur lors de la récupération des données météo',
    geolocation: "La géolocalisation n'est pas supportée par votre navigateur",
    location: 'Impossible de récupérer votre position',
    apiKeyCoords:
      "Clé API invalide ou non activée. Les nouvelles clés OpenWeatherMap peuvent prendre jusqu'à 2 heures pour être activées. Testez votre clé sur : https://openweathermap.org/api",
  },
  cookie: {
    title: 'Gestion des cookies',
    description:
      "Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et afficher des publicités personnalisées. Vous pouvez choisir quels cookies vous acceptez.",
    learnMore:
      'En cliquant sur "Tout accepter", vous consentez à l\'utilisation de tous les cookies. Pour en savoir plus, consultez notre',
    privacyPolicy: 'Politique de confidentialité',
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    customize: 'Personnaliser',
    settingsTitle: 'Paramètres des cookies',
    necessary: 'Cookies nécessaires',
    necessaryDesc:
      "Ces cookies sont essentiels au fonctionnement du site. Ils ne peuvent pas être désactivés.",
    necessaryAlways: 'Toujours actifs',
    necessaryExamples: 'Exemples : préférences de langue, session utilisateur',
    analytics: "Cookies d'analyse",
    analyticsDesc:
      "Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site afin de l'améliorer.",
    analyticsExamples: 'Exemples : Google Analytics, statistiques de visite',
    advertising: 'Cookies publicitaires',
    advertisingDesc:
      "Ces cookies permettent d'afficher des publicités adaptées à vos centres d'intérêt via Google AdSense.",
    advertisingExamples: 'Exemples : Google AdSense, publicités personnalisées',
    modifyInfo:
      "Vous pouvez modifier vos préférences à tout moment. Pour plus d'informations, consultez notre",
    saveChoices: 'Enregistrer mes choix',
  },
  meta: {
    home: {
      title: 'AuroWeather - Météo en temps réel',
      description:
        'Application météo moderne avec données en temps réel, éléments 3D fluides et design glassmorphism élégant. Obtenez les prévisions météo, alertes et tendances climatiques.',
    },
    about: {
      title: "À propos d'AuroWeather - Votre compagnon météo moderne",
      description:
        "Découvrez AuroWeather, votre application météo moderne et fiable. Interface élégante, données en temps réel et technologies de pointe pour des prévisions précises.",
    },
    blog: {
      title: 'Blog Météo - Guides, Analyses et Conseils - AuroWeather',
      description:
        "Guides complets, analyses approfondies et conseils pratiques pour mieux comprendre la météo et ses impacts sur votre quotidien. Articles rédigés par des experts météo.",
    },
    contact: {
      title: 'Contact - AuroWeather',
      description:
        "Contactez l'équipe AuroWeather pour toute question ou suggestion.",
    },
    privacy: {
      title: 'Politique de confidentialité - AuroWeather',
      description:
        'Notre politique de confidentialité explique comment nous collectons et utilisons vos données.',
    },
    terms: {
      title: "Conditions d'utilisation - AuroWeather",
      description:
        "Lisez nos conditions d'utilisation pour comprendre vos droits et obligations.",
    },
    guide: {
      title: 'Guide Météo - AuroWeather',
      description:
        'Guide complet pour comprendre les phénomènes météorologiques et interpréter les prévisions.',
    },
    glossary: {
      title: 'Glossaire Météo - AuroWeather',
      description:
        'Découvrez les termes météorologiques essentiels avec notre glossaire complet.',
    },
  },
} as const;
