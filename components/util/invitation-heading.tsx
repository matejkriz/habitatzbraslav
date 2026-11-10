import React from "react";

type InvitationHeadingProps = {
  eyebrow: string;
  emphasis: string;
  text: string;
};

export const InvitationHeading = ({
  eyebrow,
  emphasis,
  text,
}: InvitationHeadingProps) => (
  <div className="not-prose my-10 text-center sm:my-12">
    <p className="mb-4 font-montserrat text-sm font-bold uppercase leading-relaxed tracking-[0.08em] text-[#A74324] sm:text-base">
      {eyebrow}
    </p>
    <h2 className="m-0 font-truculenta font-bold text-green-900">
      <span className="block text-[clamp(2.75rem,7vw,4.25rem)] leading-[1.05]">
        {emphasis}
      </span>{" "}
      <span className="mx-auto mt-3 block max-w-[23ch] text-2xl leading-[1.2] sm:text-4xl">
        {text}
      </span>
    </h2>
    <span
      aria-hidden="true"
      className="mx-auto mt-7 block h-1 w-16 rounded-full bg-[#E48B64]"
    />
  </div>
);
