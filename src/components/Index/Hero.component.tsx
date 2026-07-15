import Image from 'next/image';
import Button from '../UI/Button.component';
import { useSiteSettings } from '@/hooks/useSiteSettings';

/**
 * Renders Hero section for Index page. Image, title and button are editable
 * from the WordPress "Ajustes del sitio" ACF options page; falls back to the
 * defaults below until that field group is configured.
 * @function Hero
 * @returns {JSX.Element} - Rendered component
 */
const Hero = () => {
  const settings = useSiteSettings();

  const imageSrc = settings.heroImagenUrl || '/images/hero.jpg';
  const title = settings.heroTitulo || 'Stripete Zig Zag Pute Sett';
  const buttonText = settings.heroBotonTexto || 'Se Utvalget';
  const buttonHref = settings.heroBotonUrl || '/produkter';

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-overlay bg-opacity-30" />
      </div>

      <div className="relative h-full container mx-auto flex items-center p-4 md:p-0">
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
            {title}
          </h1>
          <Button href={buttonHref} variant="hero">
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
