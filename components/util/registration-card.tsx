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
  <div className="not-prose my-8 rounded-2xl bg-green-900 p-6 text-white sm:p-8">
    <h2 className="m-0 font-truculenta text-3xl font-bold leading-tight text-white sm:text-4xl">
      {title}
    </h2>
    <p className="mt-3 max-w-[44ch] font-montserrat text-base leading-relaxed text-white/90">
      {text}
    </p>
    <a
      href={link}
      className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-yellow-200 px-3 py-3 text-center font-truculenta text-xl font-bold leading-snug text-green-900 transition-colors hover:bg-yellow-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:gap-3 sm:px-5"
    >
      <span className="min-w-0 break-words">{label}</span>
      <svg
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14m-6-6 6 6-6 6" />
      </svg>
    </a>
  </div>
);
