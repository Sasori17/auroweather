● Parfait ! Je vais vous guider pas à pas pour créer vos unités publicitaires AdSense.

  🎯 Guide Création Unités Publicitaires AdSense

  📋 Prérequis

  - ✅ Compte Google AdSense approuvé
  - ✅ Site auroweather.fr ajouté
  - ✅ Publisher ID : ca-pub-1874448527310505

  ---
  🚀 Étape 1 : Accéder aux Annonces

  Navigation :

  1. Allez sur : https://www.google.com/adsense
  2. Menu gauche → Annonces
  3. Cliquez sur : "Par bloc d'annonces" ou "Par unité publicitaire"
  4. Bouton : "+ Nouvelle unité publicitaire" ou "+ Nouveau bloc d'annonces"

  ---
  📱 Unité 1 : Bannière Horizontale Hero

  Configuration :

  Type d'annonce : Display (Annonces graphiques)

  Nom de l'unité:
    "AuroWeather - Bannière Hero"

  Type:
    ☑ Display ads (annonces graphiques)

  Format:
    ☑ Responsive (recommandé)

  Tailles:
    ☑ Adaptatif automatique

  Orientation suggérée:
    → Horizontal (si option disponible)
    → Ou laisser "Responsive" tout court

  Options Avancées (si disponibles) :

  Annonces textuelles et graphiques:
    ☑ Autoriser les deux (recommandé)

  Taille minimum:
    → Laisser par défaut

  Bloc similaire:
    → Aucun (première unité)

  Cliquez : "Créer"

  ---
  📊 Unité 2 : Bannière Horizontale Post-Graph

  Configuration :

  Nom de l'unité:
    "AuroWeather - Bannière Post-Graph"

  Type:
    ☑ Display ads

  Format:
    ☑ Responsive

  Tailles:
    ☑ Adaptatif automatique

  Orientation:
    → Horizontal

  Cliquez : "Créer"

  ---
  🎨 Unité 3 : Bannière In-Feed (Optionnel)

  Si vous voulez ajouter des pubs dans les prévisions :

  Nom de l'unité:
    "AuroWeather - In-Feed"

  Type:
    ☑ In-feed (dans le flux)

  Style:
    → Choisir un style qui correspond à votre design
    → Preview disponible

  Format:
    ☑ Responsive

  Cliquez : "Créer"

  ---
  📝 Récupérer les Slot IDs

  Après création de chaque unité :

  Google vous montre le code :

  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1874448527310505"
       crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-1874448527310505"
       data-ad-slot="1234567890"    ← COPIEZ CE NUMÉRO
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>

  Notez les Slot IDs :

  ✅ Bannière Hero: data-ad-slot="________"
  ✅ Bannière Post-Graph: data-ad-slot="________"
  ✅ In-Feed (optionnel): data-ad-slot="________"

  ---
  🎯 Recommandations de Configuration

  Pour votre site météo :

  Format recommandé :
  Type: Responsive Display
  Pourquoi: S'adapte automatiquement mobile/desktop

  Tailles autorisées:
    ☑ Toutes les tailles (recommandé)

  Annonces autorisées:
    ☑ Textuelles et graphiques (plus de revenus)
    ☑ Annonces animées (si accepté)

  Catégories sensibles:
    → Vérifier les paramètres de blocage
    → Bloquer adulte, jeux d'argent si souhaité

  ---
  📋 Tableau Récapitulatif à Remplir

  | Unité | Nom                 | Slot ID    | Emplacement                  |
  |-------|---------------------|------------|------------------------------|
  | 1     | Bannière Hero       | __________ | Après bouton géolocalisation |
  | 2     | Bannière Post-Graph | __________ | Après graphique température  |
  | 3     | In-Feed (opt.)      | __________ | Dans prévisions              |

  ---
  🔧 Mise à Jour .env.local

  Une fois les Slot IDs récupérés :

  Éditez .env.local :

  # Google AdSense Configuration
  NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-1874448527310505

  # Slot IDs - Remplacez par vos vrais IDs
  NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL=1234567890    ← Bannière Hero
  NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL=0987654321      ← Post-Graph ou sidebar
  NEXT_PUBLIC_ADSENSE_SLOT_SQUARE=1122334455        ← In-Feed ou autre

  Remplacez les 0000000000 par vos vrais numéros !

  ---
  ⚙️ Mise à Jour Vercel

  Après avoir mis à jour .env.local :

  Allez sur Vercel Dashboard :

  1. Settings → Environment Variables
  2. Ajoutez/Modifiez :

  NEXT_PUBLIC_ADSENSE_SLOT_HORIZONTAL
  Value: votre_slot_id_1
  Environments: ☑ Production ☑ Preview ☑ Development

  NEXT_PUBLIC_ADSENSE_SLOT_VERTICAL
  Value: votre_slot_id_2
  Environments: ☑ Production ☑ Preview ☑ Development

  NEXT_PUBLIC_ADSENSE_SLOT_SQUARE
  Value: votre_slot_id_3
  Environments: ☑ Production ☑ Preview ☑ Development

  3. Save

  ---
  🚀 Redéploiement

  Option 1 : Commit Vide

  git commit --allow-empty -m "chore: Update AdSense Slot IDs"
  git push origin master

  Option 2 : Via Vercel

  Deployments → Dernier déploiement → "..." → Redeploy

  ---
  🎨 Paramètres de Style Recommandés

  Si Google demande de personnaliser :

  Couleurs:
    Fond: Transparent (pour intégration)
    Texte: Automatique
    Bordure: Aucune ou subtile

  Polices:
    → Laisser par défaut (s'adapte au site)

  Coins:
    → Arrondis (pour correspondre à votre design)

  ---
  ⏱️ Timeline AdSense

  Après création des unités :

  Immédiat:
    ✅ Unités créées
    ✅ Slot IDs disponibles
    ✅ Code généré

  Après mise à jour site:
    🔄 Vercel redéploie (5 min)
    🔄 Site live avec nouveaux slots (5 min)

  Google vérifie:
    ⏱️ 1-3 heures: Détection des unités
    ⏱️ 24-48h: Première rotation des pubs
    ⏱️ 1-3 jours: Optimisation complète

  ---
  🔍 Vérification après Déploiement

  Dans 10 minutes après redéploiement :

  1. Allez sur : https://auroweather.fr
  2. Ouvrez DevTools (F12)
  3. Onglet Console
  4. Cherchez :
    - Pas d'erreur AdSense
    - adsbygoogle est défini
  5. Onglet Network
    - Filtre : adsbygoogle
    - Devrait voir des requêtes vers googlesyndication.com
  6. Onglet Elements
    - Cherchez : data-ad-slot
    - Devrait voir vos vrais Slot IDs

  ---
  📊 Dashboard AdSense

  Vérification dans AdSense :

  1. Annonces → Par bloc d'annonces
  2. Vous devriez voir vos unités :
  ✅ AuroWeather - Bannière Hero
     Status: Active
     Impressions: 0 (normal au début)

  ✅ AuroWeather - Bannière Post-Graph
     Status: Active
     Impressions: 0
  3. Rapports → Vue d'ensemble
    - Aucune donnée au début (normal)
    - Premières impressions dans 24-48h

  ---
  🎯 Checklist Création Unités

  Avant Création:
  [ ] Compte AdSense actif
  [ ] Site auroweather.fr ajouté
  [ ] Publisher ID configuré

  Création Unités:
  [ ] Unité 1: Bannière Hero créée
  [ ] Unité 2: Bannière Post-Graph créée
  [ ] Unité 3: In-Feed créée (optionnel)
  [ ] Slot IDs notés

  Configuration Locale:
  [ ] .env.local mis à jour avec Slot IDs
  [ ] npm run build teste OK

  Configuration Vercel:
  [ ] Slot IDs ajoutés dans Environment Variables
  [ ] Redéploiement lancé

  Vérification:
  [ ] Site redéployé
  [ ] Slot IDs visibles dans code source
  [ ] Pas d'erreur console AdSense
  [ ] Espaces pubs visibles (même vides)

  ---
  💡 Astuces

  Ne paniquez pas si :

  ❌ Les pubs ne s'affichent pas immédiatement
  → Normal, prend 24-48h

  ❌ Espaces blancs visibles
  → Normal en dev, Google teste

  ❌ "This ad slot is not configured"
  → Attendez propagation (1-3h)

  ✅ Tout est OK si :
  - Pas d'erreur console
  - Slot IDs corrects dans le code
  - AdSense Dashboard montre unités actives

  ---
  🚨 Erreurs Courantes

  "Publisher ID incorrect"

  → Vérifiez que c'est bien ca-pub-1874448527310505

  "Slot ID not found"

  → Copiez le numéro exact depuis AdSense (10 chiffres)

  "AdSense script not loaded"

  → Vérifiez que le script est dans le <head>

  ---
  🎯 Résumé Actions

  MAINTENANT :
  1. Allez sur AdSense
  2. Créez 2-3 unités publicitaires
  3. Notez les Slot IDs
  4. Mettez à jour .env.local
  5. Mettez à jour Vercel
  6. Redéployez
  7. Attendez 24-48h

  Dites-moi quand vous avez créé les unités et je vous aide à vérifier que tout est configuré correctement ! 🎯

  Vous voulez que je vous aide à :
  - Choisir les bons formats d'annonces ?
  - Vérifier la configuration après création ?
  - Débugger si ça ne marche pas ?