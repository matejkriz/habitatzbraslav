import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { IconType } from "react-icons";
import {
  TbHome,
  TbInfoCircle,
  TbLeaf,
  TbMail,
  TbPlant2,
  TbUsers,
} from "react-icons/tb";
import { useNavItems, usePendingIndex, useScrolled } from "./nav-shared";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const GLASS =
  "bg-white/75 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-[#064E3B]/[0.07] shadow-[0_14px_34px_-14px_rgba(6,78,59,0.35),0_2px_6px_-2px_rgba(6,78,59,0.08)]";

// Pale tints of the logo colours; dark-green text stays well above 7:1.
const TINTS = ["#FBEFB0", "#FBD5C4", "#E2E8CC", "#EEEAB4", "#FBD5C4"];

// Wide, loose hand-cut shapes for the desktop row (from variant 5).
const WIDE_BLOBS = [
  "M9 47C2 30 15 13 44 9C70 5 92 15 118 8C146 1 182 6 194 26C203 42 192 63 168 71C142 79 118 69 92 74C62 80 22 75 9 47Z",
  "M6 38C8 17 36 4 66 9C88 12 104 3 134 5C168 7 196 22 194 44C192 66 168 78 136 74C110 71 92 79 64 76C30 73 4 62 6 38Z",
  "M14 53C4 37 12 16 38 10C64 4 80 14 108 11C138 7 170 1 188 20C204 37 196 62 170 71C148 78 126 72 100 76C66 81 26 72 14 53Z",
  "M8 41C10 20 32 8 60 11C86 14 100 4 130 7C162 10 192 17 195 40C198 63 176 76 144 73C116 70 98 78 70 76C36 74 6 64 8 41Z",
];

// Pebble shapes for the mobile tabs: narrower over the icon, fuller under the
// label, so the wobble never eats into the room around the content.
const TAB_BLOBS = [
  "M30 6C46 0 63 3 77 9C90 15 94 30 95 46C96 62 99 76 92 87C84 97 64 95 48 95C34 95 23 96 16 90C9 84 10 70 10 56C10 40 14 13 30 6Z",
  "M20 10C32 2 50 5 66 4C84 3 94 16 93 34C92 50 99 66 98 80C97 94 80 98 60 97C42 96 22 99 9 92C-1 86 2 70 3 56C4 40 8 18 20 10Z",
  "M10 18C16 6 32 4 50 4C68 4 86 3 92 16C97 28 94 46 95 62C96 78 93 92 78 95C60 98 40 95 22 96C10 97 5 88 5 72C5 54 5 30 10 18Z",
  "M24 4C40 0 58 6 74 8C90 10 96 24 94 40C92 56 99 72 95 86C91 98 70 96 50 97C32 98 12 98 5 86C-2 74 5 58 5 42C5 24 8 8 24 4Z",
  "M16 14C26 2 46 6 62 4C80 2 92 12 92 30C92 46 98 60 97 76C96 92 84 99 64 96C46 93 26 99 12 94C0 89 2 72 4 56C6 40 6 26 16 14Z",
];

const BLOB_MOTION = `transition duration-500 ${EASE} motion-reduce:transition-none`;

const ICONS: Record<string, IconType> = {
  "": TbHome,
  info: TbInfoCircle,
  about: TbPlant2,
  team: TbUsers,
  contact: TbMail,
};
// The tab bar is tight on phones; only the long label gets a short form.
const SHORT_LABELS: Record<string, string> = { about: "Principy" };

/**
 * Varianta 11 – Skvrny + smršťovací lišta.
 * Desktop: an open, airy row at the top that gathers into a compact glass
 * pill once you scroll. The current page sits on a hand-cut blob in one of
 * the logo tints, each page its own colour and shape; hover lets it peek.
 * Mobile: a near-solid logo island on top and a floating tab bar at the
 * bottom, where the current tab sits on its own coloured blob.
 */
export const Header = ({ data }) => {
  const items = useNavItems(data.nav);
  const { current, setPending } = usePendingIndex(items);
  const scrolled = useScrolled(24);

  return (
    <>
      <style>{`
        @media (max-width: 899.98px) {
          body { padding-bottom: calc(7rem + env(safe-area-inset-bottom)); }
        }
      `}</style>
      <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 font-truculenta sm:px-5 sm:pt-4">
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between gap-6 rounded-full transition-all duration-700 ${EASE} motion-reduce:transition-none max-md:h-14 max-md:w-fit max-md:bg-white/[0.94] max-md:px-5 max-md:shadow-[0_8px_22px_-12px_rgba(6,78,59,0.32)] max-md:ring-1 max-md:ring-[#064E3B]/[0.06] max-md:backdrop-blur-xl ${
            scrolled
              ? `h-16 max-w-[60rem] pl-6 pr-5 ${GLASS}`
              : "h-16 max-w-8xl bg-white/0 pl-3 pr-0 ring-0 lg:h-20"
          }`}
        >
          <Link
            href="/"
            className="-m-1 shrink-0 rounded-full p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800"
          >
            <Image
              className={`w-auto transition-all duration-700 ${EASE} motion-reduce:transition-none ${
                scrolled ? "h-7 lg:h-8" : "h-7 md:h-10 lg:h-11"
              }`}
              alt={data.logo.alt}
              src={data.logo.src}
              width={160}
              height={40}
              priority
            />
          </Link>

          <nav aria-label="Hlavní menu" className="hidden md:block">
            <ul className="flex items-center gap-2 lg:gap-4">
              {items.map((item, i) => {
                const on = i === current;
                return (
                  <li key={`${item.label}-${i}`}>
                    <Link
                      href={item.url}
                      onClick={() => setPending(i)}
                      aria-current={item.active ? "page" : undefined}
                      className={`group relative isolate block whitespace-nowrap px-4 py-2 text-lg tracking-[0.02em] transition-colors duration-200 focus-visible:rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800 lg:text-xl ${
                        on
                          ? "text-green-900"
                          : "text-green-800/75 hover:text-green-900"
                      }`}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 200 80"
                        preserveAspectRatio="none"
                        className={`pointer-events-none absolute -left-2.5 -top-1.5 -z-1 h-[calc(100%+0.75rem)] w-[calc(100%+1.25rem)] ${BLOB_MOTION} ${
                          on
                            ? "scale-100 opacity-100"
                            : "rotate-[-3deg] scale-75 opacity-0 group-hover:scale-90 group-hover:opacity-70"
                        }`}
                      >
                        <path
                          d={WIDE_BLOBS[i % WIDE_BLOBS.length]}
                          fill={TINTS[i % TINTS.length]}
                        />
                      </svg>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      <nav
        aria-label="Hlavní menu"
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 font-truculenta md:hidden"
      >
        <ul className="mx-auto flex max-w-md items-stretch rounded-[2.25rem] bg-white/[0.94] p-1.5 shadow-[0_14px_34px_-14px_rgba(6,78,59,0.35),0_2px_6px_-2px_rgba(6,78,59,0.08)] ring-1 ring-[#064E3B]/[0.07] backdrop-blur-xl backdrop-saturate-150">
          {items.map((item, i) => {
            const Icon = ICONS[item.href] ?? TbLeaf;
            const on = i === current;
            return (
              <li key={`${item.label}-${i}`} className="flex flex-auto">
                <Link
                  href={item.url}
                  onClick={() => setPending(i)}
                  aria-current={item.active ? "page" : undefined}
                  aria-label={item.label}
                  className={`group relative isolate flex w-full flex-col items-center justify-center gap-0.5 px-3 pt-3 pb-2.5 text-[0.8125rem] leading-tight tracking-[0.02em] transition-colors duration-200 focus-visible:rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                    on ? "text-green-900" : "text-green-800/75"
                  }`}
                >
                  <svg
                    aria-hidden="true"
                    data-blob
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className={`pointer-events-none absolute inset-0 -z-1 h-full w-full ${BLOB_MOTION} ${
                      on
                        ? "scale-100 opacity-100"
                        : "rotate-[-6deg] scale-50 opacity-0 group-active:scale-90 group-active:opacity-60"
                    }`}
                  >
                    <path
                      d={TAB_BLOBS[i % TAB_BLOBS.length]}
                      fill={TINTS[i % TINTS.length]}
                    />
                  </svg>
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6"
                    strokeWidth={1.75}
                  />
                  <span className="whitespace-nowrap">
                    {SHORT_LABELS[item.href] ?? item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
