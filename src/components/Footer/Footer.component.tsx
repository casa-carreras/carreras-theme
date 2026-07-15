import Link from 'next/link';

import { useCookieConsentStore } from '@/stores/cookieConsentStore';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/UI/LanguageSwitcher.component';

import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
  XIcon,
} from './FooterIcons.component';

/**
 * Renders Footer of the application.
 * @function Footer
 * @returns {JSX.Element} - Rendered component
 */
const Footer = () => {
  const openPreferences = useCookieConsentStore(
    (state) => state.openPreferences,
  );
  const settings = useSiteSettings();
  const { t } = useTranslation();

  const socialLinks = [
    { label: 'Facebook', href: settings.facebookUrl, Icon: FacebookIcon },
    { label: 'Instagram', href: settings.instagramUrl, Icon: InstagramIcon },
    { label: 'X', href: settings.xUrl, Icon: XIcon },
    {
      label: 'WhatsApp',
      href: `https://wa.me/${settings.whatsapp}`,
      Icon: WhatsAppIcon,
    },
  ];

  return (
    <footer className="w-full bg-surface border-t border-border mt-12">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-bold text-text">Bellas Artes Casa Carreras</h2>
            <ul className="mt-4 space-y-2 text-text-muted">
              <li className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 shrink-0" />
                <span>{settings.direccion}</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 shrink-0" />
                <a href={`tel:+${settings.whatsapp}`} className="hover:underline">
                  {settings.telefono}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-5 w-5 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:underline">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 shrink-0" />
                <span>{settings.horario}</span>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-text">{t('footer.company')}</h2>
            <ul className="mt-4 space-y-2 text-text-muted">
              <li>
                <Link href="/contacto" className="hover:underline">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="hover:underline">
                  {t('footer.legalNotice')}
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="hover:underline">
                  {t('footer.cookiePolicy')}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openPreferences}
                  className="hover:underline"
                >
                  {t('footer.customizeCookies')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-text">{t('footer.account')}</h2>
            <ul className="mt-4 space-y-2 text-text-muted">
              <li>
                <Link href="/min-konto" className="hover:underline">
                  {t('footer.myAccount')}
                </Link>
              </li>
              <li>
                <Link href="/min-konto" className="hover:underline">
                  {t('footer.trackOrder')}
                </Link>
              </li>
              <li>
                <Link href="/handlekurv" className="hover:underline">
                  {t('footer.cart')}
                </Link>
              </li>
              <li>
                <Link href="/min-konto" className="hover:underline">
                  {t('footer.myOrders')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col-reverse items-center gap-4 px-6 py-4 md:flex-row md:justify-between">
          <div className="text-sm text-text-muted" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Bellas Artes Casa Carreras.{' '}
            {t('footer.rightsReserved')}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-text-muted hover:text-primary"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
