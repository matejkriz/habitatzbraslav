import React from "react";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import Link from "next/link";
import Image from "next/image";
import background from "../../public/images/background.webp";
import backgroundWide from "../../public/images/background-wide.webp";

export const Intro = ({ data }) => {
  return (
    <Section color={data.color} className="relative w-full">
      <Image
        className={`relative max-h-[65vh] w-full lg:hidden`}
        alt="Hravá dekorace"
        src={background}
        placeholder="blur"
        priority
      />
      <Image
        className={`relative max-h-[65vh] w-full hidden lg:block`}
        alt="Hravá dekorace"
        src={backgroundWide}
        placeholder="blur"
        priority
      />
      <Image
        className={`absolute top-0 bottom-0 left-0 right-0 m-auto h-full max-h-[40vh] w-full max-w-[50vw] lg:max-w-[38vw]`}
        alt="Habitat Zbraslav"
        src="/images/habitat-zbraslav.svg"
        width={374}
        height={136}
        priority
      />
      <div className="bg-orange-300 w-full opacity-90 absolute top-0">
        <div className="max-w-screen-xl mx-auto px-4 py-3 text-white sm:text-center md:px-8">
        <Link
              href="/schuzka"
              className="duration-150 hover:text-green-800"
            >
          <p className="text-lg">
            Zveme vás na setkání, které proběhne ve <span className="font-bold">čtvrtek 13. 4. od 17:30</span>!{' '}
            <span
              className="font-semibold underline inline-flex items-center gap-x-1"
            >Dozvědět se více 🕠📍 </span>
          </p>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export const introBlockSchema: TinaTemplate = {
  name: "intro",
  label: "Intro",
  ui: {
    previewSrc: "/blocks/intro.png",
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
