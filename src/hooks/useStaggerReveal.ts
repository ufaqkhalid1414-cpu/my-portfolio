"use client";

import { RefObject } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

type Options = {
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  /** If true, reveal once and never hide again (safe for layout footers). */
  once?: boolean;
};

/** Staggered y/opacity reveals that reverse on scroll up (unless once). */
export function useStaggerReveal(
  scope: RefObject<HTMLElement | null>,
  selector: string,
  options: Options = {}
) {
  // This hook reveals matching items one after another as they scroll into view.
  const {
    y = 40,
    stagger = 0.1,
    duration = 0.7,
    start = "top 80%",
    once = false,
  } = options;

  useGSAP(
    () => {
      // This animation setup finds the target items and applies the staggered reveal behavior.
      const root = scope.current;
      if (!root) return;
      const items = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(selector)
      );
      if (!items.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // This branch shows all items immediately when reduced motion is preferred.
        gsap.set(items, { clearProps: "transform,opacity", opacity: 1, y: 0 });
      });

      mm.add(
        {
          isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          // This branch runs the staggered reveal and optional hide-on-scroll-back behavior.
          const isMobile = !!ctx.conditions?.isMobile;
          const fromY = isMobile ? Math.min(y, 24) : y;

          gsap.set(items, { y: fromY, opacity: 0, willChange: "transform,opacity" });

          ScrollTrigger.batch(items, {
            start,
            once,
            onEnter: (batch) =>
              gsap.to(batch, {
                y: 0,
                opacity: 1,
                stagger,
                duration,
                ease: "power3.out",
                overwrite: true,
                onComplete: () => {
                  gsap.set(batch, { willChange: "auto" });
                },
              }),
            onLeaveBack: once
              ? undefined
              : (batch) =>
                  gsap.to(batch, {
                    y: fromY,
                    opacity: 0,
                    stagger: stagger * 0.6,
                    duration: Math.min(duration, 0.55),
                    ease: "power3.out",
                    overwrite: true,
                  }),
          });
        }
      );

      return () => mm.revert();
    },
    { scope, dependencies: [selector, y, stagger, duration, start, once] }
  );
}
