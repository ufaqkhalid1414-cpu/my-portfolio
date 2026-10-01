"use client";

import { useEffect } from "react";
import { refreshScrollTriggers } from "@/lib/gsap";
import { scrollToSection } from "@/lib/scrollToSection";

const SECTION_RE = /^(home|about|skills|services|work|testimonials|faq|contact)$/;

/** Scroll to hash after navigating to `/#section` (precise land on heading). */
export function ScrollToHash() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";

    let cancelled = false;

    async function go() {
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
