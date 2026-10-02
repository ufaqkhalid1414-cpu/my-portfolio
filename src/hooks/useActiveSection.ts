"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { scrollToSection } from "@/lib/scrollToSection";

const SECTION_IDS = [
  "home",
  "about",
  "skills",
  "services",
  "work",
  "testimonials",
  "faq",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

function toHash(href: string) {
  // This helper converts different link formats into a normal #section hash.
  if (href.startsWith("/#")) return href.slice(1);
  if (href.startsWith("#")) return href;
  return `#${href}`;
}

function toRootHref(href: string) {
  // This helper builds a home-page URL with the matching section hash.
  const hash = toHash(href);
  return `/${hash}`;
}

export function useActiveSection() {
  // This hook tracks the current section and provides smooth navigation between sections.
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState<`#${SectionId}`>("#home");
  const lockedRef = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef(0);

  const compute = useCallback(() => {
    // This function checks the scroll position and updates which section is active in the navbar.
    if (lockedRef.current) return;

    if (pathname?.startsWith("/projects")) {
      setActive("#work");
      return;
    }

    if (typeof window === "undefined") return;

    if (window.scrollY < 80) {
      setActive("#home");
      return;
    }

    const doc = document.documentElement;
    const atBottom =
      window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
    if (atBottom) {
      setActive("#faq");
      return;
    }

    const probe = window.innerHeight * 0.4;
    let current: SectionId = "home";

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= probe) {
        current = id;
      }
    }

    setActive(`#${current}`);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      // This handler batches scroll and resize updates so active-section checks stay smooth.
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        compute();
      });
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lockTimer.current) clearTimeout(lockTimer.current);
    };
  }, [compute]);

  const navigateTo = useCallback(
    (href: string) => {
      // This function navigates to a section, either by scrolling on the page or routing back to home first.
      const hash = toHash(href) as `#${SectionId}` | "#contact";
      const id = hash.replace("#", "");
      const rootHref = toRootHref(href);

      if (hash.startsWith("#")) {
        setActive(
          ([
            "home",
            "about",
            "skills",
            "services",
            "work",
            "testimonials",
            "faq",
          ].includes(id)
            ? hash
            : active) as `#${SectionId}`
        );
      }

      // Inner page → go to home with hash
      if (pathname !== "/") {
        router.push(rootHref);
        return;
      }

      lockedRef.current = true;
      if (lockTimer.current) clearTimeout(lockTimer.current);

      const unlock = () => {
        // This helper re-enables automatic active-section tracking after manual navigation finishes.
        lockedRef.current = false;
        compute();
      };

      const onScrollEnd = () => {
        // This handler unlocks section tracking when the smooth scroll finishes.
        window.removeEventListener("scrollend", onScrollEnd);
        unlock();
      };
      window.addEventListener("scrollend", onScrollEnd, { once: true });
      lockTimer.current = setTimeout(() => {
        window.removeEventListener("scrollend", onScrollEnd);
        unlock();
      }, 1200);

      if (id === "home") {
        scrollToSection("home");
        setActive("#home");
        return;
      }

      const ok = scrollToSection(id);
      if (!ok) {
        router.push(rootHref);
      }
    },
    [active, compute, pathname, router]
  );

  return { active, navigateTo, setActive, toRootHref };
}
