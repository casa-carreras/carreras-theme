import Link from 'next/link';
import Image from 'next/image';
import { trimmedStringToLength } from '@/utils/functions/functions';

import type { ProductSearchHit } from '@/hooks/useProductSearch';

interface ISearchResultProps {
  hit: ProductSearchHit;
}

/**
 * Displays a single native product search result
 */
const SearchResults = ({
  hit: { image, name, regularPrice, salePrice, onSale, shortDescription, slug },
}: ISearchResultProps) => {
  return (
    <article className="cursor-pointer hit">
      <Link href={`/produkt/${slug}`}>
        <div className="flex p-6 bg-surface">
          <header className="hit-image-container relative w-12 h-12">
            {image?.sourceUrl && (
              <Image
                src={image.sourceUrl}
                alt={name}
                fill
                sizes="48px"
                className="hit-image object-cover"
              />
            )}
          </header>
          <div className="pl-4 text-left">
            {name && <span className="text-lg font-bold">{name}</span>}
            <br />
            {onSale ? (
              <>
                <span className="text-base font-bold text-error">
                  kr {salePrice}
                </span>
                <span className="ml-2 text-base text-text-light line-through">
                  kr {regularPrice}
                </span>
              </>
            ) : (
              <span className="text-base">kr {regularPrice}</span>
            )}
            <br />
            <span className="text-base">
              {trimmedStringToLength(shortDescription ?? '', 30)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SearchResults;
