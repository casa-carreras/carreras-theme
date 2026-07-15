import Link from 'next/link';
import Cart from './Cart.component';
import SearchBox from '../ProductSearch/SearchBox.component';
import MobileSearch from '../ProductSearch/MobileSearch.component';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navbar = () => {
  return (
    <header className="border-b border-border">
      <nav id="header" className="top-0 z-50 w-full bg-surface">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-4 md:hidden">
            <div className="text-center">
              <Link href="/">
                <span className="text-lg font-bold tracking-widest text-text">
                  NETTBUTIKK
                </span>
              </Link>
            </div>
            <div className="w-full">
              <MobileSearch />
            </div>
          </div>
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/produkter">
                <span className="text-base uppercase tracking-wider group relative">
                  <span className="relative inline-block">
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500"></span>
                    Produkter
                  </span>
                </span>
              </Link>
              <Link href="/kategorier">
                <span className="text-base uppercase tracking-wider group relative">
                  <span className="relative inline-block">
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500"></span>
                    Kategorier
                  </span>
                </span>
              </Link>
              <Link href="/blog">
                <span className="text-base uppercase tracking-wider group relative">
                  <span className="relative inline-block">
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500"></span>
                    Blog
                  </span>
                </span>
              </Link>
            </div>
            <Link href="/" className="hidden lg:block">
              <span className="text-xl font-bold tracking-widest text-text hover:text-primary transition-colors duration-200">
                NETTBUTIKK
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <SearchBox />
              <Link href="/min-konto" aria-label="Mi cuenta">
                <svg
                  className="block fill-text"
                  xmlns="https://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 2.239-7 5v1c0 .552.448 1 1 1h12c.552 0 1-.448 1-1v-1c0-2.761-3.134-5-7-5z" />
                </svg>
              </Link>
              <Cart />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
