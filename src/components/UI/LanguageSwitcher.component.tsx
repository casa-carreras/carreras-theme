import { useRouter } from 'next/router';

import {
  LOCALE_LABELS,
  SUPPORTED_LOCALES,
  useTranslation,
} from '@/hooks/useTranslation';

/**
 * Lets the visitor switch language without losing their place on the site.
 * Locales are routed by Next.js's built-in i18n config (next.config.ts).
 */
const LanguageSwitcher = () => {
  const router = useRouter();
  const { t, locale } = useTranslation();

  return (
    <label className="inline-flex items-center gap-2 text-sm text-text-muted">
      <span className="sr-only">{t('common.language')}</span>
      <select
        value={locale}
        onChange={(e) =>
          router.push(router.asPath, router.asPath, {
            locale: e.target.value,
          })
        }
        className="rounded-md border border-border bg-surface px-2 py-1 text-text"
      >
        {SUPPORTED_LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSwitcher;
