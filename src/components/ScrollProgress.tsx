"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollToPlugin } from "@/lib/gsap";

export function ScrollProgress() {
  // This component shows a back-to-top button with a ring that fills as the page scrolls.
  const btnRef = useRef<HTMLButtonElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    // This animation setup reveals the button after the hero and updates the progress ring during scrolling.
    const btn = btnRef.current;
    const ring = ringRef.current;
    if (!btn || !ring) return;

    const radius = 18;
    const circ = 2 * Math.PI * radius;
    gsap.set(ring, { strokeDasharray: circ, strokeDashoffset: circ });
    gsap.set(btn, { autoAlpha: 0, scale: 0.85 });

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      // This branch shows the button and full ring without motion when reduced motion is preferred.
      gsap.set(btn, { autoAlpha: 1, scale: 1 });
      gsap.set(ring, { strokeDashoffset: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // This branch fades the button in and ties the ring fill to the scroll position.
      gsap.to(btn, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#home",
          start: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(ring, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, { scope: btnRef });

  function scrollTop() {
    // This click handler smoothly scrolls the page back to the top.
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: true },
      duration: 1,
      ease: "power3.inOut",
    });
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-[var(--toggle-border)] bg-[var(--toggle-bg)] text-[var(--toggle-fg)] shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:border-[var(--teal)]/40 hover:text-[var(--text)] md:bottom-7 md:right-7"
    >
      <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0 m-auto" aria-hidden>
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
        />
        <circle
          ref={ringRef}
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="url(#progressGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
        />
        <defs>
          <linearGradient id="progressGrad" x1="0" y1="0" x2="44" y2="44">
            <stop stopColor="#2dd4bf" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      <span className="relative text-sm leading-none" aria-hidden>
        ↑
      </span>
    </button>
  );
}

void ScrollToPlugin;
