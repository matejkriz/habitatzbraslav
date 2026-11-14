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
  useScrolled,
} from "./nav-shared";

/**
 * Varianta 1 – Sluníčková pilulka.
 * Full-width bar; the current page sits in a soft sun-yellow pill that slides
 * to the clicked item. Hover gets a quiet sage wash.
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
    <header className="sticky top-0 z-50 font-truculenta">
      <div
        className={`border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/[0.85] ${
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
              <ul ref={listRef} className="relative flex items-center gap-1 lg:gap-2">
                {rect && (
                  <span
                    aria-hidden="true"
                    className={`absolute rounded-full bg-[#FBEFB0] shadow-[inset_0_0_0_1px_rgba(239,200,0,0.35)] ${
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
                      className={`relative block whitespace-nowrap rounded-full px-4 py-1.5 text-lg tracking-[0.02em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 lg:px-5 lg:text-xl ${
                        i === current
                          ? `text-green-900 ${rect ? "" : "bg-[#FBEFB0]"}`
                          : "text-green-800/80 hover:bg-[#BAC590]/20 hover:text-green-900"
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
        <ul className="flex flex-col gap-1 px-4 py-3">
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`}>
              <Link
                href={item.url}
                aria-current={item.active ? "page" : undefined}
                className={`block rounded-full px-5 py-3 text-xl tracking-[0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                  item.active
                    ? "bg-[#FBEFB0] text-green-900"
                    : "text-green-800/80 active:bg-[#BAC590]/20"
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
