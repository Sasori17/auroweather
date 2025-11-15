# AuroWeather ☀️🌧️⛈️

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Une application météo moderne et élégante construite avec Next.js 16, Tailwind CSS et shadcn/ui, affichant la météo en temps réel et les prévisions à 5 jours.

![AuroWeather Preview](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=AuroWeather+Preview)

## Fonctionnalités

- **Météo en temps réel** : Affichage de la température, de l'humidité, de la vitesse du vent, de la pression, et plus encore
- **Prévisions à 5 jours** : Visualisation des prévisions météorologiques des prochains jours
- **Recherche de ville** : Recherchez la météo de n'importe quelle ville dans le monde
- **Géolocalisation automatique** : Détection automatique de votre position au chargement
- **Thèmes dynamiques** : Le fond d'écran change selon les conditions météorologiques (pluie, neige, nuit, etc.)
- **Loader animé** : Animation de chargement élégante pendant la récupération des données
- **Interface responsive** : Design adapté aux mobiles, tablettes et ordinateurs
- **Mode sombre** : Support du mode sombre automatique

## Stack Technique

- **Framework** : Next.js 16 avec App Router et Turbopack
- **Runtime** : React 19
- **UI** : Tailwind CSS v4 + shadcn/ui
- **Icônes** : Lucide React
- **API** : OpenWeatherMap API
- **Language** : TypeScript
- **Déploiement** : Vercel (recommandé)

## Installation

### Prérequis

- Node.js 20+ installé
- npm ou yarn
- Une clé API OpenWeatherMap (gratuite)

### Étapes d'installation

1. **Cloner le repository**
   ```bash
   git clone <votre-repo-url>
   cd auroweather.com
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Obtenir une clé API OpenWeatherMap**
   - Visitez [OpenWeatherMap](https://openweathermap.org/api)
   - Créez un compte gratuit
   - Générez une clé API

4. **Configurer les variables d'environnement**
   - Ouvrez le fichier `.env.local` à la racine du projet
   - Remplacez `your_api_key_here` par votre clé API :
     ```
     NEXT_PUBLIC_OPENWEATHER_API_KEY=votre_clé_api_ici
     ```

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

6. **Ouvrir l'application**
   - Ouvrez votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000)

## Structure du Projet

```
auroweather.com/
├── src/
│   ├── app/                  # App Router de Next.js
│   │   ├── layout.tsx        # Layout principal avec nav et footer
│   │   ├── page.tsx          # Page d'accueil
│   │   └── globals.css       # Styles globaux
│   ├── components/
│   │   ├── ui/              # Composants shadcn/ui
│   │   │   ├── card.tsx
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── alert.tsx
│   │   │   └── loader.tsx    # Loader personnalisé
│   │   └── weather/         # Composants météo
│   │       ├── WeatherCard.tsx
│   │       └── ForecastCard.tsx
│   ├── hooks/
│   │   └── useWeatherData.ts # Hook personnalisé pour l'API
│   ├── types/
│   │   └── weather.ts        # Types TypeScript
│   └── lib/
│       └── utils.ts          # Utilitaires
├── .env.local               # Variables d'environnement (à configurer)
└── package.json
```

## Utilisation

1. **Recherche manuelle** : Entrez le nom d'une ville dans la barre de recherche et appuyez sur Entrée
2. **Géolocalisation** : Cliquez sur l'icône de localisation pour utiliser votre position actuelle
3. **Thèmes dynamiques** : Le fond d'écran s'adapte automatiquement selon :
   - Les conditions météorologiques (pluie, neige, nuages, etc.)
   - L'heure de la journée (mode nuit entre 20h et 6h)

## API OpenWeatherMap

L'application utilise deux endpoints de l'API OpenWeatherMap :

- **Current Weather Data** : Pour la météo actuelle
- **5 Day / 3 Hour Forecast** : Pour les prévisions à 5 jours

Les données sont récupérées en unités métriques (Celsius, km/h).

## Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Créer un build de production
npm run build

# Démarrer le serveur de production
npm start

# Lancer le linter
npm run lint
```

## Déploiement

### Déploiement sur Vercel (recommandé)

1. Poussez votre code sur GitHub
2. Connectez-vous à [Vercel](https://vercel.com)
3. Importez votre repository
4. Ajoutez la variable d'environnement `NEXT_PUBLIC_OPENWEATHER_API_KEY`
5. Déployez !

## Personnalisation

### Modifier les thèmes météo

Éditez les couleurs de gradient dans `src/app/page.tsx` :

```typescript
const themeColors: Record<WeatherTheme, string> = {
  clear: 'from-blue-400 via-blue-300 to-blue-200',
  // ... autres thèmes
};
```

### Ajouter des icônes météo personnalisées

Les icônes proviennent d'OpenWeatherMap. Pour utiliser vos propres icônes, modifiez les composants dans `src/components/weather/`.

## Technologies Clés

- **Next.js 16** : Framework React avec App Router et Turbopack
- **React 19** : Dernière version de React avec React Compiler
- **Tailwind CSS v4** : Framework CSS utility-first
- **shadcn/ui** : Collection de composants réutilisables
- **TypeScript** : Typage statique pour JavaScript
- **Lucide React** : Bibliothèque d'icônes moderne
- **Google AdSense** : Monétisation avec publicités intégrées

## Licence

Ce projet est open source et disponible sous la licence MIT.

## Support

Pour toute question ou problème, ouvrez une issue sur le repository GitHub.

---

Développé avec ❤️ par AuroWeather
