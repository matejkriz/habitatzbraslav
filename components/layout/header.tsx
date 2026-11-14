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

// Loose, hand-cut shapes in the spirit of the painted leaves in the hero.
const BLOBS = [
  "M9 47C2 30 15 13 44 9C70 5 92 15 118 8C146 1 182 6 194 26C203 42 192 63 168 71C142 79 118 69 92 74C62 80 22 75 9 47Z",
  "M6 38C8 17 36 4 66 9C88 12 104 3 134 5C168 7 196 22 194 44C192 66 168 78 136 74C110 71 92 79 64 76C30 73 4 62 6 38Z",
  "M14 53C4 37 12 16 38 10C64 4 80 14 108 11C138 7 170 1 188 20C204 37 196 62 170 71C148 78 126 72 100 76C66 81 26 72 14 53Z",
  "M8 41C10 20 32 8 60 11C86 14 100 4 130 7C162 10 192 17 195 40C198 63 176 76 144 73C116 70 98 78 70 76C36 74 6 64 8 41Z",
];
// Pale tints of the logo colours, dark-green text stays well above 7:1.
const TINTS = ["#FBEFB0", "#FBD5C4", "#E2E8CC", "#EEEAB4", "#FBD5C4"];

const Blob = ({ index, className }: { index: number; className: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 200 80"
    preserveAspectRatio="none"
    className={`pointer-events-none absolute -left-3 -top-2 -z-1 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${className}`}
  >
    <path d={BLOBS[index % BLOBS.length]} fill={TINTS[index % TINTS.length]} />
  </svg>
);

/**
 * Varianta 5 – Barevné skvrny.
 * Full-width bar; the current page sits on a soft, hand-cut blob in one of
 * the logo colours, each page its own colour and shape. Hover lets the blob
 * peek through.
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
              <ul className="flex items-center gap-3 lg:gap-6">
                {items.map((item, i) => (
                  <li key={`${item.label}-${i}`}>
                    <Link
                      href={item.url}
                      aria-current={item.active ? "page" : undefined}
                      className={`group relative isolate block whitespace-nowrap px-3 py-1.5 text-lg tracking-[0.02em] transition-colors duration-200 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 lg:px-4 lg:text-xl ${
                        item.active
                          ? "text-green-900"
                          : "text-green-800/75 hover:text-green-900"
                      }`}
                    >
                      <Blob
                        index={i}
                        className={
                          item.active
                            ? "scale-100 opacity-100"
                            : "rotate-[-3deg] scale-75 opacity-0 group-hover:scale-90 group-hover:opacity-70"
                        }
                      />
                      {item.label}
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
        <ul className="flex flex-col items-start gap-1 px-6 py-4">
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`}>
              <Link
                href={item.url}
                aria-current={item.active ? "page" : undefined}
                className={`relative isolate inline-block px-4 py-2.5 text-2xl tracking-[0.02em] focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                  item.active ? "text-green-900" : "text-green-800/75"
                }`}
              >
                {item.active && (
                  <Blob index={i} className="scale-100 opacity-100" />
                )}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
