import Layout from '@/components/Layout/Layout.component';
import client from '@/utils/apollo/ApolloClient';
import { FETCH_PAGE_BY_SLUG_QUERY } from '@/utils/gql/GQL_QUERIES';

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

// NOTE: fallback legal text — used until a WordPress Page with the slug
// "aviso-legal" exists. Once you create that page in wp-admin, its content
// takes over automatically. Placeholder data (NIF/CIF) still needs updating
// either here or in the WordPress page.
const FALLBACK_CONTENT = `
  <h2>Datos identificativos</h2>
  <p>
    Titular: Bellas Artes Casa Carreras<br />
    Domicilio: Amor de Dios 27, Sevilla<br />
    Teléfono: 954386554<br />
    Email: info@casa-carreras.es<br />
    NIF/CIF: [pendiente de completar]
  </p>
  <h2>Objeto</h2>
  <p>
    Este aviso legal regula el uso del sitio web de Bellas Artes Casa
    Carreras. El acceso y uso de la web atribuye la condición de usuario y
    supone la aceptación de las condiciones aquí recogidas.
  </p>
  <h2>Propiedad intelectual</h2>
  <p>
    Los contenidos, textos, imágenes y diseño de esta web son propiedad de
    Bellas Artes Casa Carreras o de terceros que han autorizado su uso,
    quedando prohibida su reproducción sin autorización expresa.
  </p>
  <h2>Protección de datos</h2>
  <p>
    El tratamiento de los datos personales facilitados a través de esta web
    se realiza conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica
    3/2018 de Protección de Datos Personales y garantía de los derechos
    digitales.
  </p>
`;

const AvisoLegalPage: NextPage = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Aviso Legal">
    <div
      className="container mx-auto max-w-3xl space-y-4 px-4 py-8 text-text [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_p]:text-text-muted"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </Layout>
);

export default AvisoLegalPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: FETCH_PAGE_BY_SLUG_QUERY,
    variables: { slug: 'aviso-legal' },
    errorPolicy: 'ignore',
  });

  return {
    props: {
      content: data?.page?.content || FALLBACK_CONTENT,
    },
    revalidate: 60,
  };
};
