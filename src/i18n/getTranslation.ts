import { fr } from './locales/fr';
import { en } from './locales/en';
import type { Locale } from './index';

const translations = { fr, en } as const;

export function getTranslation(locale: string) {
  return translations[(locale as Locale)] ?? fr;
}
