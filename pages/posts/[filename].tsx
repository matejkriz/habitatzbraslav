import type { GetStaticPaths, GetStaticProps } from "next";
import { Post } from "../../components/posts/post";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.post) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Layout data={data.global as any}>
        <Post {...data.post} />
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
}

export const getStaticProps = (async ({ params }) => {
  const tinaProps = await client.queries.blogPostQuery({
    relativePath: `${params?.filename as string}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
}) satisfies GetStaticProps;

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = (async () => {
  const postsListData = await client.queries.postConnection();
  const edges = postsListData.data.postConnection.edges ?? [];
  return {
    paths: edges.flatMap((post) => {
      const node = post?.node;
      if (!node) return [];
      if (node._sys.breadcrumbs.length !== 1) return [];
      return [{ params: { filename: node._sys.filename } }];
    }),
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export type AsyncReturnType<T extends (...args: never[]) => Promise<unknown>> =
  T extends (...args: never[]) => Promise<infer R> ? R : unknown;
