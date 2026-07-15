import Layout from '@/components/Layout/Layout.component';
import { useCookieConsentStore } from '@/stores/cookieConsentStore';

import type { NextPage } from 'next';

const PoliticaCookiesPage: NextPage = () => {
  const openPreferences = useCookieConsentStore(
    (state) => state.openPreferences,
  );

  return (
    <Layout title="Política de Cookies">
      <div className="container mx-auto max-w-3xl px-4 py-8 text-text">
        <p>
          Esta página explica qué cookies utiliza la web de Bellas Artes Casa
          Carreras y para qué se usan.
        </p>

        <h2 className="mt-6 text-xl font-bold">¿Qué son las cookies?</h2>
        <p className="mt-2 text-text-muted">
          Las cookies son pequeños archivos que se almacenan en tu navegador
          al visitar una web. Sirven para recordar tus preferencias, mantener
          tu sesión iniciada y, si lo permites, entender cómo se usa la
          tienda.
        </p>

        <h2 className="mt-6 text-xl font-bold">Cookies que utilizamos</h2>
        <ul className="mt-2 list-disc space-y-2 pl-6 text-text-muted">
          <li>
            <strong>Necesarias:</strong> imprescindibles para el
            funcionamiento de la tienda (carrito de compra, inicio de sesión,
            seguridad). No requieren consentimiento y no se pueden desactivar.
          </li>
          <li>
            <strong>Analíticas:</strong> nos ayudan a medir el uso de la web
            para mejorarla. Solo se activan si das tu consentimiento.
          </li>
          <li>
            <strong>Marketing:</strong> usadas para mostrar publicidad
            relevante en otros sitios. Solo se activan si das tu
            consentimiento.
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-bold">Gestionar tu consentimiento</h2>
        <p className="mt-2 text-text-muted">
          Puedes cambiar tu elección en cualquier momento pulsando el
          siguiente botón, o desde el enlace &quot;Personalizar Cookies&quot;
          en el pie de página.
        </p>
        <button
          type="button"
          onClick={openPreferences}
          className="mt-4 rounded-md border border-primary bg-primary px-4 py-2 font-bold text-white transition-all duration-200 hover:bg-primary-dark active:scale-[0.98]"
        >
          Personalizar Cookies
        </button>
      </div>
    </Layout>
  );
};

export default PoliticaCookiesPage;
