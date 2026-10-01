"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { refreshScrollTriggers } from "@/lib/gsap";

/** Refresh ScrollTrigger after fonts/images and on every route change. */
export function GsapRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const refresh = () => {
      if (!cancelled) refreshScrollTriggers();
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh).catch(() => refresh());
    } else {
      refresh();
    }

    window.addEventListener("load", refresh);

    const imgs = Array.from(document.images);
    let pending = imgs.filter((img) => !img.complete).length;
    if (pending === 0) {
      requestAnimationFrame(refresh);
    } else {
      imgs.forEach((img) => {
        if (img.complete) return;
        const done = () => {
          pending -= 1;
          if (pending <= 0) refresh();
        };
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      });
    }

    const t1 = window.setTimeout(refresh, 50);
    const t2 = window.setTimeout(refresh, 300);
    const t3 = window.setTimeout(refresh, 700);

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname]);

  return null;
}
