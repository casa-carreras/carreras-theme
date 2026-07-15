import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

import Layout from '@/components/Layout/Layout.component';
import client from '@/utils/apollo/ApolloClient';
import { FETCH_ALL_POSTS_QUERY } from '@/utils/gql/GQL_QUERIES';

import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

interface IPostSummary {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage: { node: { sourceUrl: string } } | null;
}

const BlogIndex: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Blog">
    <div className="container mx-auto px-4 py-8">
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: IPostSummary) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface">
                <div className="relative h-48 w-full bg-surface-alt">
                  {post.featuredImage?.node.sourceUrl && (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <time
                    dateTime={post.date}
                    className="text-sm text-text-light"
                    suppressHydrationWarning
                  >
                    {new Date(post.date).toLocaleDateString('es-ES')}
                  </time>
                  <h2 className="mt-1 text-lg font-bold text-text">
                    {post.title}
                  </h2>
                  <div
                    className="mt-2 text-sm text-text-muted [&_p]:line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.excerpt),
                    }}
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-text-muted">Todavía no hay artículos publicados.</p>
      )}
    </div>
  </Layout>
);

export default BlogIndex;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: FETCH_ALL_POSTS_QUERY,
    errorPolicy: 'ignore',
  });

  return {
    props: {
      posts: data?.posts?.nodes || [],
    },
    revalidate: 60,
  };
};
