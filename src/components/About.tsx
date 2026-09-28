"use client";

import { useRef, useState } from "react";
import { aboutSteps, site } from "@/data/content";
import { SectionOrnament } from "./SectionOrnament";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLLIElement | null)[]>([]);
  const dotsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const steps = stepsRef.current.filter(Boolean) as HTMLLIElement[];
      if (!steps.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(steps, { clearProps: "all", opacity: 1, x: 0 });
        steps.forEach((step) => {
          const num = step.querySelector("[data-num]");
          const title = step.querySelector("[data-title]");
          gsap.set([num, title].filter(Boolean), {
            clearProps: "all",
            color: "",
            x: 0,
          });
        });
      });

      mm.add(
        "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(steps, { opacity: 1 });
          steps.forEach((step) => {
            gsap.fromTo(
              step,
              { y: 32, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: step,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        }
      );

      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          function applyActive(index: number) {
            activeRef.current = index;
            setActiveIndex(index);

            steps.forEach((s, i) => {
              const isOn = i === index;
              gsap.to(s, {
                opacity: isOn ? 1 : 0.3,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
              });
              const n = s.querySelector<HTMLElement>("[data-num]");
              const t = s.querySelector<HTMLElement>("[data-title]");
              if (n) {
                gsap.to(n, {
                  color: isOn ? "var(--ui-accent)" : "var(--text)",
                  opacity: isOn ? 1 : 0.35,
                  duration: 0.5,
                  ease: "power3.out",
                  overwrite: "auto",
                });
                if (isOn) {
                  gsap.fromTo(
                    n,
                    { y: 8 },
                    { y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" }
                  );
                }
              }
              if (t && isOn) {
                gsap.fromTo(
                  t,
                  { x: 16 },
                  { x: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" }
                );
              }
            });

            dotsRef.current.forEach((dot, i) => {
              if (!dot) return;
              gsap.to(dot, {
                backgroundColor:
                  i === index ? "var(--ui-accent)" : "color-mix(in srgb, var(--text) 22%, transparent)",
                boxShadow:
                  i === index ? "0 0 10px var(--ui-accent-glow)" : "none",
                scale: i === index ? 1.15 : 1,
                duration: 0.4,
                ease: "power3.out",
                overwrite: "auto",
              });
            });
          }

          gsap.set(steps, { opacity: 0.3 });
          applyActive(0);

          steps.forEach((step, index) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 50%",
              end: "bottom 50%",
              onEnter: () => applyActive(index),
              onEnterBack: () => applyActive(index),
            });
          });
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  function scrollToStep(index: number) {
    const el = stepsRef.current[index];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative aurora-blend px-4 py-20 md:px-6 md:py-28"
    >
      <div className="container-x grid gap-14 min-[900px]:grid-cols-[0.4fr_0.55fr] min-[900px]:gap-[5%] min-[900px]:items-start">
        <div className="min-[900px]:sticky min-[900px]:top-[120px] min-[900px]:self-start">
          <p className="text-xs tracking-[0.2em] uppercase text-[var(--muted)] mb-3">
            — How I build
          </p>
          <h2 className="font-display tracking-tight leading-[1.1] text-[clamp(2.2rem,4.5vw,3.75rem)]">
            A calm, predictable process — no surprises.
          </h2>
          <SectionOrnament accent="blend" className="!justify-start mt-5" />
          <p className="mt-8 max-w-[380px] text-[var(--muted)] leading-relaxed text-[16px] md:text-[17px]">
            I care about clarity — in the system, the interface, and the way a
            project is told. Whether it’s a campus admin panel, an algorithm
            game, or an engineering pipeline, I design for something you can
            demo, extend, and ship with confidence.
          </p>
          <p className="mt-6 text-sm text-[var(--muted)]">— {site.name}</p>
        </div>

        <div className="relative flex gap-6 min-[900px]:gap-10">
          <div
            className="sticky top-[40%] hidden h-fit flex-col gap-3 self-start min-[900px]:flex"
            role="tablist"
            aria-label="Process steps"
          >
            {aboutSteps.map((step, i) => (
              <button
                key={step.id}
                type="button"
                ref={(el) => {
                  dotsRef.current[i] = el;
                }}
                aria-label={`Go to step ${step.id}`}
                aria-current={activeIndex === i ? "step" : undefined}
                onClick={() => scrollToStep(i)}
                className={`block h-2 w-2 rounded-full transition-colors ${
                  activeIndex === i
                    ? "bg-[var(--ui-accent)] shadow-[0_0_10px_var(--ui-accent-glow)]"
                    : "bg-[var(--text)]/20 hover:bg-[var(--text)]/40"
                }`}
              />
            ))}
          </div>

          <ol className="m-0 min-w-0 flex-1 list-none p-0">
            {aboutSteps.map((step, index) => {
              const isLast = index === aboutSteps.length - 1;
              return (
                <li
                  key={step.id}
                  ref={(el) => {
                    stepsRef.current[index] = el;
                  }}
                  className={`flex min-h-[45vh] flex-col justify-center gap-3 py-10 min-[900px]:min-h-[60vh] min-[900px]:py-8 ${
                    isLast ? "min-[900px]:pb-[35vh]" : ""
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    Step {step.id}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                    <span
                      data-num
                      className="font-display tabular-nums leading-none text-[clamp(2.5rem,5vw,4rem)] text-[var(--text)]/35"
                    >
                      {step.id}
                    </span>
                    <div className="min-w-0">
                      <h3
                        data-title
                        className="font-display text-[1.5rem] font-semibold tracking-tight text-[var(--text)] md:text-[1.75rem]"
                      >
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[480px] text-[16px] leading-relaxed text-[var(--muted)] md:text-[18px]">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
