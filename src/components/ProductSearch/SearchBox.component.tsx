import { useProductSearch } from '@/hooks/useProductSearch';
import { useTranslation } from '@/hooks/useTranslation';
import SearchResults from './SearchResults.component';

/**
 * Native product search box (WooGraphQL) for larger resolutions that do not
 * show the mobile menu.
 */
const SearchBox = () => {
  const { query, setQuery, hits } = useProductSearch();
  const { t } = useTranslation();

  return (
    <div className="hidden mb-0.5 md:inline-block xl:inline-block">
      <div className="relative w-72">
        <input
          type="search"
          aria-label={t('nav.search')}
          placeholder={t('nav.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 text-base bg-surface border border-border outline-none rounded-md transition-colors duration-200 focus:border-primary"
        />
        {query && hits.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 bg-surface shadow-lg rounded-md mt-1">
            {hits.map((hit) => (
              <SearchResults key={hit.databaseId} hit={hit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
