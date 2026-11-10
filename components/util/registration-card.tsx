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
  <div className="not-prose my-10 rounded-xl border-[1px] border-[#BAC58F] bg-[#F4F6EE] p-6 text-green-900 sm:my-12 sm:p-8">
    <h2 className="m-0 font-truculenta text-3xl font-bold leading-tight sm:text-4xl">
      {title}
    </h2>
    <p className="mb-6 mt-3 max-w-[48ch] font-montserrat text-base leading-relaxed">
      {text}
    </p>
    <a
      href={link}
      className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-lg bg-green-900 px-4 py-3 text-center font-truculenta text-xl font-bold leading-snug text-white transition-colors hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-900 sm:w-auto sm:px-5"
    >
      <span>{label}</span>
      <svg
        aria-hidden="true"
        className="hidden h-5 w-5 shrink-0 sm:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14m-5-5 5 5-5 5" />
      </svg>
    </a>
  </div>
);
