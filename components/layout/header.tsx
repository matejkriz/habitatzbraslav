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
} from "./nav-shared";

const CAPSULE =
  "bg-[#0A4A39]/90 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/10 shadow-[0_16px_36px_-16px_rgba(6,40,30,0.65)]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Varianta 8 – Lesní kapsle.
 * One compact forest-green capsule floats in the centre with the colourful
 * logo inside. The current page is a sun-yellow pill; the whole thing reads
 * like a small badge rather than a bar.
 */
export const Header = ({ data }) => {
  const items = useNavItems(data.nav);
  const { current, setPending } = usePendingIndex(items);
  const { listRef, rect, ready } = useIndicator(current);
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  useRouteChange(close);
  useEscape(open, close);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 font-truculenta sm:px-5 sm:pt-4">
      <div className="pointer-events-auto relative mx-auto w-full md:w-fit">
        <div
          className={`flex h-16 items-center justify-between gap-4 rounded-full pl-5 pr-2 md:pr-1.5 lg:gap-6 lg:pl-6 ${CAPSULE}`}
        >
          <Link
            href="/"
            className="-m-1 shrink-0 rounded-full p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EFC800]"
          >
            <Image
              className="h-7 w-auto lg:h-8"
              alt={data.logo.alt}
              src={data.logo.src}
              width={160}
              height={40}
              priority
            />
          </Link>

          <span aria-hidden="true" className="hidden h-7 w-px bg-white/15 md:block" />

          <nav aria-label="Hlavní menu" className="hidden md:block">
            <ul ref={listRef} className="relative flex items-center gap-0.5">
              {rect && (
                <span
                  aria-hidden="true"
                  className={`absolute rounded-full bg-[#EFC800] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ${
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
                    className={`relative block whitespace-nowrap rounded-full px-4 py-2.5 text-lg tracking-[0.02em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EFC800] lg:px-5 lg:text-xl ${
                      i === current
                        ? `text-[#063B2D] ${rect ? "" : "bg-[#EFC800]"}`
                        : "text-[#FEFCE8]/80 hover:bg-white/10 hover:text-[#FEFCE8]"
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-[#FEFCE8] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EFC800] md:hidden"
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
          className={`absolute inset-x-0 top-full mt-2 rounded-[1.75rem] p-2 md:hidden ${CAPSULE}`}
        >
          <ul className="flex flex-col gap-1">
            {items.map((item, i) => (
              <li key={`${item.label}-${i}`}>
                <Link
                  href={item.url}
                  aria-current={item.active ? "page" : undefined}
                  className={`block rounded-full px-5 py-3 text-xl tracking-[0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EFC800] ${
                    item.active
                      ? "bg-[#EFC800] text-[#063B2D]"
                      : "text-[#FEFCE8]/80 active:bg-white/10"
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
