import { useQuery } from '@apollo/client';

import { GET_SITE_SETTINGS_QUERY } from '@/utils/gql/GQL_QUERIES';

export interface SiteSettings {
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
  whatsapp: string;
  facebookUrl: string;
  instagramUrl: string;
  xUrl: string;
  heroImagenUrl: string | null;
  heroTitulo: string | null;
  heroBotonTexto: string | null;
  heroBotonUrl: string | null;
}

// Used until the "Ajustes del sitio" ACF options page exists in WordPress
// (setup steps in wordpress/README.md), and as a safety net if that query
// ever fails.
const DEFAULT_SITE_SETTINGS: SiteSettings = {
  direccion: 'Amor de Dios 27 Sevilla',
  telefono: '954386554',
  email: 'info@casa-carreras.es',
  horario: '9 a.m.–1:30 p.m. 4:30–8 p.m.',
  whatsapp: '34954386554',
  facebookUrl: '#',
  instagramUrl: '#',
  xUrl: '#',
  heroImagenUrl: null,
  heroTitulo: null,
  heroBotonTexto: null,
  heroBotonUrl: null,
};

/**
 * Reads site-wide settings (contact info, hours, hero banner) from the
 * WordPress ACF options page. Falls back to DEFAULT_SITE_SETTINGS while
 * loading, on error, or before that ACF field group has been created.
 */
export const useSiteSettings = (): SiteSettings => {
  const { data } = useQuery(GET_SITE_SETTINGS_QUERY, {
    errorPolicy: 'ignore',
  });

  const settings = data?.ajustesSitio;
  if (!settings) return DEFAULT_SITE_SETTINGS;

  return {
    direccion: settings.direccion || DEFAULT_SITE_SETTINGS.direccion,
    telefono: settings.telefono || DEFAULT_SITE_SETTINGS.telefono,
    email: settings.email || DEFAULT_SITE_SETTINGS.email,
    horario: settings.horario || DEFAULT_SITE_SETTINGS.horario,
    whatsapp: settings.whatsapp || DEFAULT_SITE_SETTINGS.whatsapp,
    facebookUrl: settings.facebookUrl || DEFAULT_SITE_SETTINGS.facebookUrl,
    instagramUrl: settings.instagramUrl || DEFAULT_SITE_SETTINGS.instagramUrl,
    xUrl: settings.xUrl || DEFAULT_SITE_SETTINGS.xUrl,
    heroImagenUrl: settings.heroImagen?.sourceUrl || null,
    heroTitulo: settings.heroTitulo || null,
    heroBotonTexto: settings.heroBotonTexto || null,
    heroBotonUrl: settings.heroBotonUrl || null,
  };
};
