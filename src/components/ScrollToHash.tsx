"use client";

import { useEffect } from "react";
import { refreshScrollTriggers } from "@/lib/gsap";
import { scrollToSection } from "@/lib/scrollToSection";

const SECTION_RE = /^(home|about|skills|services|work|testimonials|faq|contact)$/;

/** Scroll to hash after navigating to `/#section` (precise land on heading). */
export function ScrollToHash() {
  // This helper watches the URL hash on page load and scrolls to the right section.
  useEffect(() => {
    // This effect waits for the page to settle, then performs the initial hash-based scroll.
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";

    let cancelled = false;

    async function go() {
      // This function restores the correct section position after fonts and layout have loaded.
      try {
        await document.fonts.ready;
      } catch {
        /* ignore */
      }
      await new Promise((r) => setTimeout(r, 80));
      if (cancelled) return;

      refreshScrollTriggers();

      const hash = window.location.hash;
      if (!hash || hash === "#home") {
        window.scrollTo(0, 0);
        return;
      }

      const id = hash.slice(1);
      if (!SECTION_RE.test(id)) {
        window.scrollTo(0, 0);
        return;
      }

      scrollToSection(id, "smooth");
      window.setTimeout(() => {
        if (cancelled) return;
        refreshScrollTriggers();
        scrollToSection(id, "auto");
      }, 400);
    }

    void go();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
