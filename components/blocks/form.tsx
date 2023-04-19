import React from "react";
import { Section } from "../util/section";
import { Container } from "../util/container";
import type { TinaTemplate } from "tinacms";

export const Form = ({ data }) => {
  return (
    <Section color={data.color} className="relative w-full">
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
  );
};

export const formBlockSchema: TinaTemplate = {
  name: "form",
  label: "Form",
  ui: {
    previewSrc: "/blocks/form.png",
  },
  fields: [
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
