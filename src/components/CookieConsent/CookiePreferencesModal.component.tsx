import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/UI/Button.component';
import { useCookieConsentStore } from '@/stores/cookieConsentStore';

interface IToggleRowProps {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleRow = ({
  title,
  description,
  checked,
  disabled,
  onChange,
}: IToggleRowProps) => (
  <div className="flex items-start justify-between gap-4 border-b border-border py-4 last:border-b-0">
    <div>
      <p className="font-bold text-text">{title}</p>
      <p className="text-sm text-text-muted">{description}</p>
    </div>
    <label className="relative inline-flex shrink-0 cursor-pointer items-center">
      <input
        type="checkbox"
        aria-label={title}
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <div className="h-6 w-11 rounded-full bg-border transition-colors peer-checked:bg-primary peer-disabled:opacity-50 peer-focus-visible:ring-2 peer-focus-visible:ring-primary" />
      <div className="absolute left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
    </label>
  </div>
);

/**
 * Granular cookie preference center. Lets the visitor toggle analytics and
 * marketing cookies independently; necessary cookies are always on.
 */
const CookiePreferencesModal = () => {
  const { isPreferencesOpen, categories, closePreferences, savePreferences } =
    useCookieConsentStore();
  const [analytics, setAnalytics] = useState(categories.analytics);
  const [marketing, setMarketing] = useState(categories.marketing);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isPreferencesOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isPreferencesOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => closePreferences();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [closePreferences]);

  const handleSave = () => {
    savePreferences({ analytics, marketing });
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Personalizar cookies"
      className="fixed inset-0 z-[70] m-auto max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border-0 bg-surface p-6 text-inherit shadow-lg backdrop:bg-overlay/50"
    >
      <div>
        <h2 className="text-2xl font-light text-text">Personalizar Cookies</h2>
        <p className="mt-2 text-sm text-text-muted">
          Elige qué tipo de cookies quieres permitir. Puedes cambiar esta
          elección en cualquier momento desde el enlace &quot;Personalizar
          Cookies&quot; en el pie de página. Consulta la{' '}
          <Link href="/politica-cookies" className="underline">
            Política de Cookies
          </Link>{' '}
          para más detalle.
        </p>

        <div className="mt-4">
          <ToggleRow
            title="Necesarias"
            description="Imprescindibles para el funcionamiento de la web (carrito, sesión, seguridad). No se pueden desactivar."
            checked
            disabled
          />
          <ToggleRow
            title="Analíticas"
            description="Nos ayudan a entender cómo se usa la tienda para mejorarla."
            checked={analytics}
            onChange={setAnalytics}
          />
          <ToggleRow
            title="Marketing"
            description="Usadas para mostrar publicidad relevante en otros sitios."
            checked={marketing}
            onChange={setMarketing}
          />
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <Button variant="reset" handleButtonClick={closePreferences}>
            Cancelar
          </Button>
          <Button variant="primary" handleButtonClick={handleSave}>
            Guardar preferencias
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export default CookiePreferencesModal;
