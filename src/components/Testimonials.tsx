"use client";

import { useRef } from "react";
import { testimonials } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { gsap, useGSAP } from "@/lib/gsap";

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatTweens = useRef<ReturnType<typeof gsap.to>[]>([]);

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length || !sectionRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, {
          clearProps: "transform,opacity",
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(cards, { opacity: 0, y: 48, scale: 0.9 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
            onLeaveBack: () => {
              floatTweens.current.forEach((t) => t?.kill());
              floatTweens.current = [];
              gsap.set(cards, { opacity: 0, y: 48, scale: 0.9 });
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
            i * 0.12
          );
        });
      });

      return () => {
        floatTweens.current.forEach((t) => t.kill());
        floatTweens.current = [];
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  function setFloatPaused(next: boolean) {
    floatTweens.current.forEach((t) => {
      if (!t) return;
      if (next) t.pause();
      else t.resume();
    });
  }

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative section-pad aurora-blend overflow-x-clip"
    >
      <div className="container-x">
        <SectionHeading eyebrow="Voices" title="What people say" accent="blend" />
        <div
          ref={scroller}
          className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setFloatPaused(true)}
          onMouseLeave={() => {
            setFloatPaused(false);
            if (scroller.current) scroller.current.dataset.drag = "0";
          }}
          onMouseDown={(e) => {
            const el = scroller.current;
            if (!el) return;
            setFloatPaused(true);
            el.dataset.drag = "1";
            el.dataset.startX = String(e.pageX - el.offsetLeft);
            el.dataset.scrollLeft = String(el.scrollLeft);
          }}
          onMouseUp={() => {
            setFloatPaused(false);
            if (scroller.current) scroller.current.dataset.drag = "0";
          }}
          onMouseMove={(e) => {
            const el = scroller.current;
            if (!el || el.dataset.drag !== "1") return;
            e.preventDefault();
            const startX = Number(el.dataset.startX || 0);
            const scrollLeft = Number(el.dataset.scrollLeft || 0);
            const x = e.pageX - el.offsetLeft;
            el.scrollLeft = scrollLeft - (x - startX);
          }}
        >
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="snap-start shrink-0 w-[min(85vw,360px)]"
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
        <p className="mt-3 text-xs text-[var(--muted)] text-center">
          Drag or swipe to browse.
        </p>
      </div>
    </section>
  );
}
