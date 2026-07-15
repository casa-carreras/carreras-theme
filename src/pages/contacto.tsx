import Layout from '@/components/Layout/Layout.component';
import { useSiteSettings } from '@/hooks/useSiteSettings';

import type { NextPage } from 'next';

const ContactoPage: NextPage = () => {
  const settings = useSiteSettings();

  return (
    <Layout title="Contacto">
      <div className="container mx-auto max-w-3xl px-4 py-8 text-text">
        <ul className="space-y-3 text-text-muted">
          <li>
            <strong className="text-text">Dirección:</strong>{' '}
            {settings.direccion}
          </li>
          <li>
            <strong className="text-text">Teléfono:</strong>{' '}
            <a href={`tel:+${settings.whatsapp}`} className="hover:underline">
              {settings.telefono}
            </a>
          </li>
          <li>
            <strong className="text-text">Email:</strong>{' '}
            <a href={`mailto:${settings.email}`} className="hover:underline">
              {settings.email}
            </a>
          </li>
          <li>
            <strong className="text-text">Horario:</strong> {settings.horario}
          </li>
          <li>
            <strong className="text-text">WhatsApp:</strong>{' '}
            <a
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Escríbenos
            </a>
          </li>
        </ul>
      </div>
    </Layout>
  );
};

export default ContactoPage;
