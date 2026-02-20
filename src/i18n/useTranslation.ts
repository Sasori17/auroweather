'use client';

import { useParams } from 'next/navigation';
import { fr } from './locales/fr';
import { en } from './locales/en';
import type { Locale } from './index';

const translations = { fr, en } as const;

export function useTranslation() {
  const params = useParams();
  const locale = ((params?.locale as string) ?? 'fr') as Locale;
  const t = translations[locale] ?? fr;
  return { t, locale };
}
