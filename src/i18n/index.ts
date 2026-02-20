import { fr } from './locales/fr';
import { en } from './locales/en';

export type Locale = 'fr' | 'en';
export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';

export type Translations = typeof fr;

export { fr, en };
