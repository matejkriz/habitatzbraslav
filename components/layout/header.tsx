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

const GLASS =
  "bg-white/75 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-[#064E3B]/[0.07]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * Varianta 6 – Mléčné sklo.
 * A rounded glass bar floats over the page with a little air around it. The
 * current page is a solid sun-yellow pill; a pale sage pill follows the
 * pointer, so the bar feels alive under the hand.
 */
export const Header = ({ data }) => {
  const items = useNavItems(data.nav);
  const { current, setPending } = usePendingIndex(items);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [hover, setHover] = React.useState<number | null>(null);
  const active = useIndicator(current, listRef);
  const ghost = useIndicator(hover ?? -1, listRef);
  const scrolled = useScrolled();
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  useRouteChange(close);
  useEscape(open, close);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 font-truculenta sm:px-5 sm:pt-4">
      <div className="pointer-events-auto relative mx-auto max-w-8xl">
        <div
          className={`flex h-16 items-center justify-between gap-6 rounded-full pl-5 pr-2 transition-shadow duration-500 sm:pl-6 lg:h-[4.5rem] ${GLASS} ${
            scrolled
              ? "shadow-[0_14px_34px_-14px_rgba(6,78,59,0.35),0_2px_6px_-2px_rgba(6,78,59,0.08)]"
              : "shadow-[0_6px_20px_-12px_rgba(6,78,59,0.22)]"
          }`}
        >
          <Link
            href="/"
            className="-m-1 shrink-0 rounded-full p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800"
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

          <nav aria-label="Hlavní menu" className="hidden md:block">
            <ul
              ref={listRef}
              className="relative flex items-center gap-1"
              onMouseLeave={() => setHover(null)}
            >
              {ghost.rect && hover !== current && (
                <span
                  aria-hidden="true"
                  className={`absolute rounded-full bg-[#BAC590]/25 transition-all duration-300 ${EASE} motion-reduce:transition-none`}
                  style={{
                    left: ghost.rect.left,
                    top: ghost.rect.top,
                    width: ghost.rect.width,
                    height: ghost.rect.height,
                  }}
                />
              )}
              {active.rect && (
                <span
                  aria-hidden="true"
                  className={`absolute rounded-full bg-[#EFC800] shadow-[0_6px_16px_-6px_rgba(201,160,0,0.7),inset_0_1px_0_rgba(255,255,255,0.45)] ${
                    active.ready
                      ? `transition-all duration-500 ${EASE} motion-reduce:transition-none`
                      : ""
                  }`}
                  style={{
                    left: active.rect.left,
                    top: active.rect.top,
                    width: active.rect.width,
                    height: active.rect.height,
                  }}
                />
              )}
              {items.map((item, i) => (
                <li key={`${item.label}-${i}`} className="relative">
                  <Link
                    href={item.url}
                    data-nav-link
                    onClick={() => setPending(i)}
                    onMouseEnter={() => setHover(i)}
                    aria-current={item.active ? "page" : undefined}
                    className={`relative block whitespace-nowrap rounded-full px-4 py-2 text-lg tracking-[0.02em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 lg:px-5 lg:text-xl ${
                      i === current
                        ? `text-[#063B2D] ${active.rect ? "" : "bg-[#EFC800]"}`
                        : "text-green-800/80 hover:text-green-900"
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-green-800 transition-colors hover:bg-[#BAC590]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 md:hidden"
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
          className="absolute inset-x-0 top-full mt-2 rounded-[1.75rem] bg-white/95 p-2 shadow-[0_20px_40px_-16px_rgba(6,78,59,0.35)] ring-1 ring-[#064E3B]/[0.07] backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {items.map((item, i) => (
              <li key={`${item.label}-${i}`}>
                <Link
                  href={item.url}
                  aria-current={item.active ? "page" : undefined}
                  className={`block rounded-full px-5 py-3 text-xl tracking-[0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-800 ${
                    item.active
                      ? "bg-[#EFC800] text-[#063B2D]"
                      : "text-green-800/80 active:bg-[#BAC590]/25"
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
