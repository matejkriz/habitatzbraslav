import React from "react";
import { useRouter } from "next/router";

export type NavItem = {
  href: string;
  label: string;
  url: string;
  active: boolean;
};

/** Nav items with resolved URL (admin-aware) and active state. */
export const useNavItems = (nav?: { href?: string; label?: string }[]) => {
  const router = useRouter();
  const [prefix, setPrefix] = React.useState("");

  React.useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  }, []);

  return (nav || []).map((item) => {
    const href = item.href ?? "";
    return {
      href,
      label: item.label ?? "",
      url: `${prefix}/${href}`,
      active:
        href === ""
          ? ["/", "/home"].includes(router.asPath)
          : router.asPath.includes(href),
    };
  }) as NavItem[];
};

/** Calls back after every client-side route change (closes menus). */
export const useRouteChange = (callback: () => void) => {
  const router = useRouter();
  const ref = React.useRef(callback);
  ref.current = callback;

  React.useEffect(() => {
    const handle = () => ref.current();
    router.events.on("routeChangeComplete", handle);
    return () => router.events.off("routeChangeComplete", handle);
  }, [router.events]);
};

/** True once the page has scrolled past `threshold` px. */
export const useScrolled = (threshold = 8) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
};

/**
 * Measures the link at `index` inside the list so one indicator element can
 * slide between items. `ready` turns true after the first measurement; until
 * then the active link should style itself, so the server render is correct.
 */
export const useIndicator = (
  index: number,
  sharedRef?: React.RefObject<HTMLUListElement>
) => {
  const ownRef = React.useRef<HTMLUListElement>(null);
  const listRef = sharedRef ?? ownRef;
  const [rect, setRect] = React.useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  const [ready, setReady] = React.useState(false);

  const measure = React.useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const links = list.querySelectorAll<HTMLElement>("[data-nav-link]");
    const el = index >= 0 ? links[index] : null;
    if (!el) {
      setRect(null);
      return;
    }
    const base = list.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    setRect({
      left: box.left - base.left - list.clientLeft,
      top: box.top - base.top - list.clientTop,
      width: box.width,
      height: box.height,
    });
  }, [index]);

  React.useEffect(() => {
    measure();
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, [measure]);

  React.useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(list);
    document.fonts?.ready.then(() => measure());
    return () => observer.disconnect();
  }, [measure, listRef]);

  return { listRef, rect, ready: ready && rect !== null };
};

/** Closes an open menu on Escape. */
export const useEscape = (active: boolean, onEscape: () => void) => {
  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onEscape]);
};

/**
 * Index the indicator should sit on: a clicked item wins immediately (so the
 * indicator moves before the route finishes), otherwise the active page.
 */
export const usePendingIndex = (items: NavItem[]) => {
  const activeIndex = items.findIndex((item) => item.active);
  const [pending, setPending] = React.useState<number | null>(null);

  React.useEffect(() => {
    setPending(null);
  }, [activeIndex]);

  return { activeIndex, pending, setPending, current: pending ?? activeIndex };
};

/** Two-line burger that morphs into a cross. */
export const MenuIcon = ({ open }: { open: boolean }) => (
  <span aria-hidden="true" className="relative block h-4 w-6">
    <span
      className={`absolute left-0 h-[2.5px] w-6 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        open ? "top-[7px] rotate-45" : "top-[2px]"
      }`}
    />
    <span
      className={`absolute left-0 h-[2.5px] rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        open ? "top-[7px] w-6 -rotate-45" : "top-[11px] w-4"
      }`}
    />
  </span>
);
