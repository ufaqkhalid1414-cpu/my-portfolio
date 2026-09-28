"use client";

import { useEffect } from "react";
import { refreshScrollTriggers } from "@/lib/gsap";

const NAV_OFFSET = 96;

/** Scroll to hash after navigating from an inner page to `/#section`. */
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
      await new Promise((r) => setTimeout(r, 100));
      if (cancelled) return;

      refreshScrollTriggers();

      const hash = window.location.hash;
      if (!hash || hash === "#home") {
        window.scrollTo(0, 0);
        return;
      }

      const el = document.querySelector(hash);
      if (!el) {
        window.scrollTo(0, 0);
        return;
      }

      const top =
        el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      // Second pass after layout settles
      window.setTimeout(() => {
        if (cancelled) return;
        refreshScrollTriggers();
        const again = document.querySelector(hash);
        if (!again) return;
        const t =
          again.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top: Math.max(0, t), behavior: "auto" });
      }, 350);
    }

    void go();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
