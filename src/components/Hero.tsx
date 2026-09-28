"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { site } from "@/data/content";
import { gsap, useGSAP, splitWordsMasked } from "@/lib/gsap";
import { GreenSphereFallback } from "./GreenSphereFallback";

const HeroIT3D = dynamic(() => import("./hero3d/HeroIT3D"), {
  ssr: false,
  loading: () => <GreenSphereFallback />,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            pillRef.current,
            title,
            subRef.current,
            paraRef.current,
            ctasRef.current,
            metaRef.current,
          ].filter(Boolean),
          { clearProps: "all", opacity: 1, y: 0, yPercent: 0 }
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = splitWordsMasked(title);

        gsap.set(pillRef.current, { opacity: 0, y: 16 });
        gsap.set(split.words, { yPercent: 110 });
        gsap.set(
          [subRef.current, paraRef.current, ctasRef.current, metaRef.current].filter(
            Boolean
          ),
          { opacity: 0, y: 20 }
        );

        gsap
          .timeline()
          .to(pillRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          })
          .to(
            split.words,
            {
              yPercent: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "expo.out",
            },
            0.15
          )
          .to(
            [subRef.current, paraRef.current, ctasRef.current, metaRef.current],
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.55
          );

        if (scrollCueRef.current) {
          gsap.to(scrollCueRef.current, {
            y: 6,
            duration: 1.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }

        return () => {
          split.revert?.();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center aurora-teal pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <HeroIT3D />

      <div className="container-x relative z-10 w-full max-w-[900px] px-4 md:px-6">
        <div
          ref={pillRef}
          className="inline-flex items-center gap-2.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface-soft)] px-[14px] py-[6px] text-[13px] tracking-[0.02em] text-[var(--muted)]"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inset-0 animate-[heroPulse_2.4s_ease-in-out_infinite] rounded-full status-dot-pulse" />
            <span className="relative h-2 w-2 rounded-full status-dot" />
          </span>
          Available for select projects — 2026
        </div>

        <h1
          ref={titleRef}
          className="mt-6 font-display font-semibold leading-[0.95] tracking-[-0.02em] text-[clamp(3.5rem,9vw,8rem)]"
        >
          {site.name}
        </h1>

        <p
          ref={subRef}
          className="mt-3 font-display text-[clamp(1.25rem,3vw,2rem)] italic leading-snug text-[var(--hero-sub)]"
        >
          Software engineer &amp; full-stack builder.
        </p>

        <p
          ref={paraRef}
          className="mt-6 max-w-[520px] text-[18px] leading-[1.6] text-[var(--muted)] md:text-[20px]"
        >
          {site.heroLine}
        </p>

        <div ref={ctasRef} className="mt-8 flex flex-wrap gap-3">
          <a href="/#work" className="btn-neon">
            View my work →
          </a>
          <a href="/#contact" className="btn-soft">
            Let’s talk
          </a>
        </div>
      </div>

      <div
        ref={metaRef}
        className="container-x relative z-10 mt-16 w-full max-w-[900px] px-4 md:mt-20 md:px-6"
      >
        <div className="flex flex-col gap-4 text-[12px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>Full-stack builder</span>
          <span>Currently: coursework → ship-ready work</span>
          <a
            href="/#about"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--text)]"
          >
            Scroll
            <span ref={scrollCueRef} className="inline-block" aria-hidden>
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
