"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Original hero sphere — kept as WebGL / error fallback. */
export function GreenSphereFallback({
  className = "",
  mobile = false,
}: {
  className?: string;
  mobile?: boolean;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (mobile) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const outer = outerRef.current;
          const inner = innerRef.current;
          if (!outer || !inner) return;
          gsap.to(inner, {
            y: 8,
            duration: 7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
          const onMove = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            gsap.to(outer, {
              x: ((e.clientX - cx) / cx) * 10,
              y: ((e.clientY - cy) / cy) * 10,
              duration: 0.85,
              ease: "power3.out",
              overwrite: "auto",
            });
          };
          window.addEventListener("mousemove", onMove, { passive: true });
          return () => window.removeEventListener("mousemove", onMove);
        }
      );
      return () => mm.revert();
    },
    { scope: outerRef }
  );

  if (mobile) {
    return (
      <div
        className={`pointer-events-none absolute left-1/2 top-[18%] z-0 h-40 w-40 -translate-x-1/2 opacity-30 ${className}`}
        aria-hidden
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_28%,#fff,rgba(45,212,191,0.6)_40%,transparent_72%)] blur-md" />
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      className={`pointer-events-none absolute right-[4%] top-[28%] z-0 hidden aspect-square w-[min(48vw,420px)] min-w-[200px] max-w-[460px] min-[900px]:block md:right-[5%] ${className}`}
      aria-hidden
    >
      <div ref={innerRef} className="relative aspect-square w-full">
        <div className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.35),transparent_65%)] blur-2xl" />
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_30%_28%,#ffffff_0%,rgba(45,212,191,0.85)_38%,rgba(15,23,42,0.35)_78%)] shadow-[0_0_50px_rgba(45,212,191,0.4)]" />
      </div>
    </div>
  );
}
