import Link from 'next/link';

import Button from '@/components/UI/Button.component';
import { useCookieConsentStore } from '@/stores/cookieConsentStore';

/**
 * GDPR-style cookie banner. Hidden once the visitor has made a decision
 * (accept all / reject all / saved custom preferences).
 */
const CookieBanner = () => {
  const { hasDecided, acceptAll, rejectAll, openPreferences } =
    useCookieConsentStore();

  if (hasDecided) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-surface shadow-lg"
    >
      <div className="container mx-auto flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-text-muted">
          Utilizamos cookies propias y de terceros para el funcionamiento de
          la web y, si nos das tu consentimiento, para analítica y
          marketing. Puedes aceptar todas, rechazarlas o personalizar tu
          elección. Más información en nuestra{' '}
          <Link href="/politica-cookies" className="underline">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="reset" handleButtonClick={openPreferences}>
            Personalizar
          </Button>
          <Button variant="secondary" handleButtonClick={rejectAll}>
            Rechazar todas
          </Button>
          <Button variant="primary" handleButtonClick={acceptAll}>
            Aceptar todas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
