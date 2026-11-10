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
    <p className="mb-4 font-montserrat text-sm font-bold uppercase leading-relaxed tracking-[0.1em] text-orange-700">
      {eyebrow}
    </p>
    <h2 className="m-0 font-truculenta font-bold text-green-900">
      <span className="block text-4xl leading-[1.05] sm:text-6xl">
        {emphasis}
      </span>{" "}
      <span className="mx-auto mt-4 block max-w-[25ch] text-2xl leading-[1.2] sm:text-3xl">
        {text}
      </span>
    </h2>
  </div>
);
