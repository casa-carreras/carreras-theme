import { useProductSearch } from '@/hooks/useProductSearch';
import { useTranslation } from '@/hooks/useTranslation';
import SearchResults from './SearchResults.component';

/**
 * Native product search (WooGraphQL) for the mobile menu.
 */
const MobileSearch = () => {
  const { query, setQuery, hits } = useProductSearch();
  const { t } = useTranslation();

  return (
    <div className="inline mt-4 md:hidden">
      <input
        type="search"
        aria-label={t('nav.search')}
        placeholder={t('nav.searchPlaceholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 text-base bg-surface border border-border outline-none rounded-md transition-colors duration-200 focus:border-primary"
      />
      {query &&
        hits.map((hit) => <SearchResults key={hit.databaseId} hit={hit} />)}
    </div>
  );
};

export default MobileSearch;
