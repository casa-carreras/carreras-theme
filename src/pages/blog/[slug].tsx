import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

import Layout from '@/components/Layout/Layout.component';
import client from '@/utils/apollo/ApolloClient';
import {
  FETCH_ALL_POSTS_QUERY,
  GET_SINGLE_POST_QUERY,
} from '@/utils/gql/GQL_QUERIES';

import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';

const BlogPost: NextPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) return null;

  return (
    <Layout
      title={post.title}
      seoTitle={post.seo?.title}
      seoDescription={post.seo?.metaDesc}
      ogImage={post.seo?.opengraphImage?.sourceUrl}
    >
      <article className="container mx-auto max-w-3xl px-4 py-8">
        {post.featuredImage?.node.sourceUrl && (
          <div className="relative mb-6 h-64 w-full sm:h-96">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="rounded-md object-cover"
              priority
            />
          </div>
        )}
        <time
          dateTime={post.date}
          className="text-sm text-text-light"
          suppressHydrationWarning
        >
          {new Date(post.date).toLocaleDateString('es-ES')}
        </time>
        <h1 className="mt-1 text-3xl font-light text-text">{post.title}</h1>
        <div
          className="mt-6 text-text [&_h5]:mt-6 [&_h5]:text-xl [&_h5]:font-bold [&_p]:mt-4 [&_p]:text-text-muted"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        />
      </article>
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: FETCH_ALL_POSTS_QUERY,
    errorPolicy: 'ignore',
  });

  const paths = (data?.posts?.nodes || []).map((post: { slug: string }) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await client.query({
    query: GET_SINGLE_POST_QUERY,
    variables: { uri: `/${params?.slug}/` },
    errorPolicy: 'ignore',
  });

  if (!data?.post) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: { post: data.post },
    revalidate: 60,
  };
};
