import Layout from '@/components/Layout/Layout.component';
import ProductList from '@/components/Product/ProductList.component';
import client from '@/utils/apollo/ApolloClient';
import { FETCH_ALL_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

const Produkter: NextPage = ({
  products,
  loading,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (loading)
    return (
      <Layout title="Productos">
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full size-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );

  if (!products)
    return (
      <Layout title="Productos">
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-error">No se han encontrado productos</p>
        </div>
      </Layout>
    );

  return (
    <Layout title="Productos">
      <div className="container mx-auto px-4 py-8">
        <ProductList products={products} title="Productos" />
      </div>
    </Layout>
  );
};

export default Produkter;

export const getStaticProps: GetStaticProps = async () => {
  const { data, loading, networkStatus } = await client.query({
    query: FETCH_ALL_PRODUCTS_QUERY,
  });

  return {
    props: {
      products: data.products.nodes,
      loading,
      networkStatus,
    },
    revalidate: 60,
  };
};
