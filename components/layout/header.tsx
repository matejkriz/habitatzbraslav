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

const ISLAND =
  "bg-[#FFFDF4]/80 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-[#BAC590]/60";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Varianta 7 – Dva ostrůvky.
 * Logo and navigation float as two separate cream islands, the page shows
 * between them. The current page is a deep forest-green pill with cream
 * lettering that slides to the clicked item.
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

  const shadow = scrolled
    ? "shadow-[0_14px_30px_-14px_rgba(6,78,59,0.35)]"
    : "shadow-[0_4px_14px_-8px_rgba(6,78,59,0.2)]";

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 font-truculenta sm:px-5 sm:pt-4">
      <div className="relative mx-auto flex max-w-8xl items-center justify-between gap-3">
        <Link
          href="/"
          className={`pointer-events-auto flex h-14 shrink-0 items-center rounded-full px-5 transition-shadow duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 lg:h-16 lg:px-6 ${ISLAND} ${shadow}`}
        >
          <Image
            className="h-7 w-auto lg:h-9"
            alt={data.logo.alt}
            src={data.logo.src}
            width={160}
            height={40}
            priority
          />
        </Link>

        <nav
          aria-label="Hlavní menu"
          className={`pointer-events-auto hidden rounded-full p-1.5 transition-shadow duration-500 md:block ${ISLAND} ${shadow}`}
        >
          <ul ref={listRef} className="relative flex items-center gap-1">
            {rect && (
              <span
                aria-hidden="true"
                className={`absolute rounded-full bg-[#0A4A39] shadow-[0_6px_14px_-6px_rgba(6,40,30,0.6)] ${
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
                  className={`relative block whitespace-nowrap rounded-full px-4 py-2 text-lg tracking-[0.02em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 lg:px-5 lg:py-2.5 lg:text-xl ${
                    i === current
                      ? `text-[#FEFCE8] ${rect ? "" : "bg-[#0A4A39]"}`
                      : "text-green-800/80 hover:bg-[#BAC590]/30 hover:text-green-900"
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
          className={`pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full text-green-800 transition-shadow duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 md:hidden ${ISLAND} ${shadow}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Zavřít menu" : "Otevřít menu"}</span>
          <MenuIcon open={open} />
        </button>

        <div
          id="mobile-menu"
          hidden={!open}
          className={`pointer-events-auto absolute right-0 top-full mt-2 w-[min(20rem,100%)] rounded-[1.75rem] bg-[#FFFDF4]/95 p-2 shadow-[0_20px_40px_-16px_rgba(6,78,59,0.35)] ring-1 ring-[#BAC590]/60 backdrop-blur-xl md:hidden`}
        >
          <ul className="flex flex-col gap-1">
            {items.map((item, i) => (
              <li key={`${item.label}-${i}`}>
                <Link
                  href={item.url}
                  aria-current={item.active ? "page" : undefined}
                  className={`block rounded-full px-5 py-3 text-xl tracking-[0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                    item.active
                      ? "bg-[#0A4A39] text-[#FEFCE8]"
                      : "text-green-800/80 active:bg-[#BAC590]/30"
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
