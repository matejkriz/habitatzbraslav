import type { GetStaticPaths, GetStaticProps } from "next";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { client } from "../tina/__generated__/client";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Layout data={data.global as any}>
      <Blocks {...data.page} />
    </Layout>
  );
}

export const getStaticProps = (async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params?.filename as string}.mdx`,
  });
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
}) satisfies GetStaticProps;

export const getStaticPaths = (async () => {
  const pagesListData = await client.queries.pageConnection();
  const edges = pagesListData.data.pageConnection.edges ?? [];
  return {
    paths: edges.flatMap((page) => {
      const node = page?.node;
      if (!node) return [];
      return [{ params: { filename: node._sys.filename } }];
    }),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export type AsyncReturnType<T extends (...args: never[]) => Promise<unknown>> =
  T extends (...args: never[]) => Promise<infer R> ? R : unknown;
