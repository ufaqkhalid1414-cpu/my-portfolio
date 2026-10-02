"use client";

import { useRef } from "react";
import { testimonials } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { gsap, useGSAP } from "@/lib/gsap";

/** Duplicate for seamless infinite marquee */
const loopItems = [...testimonials, ...testimonials];

export function Testimonials() {
  // This component shows testimonial cards with scroll-in animation, floating motion, and a looping marquee.
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatTweens = useRef<ReturnType<typeof gsap.to>[]>([]);
  const marqueeTween = useRef<ReturnType<typeof gsap.to> | null>(null);

  useGSAP(
    () => {
      // This animation setup reveals the cards on scroll and starts the floating and marquee motion.
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const track = trackRef.current;
      if (!cards.length || !sectionRef.current || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // This branch shows all testimonial cards immediately without motion.
        gsap.set(cards, {
          clearProps: "transform,opacity",
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        gsap.set(track, { clearProps: "transform", x: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // This branch animates the cards in and then starts the endless horizontal marquee.
        gsap.set(cards, { opacity: 0, y: 48, scale: 0.9 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
            onLeaveBack: () => {
              floatTweens.current.forEach((t) => t?.kill());
              floatTweens.current = [];
              marqueeTween.current?.pause(0);
              gsap.set(cards, { opacity: 0, y: 48, scale: 0.9 });
              gsap.set(track, { x: 0 });
            },
          },
        });

        cards.forEach((card, i) => {
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.5)",
              onComplete: () => {
                // Keep existing float on first set only (avoid double floats on clones)
                if (i >= testimonials.length) return;
                const float = gsap.to(card, {
                  y: -8,
                  duration: 1.45,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                  delay: i * 0.12,
                });
                floatTweens.current[i] = float;
              },
            },
            i * 0.08
          );
        });

        // Infinite horizontal marquee (from reference video) — after enter
        tl.add(() => {
          const half = track.scrollWidth / 2;
          if (half <= 0) return;
          marqueeTween.current?.kill();
          gsap.set(track, { x: 0 });
          marqueeTween.current = gsap.to(track, {
            x: -half,
            duration: Math.max(18, half / 40),
            ease: "none",
            repeat: -1,
          });
        });
      });

      return () => {
        // This cleanup stops all looping testimonial animations when the section unmounts.
        floatTweens.current.forEach((t) => t.kill());
        floatTweens.current = [];
        marqueeTween.current?.kill();
        marqueeTween.current = null;
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  function setMotionPaused(next: boolean) {
    // This helper pauses or resumes the floating and marquee motion during hover or touch.
    floatTweens.current.forEach((t) => {
      if (!t) return;
      if (next) t.pause();
      else t.resume();
    });
    if (marqueeTween.current) {
      if (next) marqueeTween.current.pause();
      else marqueeTween.current.resume();
    }
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative section-pad aurora-blend overflow-x-clip"
    >
      <div className="container-x">
        <SectionHeading eyebrow="Voices" title="What people say" accent="blend" />
      </div>

      <div
        className="relative mt-2 w-full overflow-hidden"
        onMouseEnter={() => setMotionPaused(true)}
        onMouseLeave={() => setMotionPaused(false)}
        onTouchStart={() => setMotionPaused(true)}
        onTouchEnd={() => setMotionPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-5 px-4 py-4 md:px-8 will-change-transform"
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="w-[min(85vw,360px)] shrink-0"
            >
              <article className="group h-full rounded-3xl border border-[var(--surface-border)] bg-[var(--surface)] p-6 md:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-2 hover:border-[rgba(45,212,191,0.45)] hover:shadow-[0_20px_50px_rgba(45,212,191,0.12)]">
                <span
                  className="font-display text-5xl leading-none text-[var(--text)]/15 transition-colors group-hover:text-[var(--ui-accent)]/40"
                  aria-hidden
                >
                  “
                </span>
                <p className="mt-2 text-base md:text-[1.05rem] leading-relaxed text-[var(--text)]/90">
                  {item.quote}
                </p>
                <div className="mt-7 border-t border-[var(--surface-border)] pt-4">
                  <p className="font-semibold tracking-tight">{item.name}</p>
                  <p className="text-sm text-[var(--muted)]">{item.role}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-2 text-center text-xs text-[var(--muted)]">
        Hover to pause the scroll.
      </p>
    </section>
  );
}
