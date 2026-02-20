'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';
import type { Locale } from '@/i18n/index';

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = ((params?.locale as string) ?? 'fr') as Locale;

  function switchLocale(newLocale: Locale) {
    if (newLocale === currentLocale) return;

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Build new path: strip current locale prefix if present, then add new one
    let cleanPath = pathname;
    if (cleanPath.startsWith('/fr/') || cleanPath === '/fr') {
      cleanPath = cleanPath.slice(3) || '/';
    } else if (cleanPath.startsWith('/en/') || cleanPath === '/en') {
      cleanPath = cleanPath.slice(3) || '/';
    }

    if (newLocale === 'fr') {
      // French: redirect to clean path (middleware will rewrite to /fr/)
      router.push(cleanPath);
    } else {
      // English: redirect to /en/path
      router.push(`/en${cleanPath === '/' ? '' : cleanPath}`);
    }
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md p-1">
      <button
        onClick={() => switchLocale('fr')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          currentLocale === 'fr'
            ? 'bg-white/20 text-white'
            : 'text-white/60 hover:text-white'
        }`}
        title="Français"
        aria-label="Passer en français"
      >
        FR
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          currentLocale === 'en'
            ? 'bg-white/20 text-white'
            : 'text-white/60 hover:text-white'
        }`}
        title="English"
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
