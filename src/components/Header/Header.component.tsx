import Head from 'next/head';

import Navbar from './Navbar.component';

const SITE_NAME = 'Bellas Artes Casa Carreras';
const DEFAULT_DESCRIPTION =
  'Bellas Artes Casa Carreras - Amor de Dios 27, Sevilla';

interface IHeaderProps {
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

/**
 * Renders header for each page, including SEO meta tags. Prefers Yoast SEO
 * data (seoTitle/seoDescription/ogImage) fetched from WordPress when a page
 * provides it; falls back to sensible site-wide defaults otherwise.
 * @function Header
 * @returns {JSX.Element} - Rendered component
 */

const Header = ({ title, seoTitle, seoDescription, ogImage }: IHeaderProps) => {
  const pageTitle = seoTitle || `${title} | ${SITE_NAME}`;
  const description = seoDescription || DEFAULT_DESCRIPTION;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} key="pagetitle" />
        <meta property="og:description" content={description} />
        {ogImage && <meta property="og:image" content={ogImage} />}
      </Head>
      <div className="container mx-auto px-6">
        <Navbar />
      </div>
    </>
  );
};

export default Header;
