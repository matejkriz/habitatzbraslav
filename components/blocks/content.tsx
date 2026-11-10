import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { Button } from "../util/button";
import { Title } from "../util/title";
import { List } from "../util/list";
import { CustomColorPickerInput } from "../fields/customColor";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { InvitationHeading } from "../util/invitation-heading";
import { RegistrationCard } from "../util/registration-card";

const contentComponents = {
  Title,
  List,
  Button,
  InvitationHeading,
  RegistrationCard,
};

export const Content = ({ data, parentField = "" }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg`}
        data-tinafield={`${parentField}.body`}
        size="medium"
        width="custom"
      >
        <TinaMarkdown content={data.body} components={contentComponents} />
      </Container>
    </Section>
  );
};

export const contentBlockSchema: TinaTemplate = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: [
        {
          name: "InvitationHeading",
          label: "Nadpis pozvánky",
          fields: [
            { name: "eyebrow", label: "Úvod nadpisu", type: "string" },
            { name: "emphasis", label: "Zvýrazněný text", type: "string" },
            { name: "text", label: "Pokračování nadpisu", type: "string" },
          ],
        },
        {
          name: "RegistrationCard",
          label: "Přihlašovací karta",
          fields: [
            { name: "title", label: "Nadpis", type: "string" },
            { name: "text", label: "Text", type: "string" },
            { name: "label", label: "Text odkazu", type: "string" },
            { name: "link", label: "Odkaz na formulář", type: "string" },
          ],
        },
        {
          name: "Title",
          label: "Nadpis",
          fields: [
            {
              type: "object",
              label: "Image",
              name: "image",
              fields: [
                {
                  name: "src",
                  label: "Image Source",
                  type: "image",
                },
                {
                  name: "alt",
                  label: "Alt Text",
                  type: "string",
                },
              ],
            },
            {
              name: "title",
              label: "Nadpis",
              type: "string",
            },
          ],
        },
        {
          name: "List",
          label: "Seznam s barvou",
          fields: [
            {
              type: "string",
              label: "Primary Color",
              name: "color",
              ui: {
                // @ts-expect-error - wrong tina typing
                component: CustomColorPickerInput,
              },
            },
            {
              name: "children",
              label: "Seznam",
              type: "rich-text",
            },
          ],
        },
        {
          name: "Button",
          label: "Tlačítko",
          fields: [
            {
              type: "string",
              label: "Primary Color",
              name: "color",
              ui: {
                // @ts-expect-error - wrong tina typing
                component: CustomColorPickerInput,
              },
            },
            {
              name: "link",
              label: "Odkaz",
              type: "string",
            },
            {
              name: "label",
              label: "Label",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
