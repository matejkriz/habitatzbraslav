import type { Collection } from 'tinacms';
import { heroBlockSchema } from '@/components/blocks/hero';
import { contentBlockSchema } from '@/components/blocks/content';
import { testimonialBlockSchema } from '@/components/blocks/testimonial';
import { featureBlockSchema } from '@/components/blocks/features';
import { introBlockSchema } from '@/components/blocks/intro';
import { formBlockSchema } from '@/components/blocks/form';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }: { document: { _sys: { filename: string } } }) => {
      if (document._sys.filename === 'home') {
        return '/';
      }
      if (document._sys.filename === 'about') {
        return '/about';
      }
      return undefined;
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      description: 'The title of the page. This is used to display the title in the CMS',
      isTitle: true,
      required: true,
    },
    {
      type: 'object',
      list: true,
      name: 'blocks',
      label: 'Sections',
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        featureBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        introBlockSchema,
        formBlockSchema,
      ],
    },
  ],
} as any;

export default Page;
