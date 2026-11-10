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
  <div className="not-prose my-10 text-left text-green-900 sm:my-12">
    <p className="mb-4 font-montserrat text-xs font-semibold uppercase leading-relaxed tracking-[0.12em] text-green-800 sm:text-sm">
      {eyebrow}
    </p>
    <h2 className="m-0 font-truculenta">
      <span className="block text-[2.75rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        {emphasis}
      </span>{" "}
      <span className="mt-3 block max-w-[26ch] text-2xl font-medium leading-[1.2] sm:text-4xl">
        {text}
      </span>
    </h2>
  </div>
);
