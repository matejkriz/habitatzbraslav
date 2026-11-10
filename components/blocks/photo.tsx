import React from "react";
import Image from "next/image";
import type { TinaTemplate } from "tinacms";

export const Photo = ({
  data,
  parentField,
}: {
  data: { src?: string; alt?: string };
  parentField: string;
}) => {
  if (!data.src) return null;

  return (
    <div
      className="relative aspect-[3/1] w-full md:aspect-[4/1]"
      data-tinafield={`${parentField}.src`}
    >
      <Image
        src={data.src}
        alt={data.alt ?? ""}
        fill
        sizes="100vw"
        className="object-cover object-[50%_65%]"
      />
    </div>
  );
};

export const photoBlockSchema: TinaTemplate = {
  name: "photo",
  label: "Fotografie",
  fields: [
    { name: "src", label: "Fotografie", type: "image", required: true },
    { name: "alt", label: "Popis fotografie", type: "string", required: true },
  ],
};
