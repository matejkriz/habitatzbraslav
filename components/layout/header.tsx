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

// Logo colours: the yellow dot of the "i", salmon H/T, sage B/T, olive A.
const DOT_COLORS = ["#EFC800", "#F28E65", "#BAC590", "#D2C72E", "#F28E65"];
const dotColor = (i: number) => DOT_COLORS[i % DOT_COLORS.length];

/**
 * Varianta 3 – Tečka z loga.
 * Full-width bar; the current page is marked by a round dot like the one over
 * the "i" in HABiTAT. The dot rolls to the clicked item and takes that
 * item's logo colour.
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
              <ul ref={listRef} className="relative flex items-center gap-2 lg:gap-6">
                {rect && current >= 0 && (
                  <span
                    aria-hidden="true"
                    className={`absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full ${
                      ready
                        ? "transition-[left,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                        : ""
                    }`}
                    style={{
                      left: rect.left + rect.width / 2,
                      top: rect.top + rect.height - 16,
                      backgroundColor: dotColor(current),
                    }}
                  />
                )}
                {items.map((item, i) => (
                  <li key={`${item.label}-${i}`}>
                    <Link
                      href={item.url}
                      data-nav-link
                      onClick={() => setPending(i)}
                      aria-current={item.active ? "page" : undefined}
                      className={`group relative flex flex-col items-center whitespace-nowrap px-3 pt-2 pb-5 text-lg tracking-[0.02em] transition-colors duration-200 focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 lg:text-xl ${
                        i === current
                          ? "text-green-900"
                          : "text-green-800/75 hover:text-green-900"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-[6px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                          i === current
                            ? rect
                              ? "scale-0"
                              : "scale-100"
                            : "scale-0 group-hover:scale-50"
                        }`}
                        style={{ backgroundColor: dotColor(i) }}
                      />
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
                className={`flex items-center gap-4 py-3 text-2xl tracking-[0.02em] focus-visible:rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                  item.active ? "text-green-900" : "text-green-800/75"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-3 w-3 shrink-0 rounded-full transition-transform ${
                    item.active ? "scale-100" : "scale-[0.45]"
                  }`}
                  style={{ backgroundColor: dotColor(i) }}
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
