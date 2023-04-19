import React from "react";
import { Section } from "../util/section";
import { Container } from "../util/container";
import type { TinaTemplate } from "tinacms";

export const Form = ({ data }) => {
  return (
    <Section color={data.color} className="relative w-full">
        <Container className={`relative w-full overflow-hidden pt-[100%]`} size="medium" width="custom">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScKQrKo56qbBHuZn9eHT_oO0FHFWcymcGX8raAc6L3NpuhnAA/viewform?embedded=true"
            className="absolute top-0 left-0 bottom-0 right-0 border-0 w-full h-full"
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
