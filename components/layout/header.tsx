import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../util/container";
import {
  MenuIcon,
  useEscape,
  useNavItems,
  useRouteChange,
  useScrolled,
} from "./nav-shared";

// Slightly different hand-drawn strokes, so no two items look stamped.
const STROKES = [
  "M3 8.5C18 5 30 9.5 47 6.8S80 4.6 97 7.4",
  "M2 7.2C16 9.6 33 4.4 50 6.6S83 9.2 98 5.6",
  "M3 6.4C21 8.8 36 5.2 52 7.6S81 4.2 97 7.8",
  "M2 8C19 4.8 35 8.6 49 6.2S82 8.4 98 6",
];

const Stroke = ({
  index,
  className,
  pos = "-bottom-1",
}: {
  index: number;
  className: string;
  pos?: string;
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 12"
    preserveAspectRatio="none"
    className={`pointer-events-none absolute inset-x-1 ${pos} h-3 w-[calc(100%-0.5rem)] overflow-visible ${className}`}
  >
    <path
      d={STROKES[index % STROKES.length]}
      pathLength={1}
      fill="none"
      strokeLinecap="round"
      stroke="currentColor"
    />
  </svg>
);

/**
 * Varianta 2 – Ručně tažená čára.
 * Full-width bar; the current page is underlined with a hand-drawn sun-yellow
 * brush stroke that draws itself in, echoing the hero illustration. Hover
 * sketches a thin sage line.
 */
export const Header = ({ data }) => {
  const items = useNavItems(data.nav);
  const scrolled = useScrolled();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  useRouteChange(close);
  useEscape(open, close);

  return (
    <header className="sticky top-0 z-50 font-truculenta">
      <style>{`
        @keyframes hz-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .hz-stroke-active path { stroke-dasharray: 1; animation: hz-draw 650ms cubic-bezier(0.22,1,0.36,1) both; }
        .hz-stroke-hover path { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 380ms cubic-bezier(0.22,1,0.36,1), opacity 120ms; }
        .group:hover .hz-stroke-hover path, .group:focus-visible .hz-stroke-hover path { stroke-dashoffset: 0; opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .hz-stroke-active path { animation: none; }
          .hz-stroke-hover path { transition: none; }
        }
      `}</style>
      <div
        className={`border-b bg-white transition-shadow duration-300 ${
          scrolled
            ? "border-transparent shadow-[0_6px_24px_-12px_rgba(6,78,59,0.28)]"
            : "border-[#BAC590]/40"
        }`}
      >
        <Container size="custom" className="max-w-8xl py-0">
          <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
            <Link
              href="/"
              className="-m-1 shrink-0 rounded-lg p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800"
            >
              <Image
                className="h-8 w-auto md:h-10 lg:h-11"
                alt={data.logo.alt}
                src={data.logo.src}
                width={160}
                height={40}
                priority
              />
            </Link>

            <nav aria-label="Hlavní menu" className="hidden md:block">
              <ul className="flex items-center gap-2 lg:gap-5">
                {items.map((item, i) => (
                  <li key={`${item.label}-${i}`}>
                    <Link
                      href={item.url}
                      aria-current={item.active ? "page" : undefined}
                      className={`group relative block whitespace-nowrap px-3 py-2 text-lg tracking-[0.02em] transition-colors duration-200 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 lg:text-xl ${
                        item.active
                          ? "text-green-900"
                          : "text-green-800/75 hover:text-green-900"
                      }`}
                    >
                      {item.label}
                      {item.active ? (
                        <Stroke
                          index={i}
                          className="hz-stroke-active text-[#EFC800] [&_path]:[stroke-width:4.5]"
                        />
                      ) : (
                        <Stroke
                          index={i}
                          className="hz-stroke-hover text-[#BAC590] [&_path]:[stroke-width:2]"
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-green-800 transition-colors hover:bg-[#BAC590]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">
                {open ? "Zavřít menu" : "Otevřít menu"}
              </span>
              <MenuIcon open={open} />
            </button>
          </div>
        </Container>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-[#BAC590]/40 bg-white shadow-[0_16px_32px_-16px_rgba(6,78,59,0.3)] md:hidden"
      >
        <ul className="flex flex-col px-6 py-4">
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`}>
              <Link
                href={item.url}
                aria-current={item.active ? "page" : undefined}
                className={`group relative inline-block px-1 py-3 text-2xl tracking-[0.02em] focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                  item.active ? "text-green-900" : "text-green-800/75"
                }`}
              >
                {item.label}
                {item.active && (
                  <Stroke
                    index={i}
                    pos="bottom-1"
                    className="hz-stroke-active text-[#EFC800] [&_path]:[stroke-width:4.5]"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
