// Imports
import { ReactNode } from 'react';

// Components
import Header from '@/components/Header/Header.component';
import PageTitle from './PageTitle.component';
import Footer from '@/components/Footer/Footer.component';
import Stickynav from '@/components/Footer/Stickynav.component';

interface ILayoutProps {
  children?: ReactNode;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

/**
 * Renders layout for each page. Also passes along the title to the Header component.
 * @function Layout
 * @param {ReactNode} children - Children to be rendered by Layout component
 * @param {TTitle} title - Title for the page. Is set in <title>{title}</title>
 * @param {string?} seoTitle - Yoast SEO title override, if fetched for this page
 * @param {string?} seoDescription - Yoast SEO meta description override
 * @param {string?} ogImage - Yoast SEO Open Graph image URL
 * @returns {JSX.Element} - Rendered component
 */

const Layout = ({
  children,
  title,
  seoTitle,
  seoDescription,
  ogImage,
}: ILayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full mx-auto bg-surface">
      <Header
        title={title}
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        ogImage={ogImage}
      />
      {title === 'Hjem' ? (
        <main className="flex-1 px-4 md:px-0">{children}</main>
      ) : (
        <div className="container mx-auto px-6 flex-1">
          <PageTitle title={title} />
          <main>{children}</main>
        </div>
      )}
      <div className="mt-auto">
        <Footer />
        <Stickynav />
      </div>
    </div>
  );
};

export default Layout;
