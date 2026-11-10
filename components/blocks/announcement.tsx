import React from "react";
import Link from "next/link";
import type { TinaTemplate } from "tinacms";
import type { PageBlocksAnnouncement } from "../../.tina/__generated__/types";
import { Container } from "../util/container";

export const Announcement = ({
  data,
  parentField,
}: {
  data: PageBlocksAnnouncement;
  parentField: string;
}) => {
  const isCard = data.variant === "card";

  return (
    <section className={isCard ? "bg-white" : "bg-yellow-50"}>
      <Container size="custom" className={isCard ? "py-8" : "py-5"}>
        <div
          className={`flex flex-col items-start justify-between gap-5 text-green-900 md:flex-row md:items-center ${
            isCard
              ? "rounded-2xl border border-[#BAC58F] bg-yellow-50 p-6 sm:p-8"
              : ""
          }`}
        >
          <div>
            <h2
              className="font-truculenta text-2xl font-bold sm:text-3xl"
              data-tinafield={`${parentField}.headline`}
            >
              {data.headline}
            </h2>
            <p
              className="mt-1 text-base font-semibold"
              data-tinafield={`${parentField}.details`}
            >
              {data.details}
            </p>
          </div>
          <Link
            href={data.link}
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-green-800 px-6 py-3 text-center font-truculenta text-xl font-bold text-white transition-colors hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800"
            data-tinafield={`${parentField}.label`}
          >
            {data.label}
          </Link>
        </div>
      </Container>
    </section>
  );
};

export const announcementBlockSchema: TinaTemplate = {
  name: "announcement",
  label: "Oznámení",
  fields: [
    {
      type: "string",
      name: "variant",
      label: "Vzhled",
      options: [
        { label: "Banner", value: "banner" },
        { label: "Karta", value: "card" },
      ],
    },
    {
      type: "string",
      name: "headline",
      label: "Nadpis",
    },
    {
      type: "string",
      name: "details",
      label: "Podrobnosti",
      required: true,
    },
    {
      type: "string",
      name: "link",
      label: "Odkaz",
      required: true,
    },
    {
      type: "string",
      name: "label",
      label: "Text odkazu",
      required: true,
    },
  ],
};
