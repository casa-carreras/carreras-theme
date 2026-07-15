import { useRouter } from 'next/router';

import es from '@/locales/es.json';
import en from '@/locales/en.json';
import pt from '@/locales/pt.json';
import it from '@/locales/it.json';

export const SUPPORTED_LOCALES = ['es', 'en', 'pt', 'it'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  it: 'Italiano',
};

const dictionaries: Record<SupportedLocale, typeof es> = { es, en, pt, it };

const getNested = (obj: object, path: string): string | undefined =>
  path
    .split('.')
    .reduce<unknown>(
      (value, key) =>
        typeof value === 'object' && value !== null
          ? (value as Record<string, unknown>)[key]
          : undefined,
      obj,
    ) as string | undefined;

/**
 * Minimal i18n hook backed by the JSON dictionaries in src/locales.
 * Reads the active locale from Next.js's built-in i18n routing
 * (next.config.ts), so /en/produkter, /pt/produkter etc. just work.
 */
export const useTranslation = () => {
  const { locale } = useRouter();
  const activeLocale = (locale as SupportedLocale) || 'es';
  const dictionary = dictionaries[activeLocale] || dictionaries.es;

  const t = (key: string): string =>
    getNested(dictionary, key) ?? getNested(dictionaries.es, key) ?? key;

  return { t, locale: activeLocale };
};
