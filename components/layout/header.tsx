import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "../util/container";
import {
  MenuIcon,
  useEscape,
  useIndicator,
  useNavItems,
  usePendingIndex,
  useRouteChange,
} from "./nav-shared";

/**
 * Varianta 4 – Lesní zelená.
 * Full-width bar in the deep green of the site's buttons. The colourful logo
 * glows on it, and the current page is a sun-yellow pill that slides to the
 * clicked item. A thin ribbon of the four logo colours closes the bar.
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
    <header className="sticky top-0 z-50 font-truculenta">
      <div className="bg-[#0A4A39] shadow-[0_8px_24px_-14px_rgba(6,40,30,0.6)]">
        <Container size="custom" className="max-w-8xl py-0">
          <div className="flex h-16 items-center justify-between gap-6 lg:h-20">
            <Link
              href="/"
              className="-m-1 shrink-0 rounded-lg p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EFC800]"
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
              <ul ref={listRef} className="relative flex items-center gap-1 lg:gap-2">
                {rect && (
                  <span
                    aria-hidden="true"
                    className={`absolute rounded-full bg-[#EFC800] shadow-[0_4px_14px_-4px_rgba(239,200,0,0.55)] ${
                      ready
                        ? "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
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
                      className={`relative block whitespace-nowrap rounded-full px-4 py-1.5 text-lg tracking-[0.02em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EFC800] lg:px-5 lg:text-xl ${
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
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#FEFCE8] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EFC800] md:hidden"
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
        <div aria-hidden="true" className="flex h-1">
          <span className="flex-1 bg-[#F28E65]" />
          <span className="flex-1 bg-[#D2C72E]" />
          <span className="flex-1 bg-[#BAC590]" />
          <span className="flex-1 bg-[#EFC800]" />
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full bg-[#0A4A39] shadow-[0_16px_32px_-16px_rgba(6,40,30,0.6)] md:hidden"
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
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
    </header>
  );
};
