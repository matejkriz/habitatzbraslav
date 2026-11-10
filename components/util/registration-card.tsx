import React from "react";

type RegistrationCardProps = {
  title: string;
  text: string;
  label: string;
  link: string;
};

export const RegistrationCard = ({
  title,
  text,
  label,
  link,
}: RegistrationCardProps) => (
  <div className="not-prose my-10 rounded-[1.5rem] border-2 border-[#E8CF6B] bg-[#FFF7DA] px-5 py-7 text-green-900 shadow-[0_5px_0_0_#F8E8AA] sm:px-9 sm:py-9">
    <span
      aria-hidden="true"
      className="mb-5 block h-1 w-12 rounded-full bg-[#D2603C]"
    />
    <h2 className="m-0 font-truculenta text-3xl font-bold leading-tight sm:text-4xl">
      {title}
    </h2>
    <p className="mb-6 mt-3 max-w-[55ch] font-montserrat text-base leading-7">
      {text}
    </p>
    <a
      href={link}
      className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-lg bg-green-800 px-4 py-3 text-center font-truculenta text-xl font-bold leading-tight text-white transition-colors hover:bg-green-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 sm:w-auto sm:px-7"
    >
      <span>{label}</span>
      <span aria-hidden="true" className="hidden shrink-0 sm:inline">
        →
      </span>
    </a>
  </div>
);
