// Components
import Hero from '@/components/Index/Hero.component';
import DisplayProducts from '@/components/Product/DisplayProducts.component';
import GoogleReviews from '@/components/GoogleReviews/GoogleReviews.component';
import Layout from '@/components/Layout/Layout.component';

// Utilities
import client from '@/utils/apollo/ApolloClient';

// Types
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

// GraphQL
import { FETCH_ALL_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';
import { fetchGoogleReviews } from '@/utils/functions/googleReviews';

/**
 * Main index page
 * @function Index
 * @param {InferGetStaticPropsType<typeof getStaticProps>} products
 * @returns {JSX.Element} - Rendered component
 */

const Index: NextPage = ({
  products,
  googleReviews,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Hjem">
    <Hero />
    {products && <DisplayProducts products={products} />}
    <GoogleReviews data={googleReviews} />
  </Layout>
);

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const [{ data, loading, networkStatus }, googleReviews] = await Promise.all(
    [
      client.query({ query: FETCH_ALL_PRODUCTS_QUERY }),
      fetchGoogleReviews(),
    ],
  );

  return {
    props: {
      products: data.products.nodes,
      loading,
      networkStatus,
      googleReviews,
    },
    revalidate: 60,
  };
};
