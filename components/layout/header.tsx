import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MenuIcon,
  useEscape,
  useIndicator,
  useNavItems,
  usePendingIndex,
  useRouteChange,
  useScrolled,
} from "./nav-shared";

const PANEL =
  "bg-[#FFFDF4]/[0.85] backdrop-blur-xl backdrop-saturate-150 ring-1 ring-[#BAC590]/[0.55]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const THUMB =
  "bg-white shadow-[0_1px_2px_rgba(6,78,59,0.14),0_6px_14px_-6px_rgba(6,78,59,0.3)]";

/**
 * Varianta 9 – Přepínač.
 * A softly rounded cream panel floats over the page. Navigation sits in a
 * sage track like a segmented switch; the current page is the raised white
 * thumb that glides to the clicked item.
 */
export const Header = ({ data }) => {
  const items = useNavItems(data.nav);
  const { current, setPending } = usePendingIndex(items);
  const { listRef, rect, ready } = useIndicator(current);
  const scrolled = useScrolled();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  useRouteChange(close);
  useEscape(open, close);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 font-truculenta sm:px-5 sm:pt-4">
      <div className="pointer-events-auto relative mx-auto max-w-8xl">
        <div
          className={`flex h-16 items-center justify-between gap-6 rounded-[1.75rem] pl-5 pr-2 transition-shadow duration-500 sm:pl-6 lg:h-[4.75rem] lg:pr-3 ${PANEL} ${
            scrolled
              ? "shadow-[0_14px_34px_-14px_rgba(6,78,59,0.35)]"
              : "shadow-[0_6px_20px_-12px_rgba(6,78,59,0.2)]"
          }`}
        >
          <Link
            href="/"
            className="-m-1 shrink-0 rounded-xl p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800"
          >
            <Image
              className="h-7 w-auto md:h-9 lg:h-10"
              alt={data.logo.alt}
              src={data.logo.src}
              width={160}
              height={40}
              priority
            />
          </Link>

          <nav
            aria-label="Hlavní menu"
            className="hidden rounded-full bg-[#BAC590]/30 p-1 shadow-[inset_0_1px_2px_rgba(6,78,59,0.1)] md:block"
          >
            <ul ref={listRef} className="relative flex items-center">
              {rect && (
                <span
                  aria-hidden="true"
                  className={`absolute rounded-full ${THUMB} ${
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
                <li
                  key={`${item.label}-${i}`}
                  className="relative flex items-center"
                >
                  {i > 0 && (
                    <span
                      aria-hidden="true"
                      className={`h-4 w-px bg-green-900/15 transition-opacity duration-300 ${
                        i === current || i - 1 === current ? "opacity-0" : ""
                      }`}
                    />
                  )}
                  <Link
                    href={item.url}
                    data-nav-link
                    onClick={() => setPending(i)}
                    aria-current={item.active ? "page" : undefined}
                    className={`relative block whitespace-nowrap rounded-full px-4 py-2 text-lg tracking-[0.02em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 lg:px-5 lg:text-xl ${
                      i === current
                        ? `text-green-900 ${rect ? "" : THUMB}`
                        : "text-green-800/75 hover:text-green-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#BAC590]/25 text-green-800 transition-colors hover:bg-[#BAC590]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 md:hidden"
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

        <div
          id="mobile-menu"
          hidden={!open}
          className="absolute inset-x-0 top-full mt-2 rounded-[1.75rem] bg-[#FFFDF4]/95 p-3 shadow-[0_20px_40px_-16px_rgba(6,78,59,0.35)] ring-1 ring-[#BAC590]/[0.55] backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 rounded-[1.25rem] bg-[#BAC590]/25 p-1">
            {items.map((item, i) => (
              <li key={`${item.label}-${i}`}>
                <Link
                  href={item.url}
                  aria-current={item.active ? "page" : undefined}
                  className={`block rounded-2xl px-5 py-3 text-xl tracking-[0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                    item.active
                      ? `${THUMB} text-green-900`
                      : "text-green-800/75 active:bg-white/50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
