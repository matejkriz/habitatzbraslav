import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { client } from "../.tina/__generated__/client";

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
      <Section>
        <Container className={`prose prose-lg overflow-y-auto`} size="medium" width="custom">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScKQrKo56qbBHuZn9eHT_oO0FHFWcymcGX8raAc6L3NpuhnAA/viewform?embedded=true"
            width="640"
            height="2350"
            className="border-0 margin-0"
          >
            Načítání…
          </iframe>
        </Container>
      </Section>
      <Blocks {...data.page} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `form.mdx`,
  });
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export type AsyncReturnType<T extends (...args) => Promise<unknown>> =
  T extends (...args) => Promise<infer R> ? R : unknown;
