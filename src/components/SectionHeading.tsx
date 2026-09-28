"use client";

import { useRef } from "react";
import { SectionOrnament } from "./SectionOrnament";
import { gsap, useGSAP, splitWordsMasked } from "@/lib/gsap";

export function SectionHeading({
  eyebrow,
  title,
  accent = "teal",
  curved = false,
  className = "",
  subtitle,
}: {
  eyebrow: string;
  title: string;
  accent?: "teal" | "violet" | "amber" | "blend";
  /** @deprecated straight/curved framer lines replaced by SectionOrnament */
  curved?: boolean;
  className?: string;
  subtitle?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  void curved;

  useGSAP(
    () => {
      const root = rootRef.current;
      const eyebrowEl = eyebrowRef.current;
      const titleEl = titleRef.current;
      if (!root || !eyebrowEl || !titleEl) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([eyebrowEl, titleEl, subtitleRef.current].filter(Boolean), {
          clearProps: "all",
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = splitWordsMasked(titleEl);

        gsap.set(eyebrowEl, { opacity: 0, y: 12 });
        if (subtitleRef.current) {
          gsap.set(subtitleRef.current, { opacity: 0, y: 16 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(eyebrowEl, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        }).from(
          split.words,
          {
            yPercent: 110,
            duration: 0.7,
            stagger: 0.06,
            ease: "expo.out",
          },
          0.08
        );

        if (subtitleRef.current) {
          tl.to(
            subtitleRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            0.15 + 0.08
          );
        }

        return () => {
          split.revert?.();
        };
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [title] }
  );

  return (
    <div
      ref={rootRef}
      className={`mb-10 md:mb-12 text-center flex flex-col items-center ${className}`}
    >
      <p
        ref={eyebrowRef}
        className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-3"
      >
        — {eyebrow}
      </p>
      <h2
        ref={titleRef}
        className="font-display text-4xl md:text-5xl tracking-tight"
      >
        {title}
      </h2>
      <SectionOrnament accent={accent} />
      {subtitle ? (
        <p
          ref={subtitleRef}
          className="mt-5 max-w-xl text-center text-sm md:text-base text-[var(--muted)] leading-relaxed"
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
