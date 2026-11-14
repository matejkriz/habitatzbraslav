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
import {
  useIndicator,
  useNavItems,
  usePendingIndex,
  useScrolled,
} from "./nav-shared";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const GLASS =
  "bg-white/75 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-[#064E3B]/[0.07] shadow-[0_14px_34px_-14px_rgba(6,78,59,0.35),0_2px_6px_-2px_rgba(6,78,59,0.08)]";
const PILL = "bg-[#FCDCCD]";

const ICONS: Record<string, IconType> = {
  "": TbHome,
  info: TbInfoCircle,
  about: TbPlant2,
  team: TbUsers,
  contact: TbMail,
};
// The tab bar has ~70px per item; only the long label gets a short form.
const SHORT_LABELS: Record<string, string> = { about: "Principy" };

/**
 * Varianta 10 – Smršťovací + spodní lišta.
 * Desktop: at the top it is an open, airy row; once you scroll it gathers
 * into a compact glass pill in the centre. The current page sits in a soft
 * peach pill from the logo's salmon.
 * Mobile: navigation moves to a floating tab bar at the bottom, in thumb's
 * reach, with icons and short labels.
 */
export const Header = ({ data }) => {
  const items = useNavItems(data.nav);
  const { current, setPending } = usePendingIndex(items);
  const { listRef, rect, ready } = useIndicator(current);
  const tabs = useIndicator(current);
  const scrolled = useScrolled(24);

  return (
    <>
      <style>{`
        @media (max-width: 899.98px) {
          body { padding-bottom: calc(6.5rem + env(safe-area-inset-bottom)); }
        }
      `}</style>
      <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 font-truculenta sm:px-5 sm:pt-4">
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between gap-6 rounded-full transition-all duration-700 ${EASE} motion-reduce:transition-none ${
            scrolled
              ? `h-16 max-w-[60rem] pl-6 pr-2 ${GLASS}`
              : "h-16 max-w-8xl bg-white/0 pl-3 pr-0 ring-0 lg:h-20"
          } max-md:w-fit max-md:pl-4 max-md:pr-4 max-md:h-14 ${
            scrolled ? "" : "max-md:bg-white/75 max-md:shadow-[0_6px_20px_-12px_rgba(6,78,59,0.25)] max-md:backdrop-blur-xl"
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
            <ul ref={listRef} className="relative flex items-center gap-1">
              {rect && (
                <span
                  aria-hidden="true"
                  className={`absolute rounded-full ${PILL} ${
                    ready
                      ? `transition-all duration-500 ${EASE} motion-reduce:transition-none`
                      : ""
                  }`}
                  style={{
                    left: rect.left,
                    top: rect.top,
                    width: rect.width,
                    height: rect.height,
                  }}
                />
              )}
              {items.map((item, i) => (
                <li key={`${item.label}-${i}`} className="relative">
                  <Link
                    href={item.url}
                    data-nav-link
                    onClick={() => setPending(i)}
                    aria-current={item.active ? "page" : undefined}
                    className={`relative block whitespace-nowrap rounded-full px-4 py-2 text-lg tracking-[0.02em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 lg:px-5 lg:text-xl ${
                      i === current
                        ? `text-green-900 ${rect ? "" : PILL}`
                        : "text-green-800/80 hover:bg-[#BAC590]/20 hover:text-green-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <nav
        aria-label="Hlavní menu"
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 font-truculenta md:hidden"
      >
        <ul
          ref={tabs.listRef}
          className="relative mx-auto flex max-w-md items-stretch justify-between rounded-[2rem] bg-white/90 p-1.5 shadow-[0_14px_34px_-14px_rgba(6,78,59,0.35),0_2px_6px_-2px_rgba(6,78,59,0.08)] ring-1 ring-[#064E3B]/[0.07] backdrop-blur-xl backdrop-saturate-150"
        >
          {tabs.rect && (
            <span
              aria-hidden="true"
              className={`absolute rounded-[1.6rem] ${PILL} ${
                tabs.ready
                  ? `transition-all duration-500 ${EASE} motion-reduce:transition-none`
                  : ""
              }`}
              style={{
                left: tabs.rect.left,
                top: tabs.rect.top,
                width: tabs.rect.width,
                height: tabs.rect.height,
              }}
            />
          )}
          {items.map((item, i) => {
            const Icon = ICONS[item.href] ?? TbLeaf;
            return (
              <li key={`${item.label}-${i}`} className="relative flex-1">
                <Link
                  href={item.url}
                  data-nav-link
                  onClick={() => setPending(i)}
                  aria-current={item.active ? "page" : undefined}
                  aria-label={item.label}
                  className={`flex h-full flex-col items-center justify-center gap-0.5 rounded-[1.6rem] px-1 pt-2 pb-1.5 text-[0.8125rem] leading-tight tracking-[0.02em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                    i === current
                      ? `text-green-900 ${tabs.rect ? "" : PILL}`
                      : "text-green-800/75 active:text-green-900"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
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
