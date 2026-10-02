"use client";

import { useId, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Accent = "teal" | "violet" | "amber" | "blend";

const GRADIENTS: Record<Accent, [string, string]> = {
  teal: ["#2dd4bf", "#38bdf8"],
  violet: ["#a78bfa", "#f472b6"],
  amber: ["#fbbf24", "#f59e0b"],
  blend: ["#2dd4bf", "#a78bfa"],
};

export function SectionOrnament({
  accent = "teal",
  className = "",
}: {
  accent?: Accent;
  className?: string;
}) {
  // This component draws the curved line ornament and animates its stroke and end dot on scroll.
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [c1, c2] = GRADIENTS[accent];
  const uid = useId().replace(/:/g, "");
  const gid = `ornament-grad-${uid}`;

  useGSAP(
    () => {
      // This animation setup reveals the ornament line when the heading area scrolls into view.
      const root = rootRef.current;
      const path = pathRef.current;
      const dot = dotRef.current;
      if (!root || !path || !dot) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // This branch shows the ornament fully drawn when reduced motion is preferred.
        gsap.set(path, { strokeDashoffset: 0 });
        gsap.set(dot, { scale: 1, transformOrigin: "center" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // This branch animates the line drawing first and then pops in the glowing dot.
        const len = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.set(dot, { scale: 0, transformOrigin: "center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(path, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
        }).to(
          dot,
          {
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
          },
          "-=0.15"
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef, dependencies: [accent] }
  );

  return (
    <div
      ref={rootRef}
      className={`mt-4 flex justify-center ${className}`}
      aria-hidden
    >
      <svg
        width="120"
        height="28"
        viewBox="0 0 120 28"
        fill="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="120" y2="0">
            <stop stopColor={c1} />
            <stop offset="1" stopColor={c2} />
          </linearGradient>
          <filter id={`${gid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="2.5"
              floodColor={c2}
              floodOpacity="0.85"
            />
          </filter>
        </defs>
        <path
          ref={pathRef}
          d="M4 18 C 28 4, 52 26, 76 10 S 108 6, 116 14"
          stroke={`url(#${gid})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          ref={dotRef}
          cx="116"
          cy="14"
          r="3"
          fill={c2}
          filter={`url(#${gid}-glow)`}
        />
      </svg>
    </div>
  );
}
