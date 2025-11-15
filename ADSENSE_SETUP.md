# Configuration Google AdSense pour AuroWeather

Ce guide explique comment configurer Google AdSense dans l'application AuroWeather.

## Architecture du système publicitaire

### 1. Composants créés

#### `src/components/ads/GoogleAdsense.tsx`
Script qui charge Google AdSense via Next.js Script :
- Strategy `afterInteractive` pour la performance
- ID Publisher configuré : `ca-pub-1874448527310505`

#### `src/components/ads/AdBanner.tsx`
Composants de bannières publicitaires :
- `AdBanner` : Composant de base générique
- `HorizontalAdBanner` : Bannière horizontale responsive
- `VerticalAdBanner` : Bannière verticale pour sidebar
- `SquareAdBanner` : Bannière carrée

### 2. Emplacements des publicités

Les publicités sont affichées à deux endroits stratégiques :
1. **En haut du contenu** : Bannière horizontale après le header
2. **En bas du contenu** : Bannière horizontale avant le footer

## Configuration Google AdSense

### Étape 1 : Créer un compte AdSense

1. Allez sur [Google AdSense](https://www.google.com/adsense/)
2. Créez un compte et soumettez votre site pour approbation
3. Attendez l'approbation (peut prendre quelques jours)

### Étape 2 : Publisher ID configuré

✅ **Publisher ID actuel** : `ca-pub-1874448527310505`

Le Publisher ID est déjà configuré dans :
- `src/components/ads/GoogleAdsense.tsx` (script de chargement)
- `src/components/ads/AdBanner.tsx` (composant d'affichage)

### Étape 3 : Configurer les blocs publicitaires

Dans votre tableau de bord AdSense :
1. Allez dans **Annonces > Par unité publicitaire**
2. Créez des blocs publicitaires selon vos besoins :
   - **Bannière horizontale** : Format "Responsive" ou "728x90"
   - **Bannière verticale** : Format "300x250" ou "160x600"

3. Copiez les **Slot ID** de chaque bloc
4. Mettez à jour les Slot ID dans `src/components/ads/AdBanner.tsx` :

```tsx
export function HorizontalAdBanner({ className = '' }: { className?: string }) {
  return (
    <AdBanner
      dataAdSlot="YOUR_HORIZONTAL_SLOT_ID" // ← Remplacer par votre Slot ID
      dataAdFormat="horizontal"
      dataFullWidthResponsive={true}
      className={className}
    />
  );
}
```

**Note** : Les Slot ID peuvent être ajoutés plus tard. Google AdSense peut détecter automatiquement les emplacements lors de l'examen initial du site.

## Test en développement

L'application affiche maintenant les publicités pour tous les utilisateurs. Pour tester en développement :

1. Lancez le serveur de développement : `npm run dev`
2. Ouvrez l'application dans votre navigateur
3. Les emplacements publicitaires devraient être visibles (peuvent être vides avant approbation AdSense)

## Ajout de nouvelles positions publicitaires

Pour ajouter des publicités ailleurs dans l'application :

```tsx
import { HorizontalAdBanner } from '@/components/ads/AdBanner';

// Dans votre composant
<HorizontalAdBanner className="my-4" />
```

## Conformité RGPD/GDPR

⚠️ **Important** : Avant de déployer en production, ajoutez un système de consentement aux cookies :

### Solutions recommandées :
- [CookieYes](https://www.cookieyes.com/)
- [OneTrust](https://www.onetrust.com/)
- [Cookiebot](https://www.cookiebot.com/)

### Exemple d'intégration :

```tsx
// src/components/CookieConsent.tsx
export function CookieConsent() {
  // Afficher un bandeau de consentement
  // Charger AdSense uniquement après consentement
}
```

## Performances

Les publicités sont chargées avec la stratégie `afterInteractive` de Next.js :
- Ne bloque pas le rendu initial
- Charge après l'hydratation React
- Optimisé pour Core Web Vitals

## Déploiement

### État actuel de la configuration

✅ **Publisher ID configuré** : `ca-pub-1874448527310505`
✅ **Script AdSense intégré** dans l'application
✅ **Emplacements publicitaires** : Top et bottom banners

### Checklist avant déploiement

1. ✅ Publisher ID configuré
2. ⏳ Déployer le site en ligne (Vercel, Netlify, etc.)
3. ⏳ Soumettre le site à Google AdSense pour examen
4. ⏳ Attendre l'approbation (peut prendre quelques jours)
5. ⏳ Configurer les blocs publicitaires avec Slot ID
6. ⏳ Ajouter le consentement cookies (RGPD) si nécessaire

## Variables d'environnement (optionnel)

Pour plus de flexibilité, utilisez des variables d'environnement :

```env
# .env.local
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT=1234567890
NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT=0987654321
```

Puis dans vos composants :
```tsx
data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT}
```

## Support

Pour toute question :
- [Documentation AdSense](https://support.google.com/adsense)
- [Politiques AdSense](https://support.google.com/adsense/answer/48182)
- [Centre d'aide Next.js](https://nextjs.org/docs)

---

**Note** : Les publicités peuvent prendre quelques heures pour apparaître après la première configuration. Soyez patient ! 🚀
