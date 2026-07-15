import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { SEARCH_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';

const DEBOUNCE_MS = 300;

export interface ProductSearchHit {
  databaseId: number;
  name: string;
  slug: string;
  shortDescription: string;
  image: { sourceUrl: string } | null;
  price: string | null;
  regularPrice: string | null;
  salePrice: string | null;
  onSale: boolean | null;
}

/**
 * Debounced native product search backed by WooGraphQL's built-in search
 * (WordPress/WooCommerce), replacing the previous Algolia integration.
 */
export const useProductSearch = () => {
  const [query, setQuery] = useState('');
  const [search, { data, loading }] = useLazyQuery(SEARCH_PRODUCTS_QUERY);

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(() => {
      search({ variables: { search: query } });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [query, search]);

  const hits: ProductSearchHit[] = query ? (data?.products?.nodes ?? []) : [];

  return { query, setQuery, hits, loading };
};
