"use client";

import { useRef, useState } from "react";
import { site } from "@/data/content";
import { gsap, useGSAP, splitWordsMasked } from "@/lib/gsap";
import { Navbar } from "./Navbar";
import { SectionLink } from "./SectionLink";

export function Hero() {
  // This component renders the hero section, plays its entrance animation, and handles the sound toggle.
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLVideoElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLSpanElement>(null);
  const [muted, setMuted] = useState(true);

  useGSAP(
    () => {
      // This animation setup reveals the hero text, buttons, and scroll cue when the page loads.
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // This branch shows the hero content instantly when reduced motion is preferred.
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
        // This branch animates the hero content with masked title words and staggered fades.
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
          // This cleanup restores the original title text after the split-word animation helper runs.
          split.revert?.();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  function toggleMute() {
    // This click handler toggles the background audio between muted and unmuted states.
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
    if (!next) {
      void audio.play().catch(() => {});
    }
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pb-16 md:pb-20"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hero-visual" aria-hidden />
        <div className="hero-overlay" aria-hidden />
        <div className="hero-overlay-vignette" aria-hidden />
      </div>

      <video
        ref={audioRef}
        src="/media/hero-bg.mp4"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />

      <div className="relative z-20">
        <Navbar />
      </div>

      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-4 z-30 inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium text-[var(--text)] backdrop-blur-md transition hover:border-[var(--teal)] md:bottom-8 md:right-8"
        aria-label={muted ? "Unmute background audio" : "Mute background audio"}
      >
        {muted ? "Sound on" : "Sound off"}
      </button>

      <div className="hero-copy container-x relative z-10 mx-auto flex w-full max-w-[900px] flex-1 flex-col items-center justify-center px-4 pt-6 text-center md:px-6 md:pt-8">
        <div
          ref={pillRef}
          className="hero-pill inline-flex items-center gap-2.5 rounded-full border px-[14px] py-[6px] text-[13px] tracking-[0.02em]"
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inset-0 animate-[heroPulse_2.4s_ease-in-out_infinite] rounded-full status-dot-pulse" />
            <span className="relative h-2 w-2 rounded-full status-dot" />
          </span>
          Available for select projects — 2026
        </div>

        <h1
          ref={titleRef}
          className="hero-heading mt-6 font-display font-semibold leading-[0.95] tracking-[-0.02em] text-[clamp(3.5rem,9vw,8rem)]"
        >
          {site.name}
        </h1>

        <p
          ref={subRef}
          className="hero-subline mt-3 max-w-[40ch] font-display text-[clamp(1.25rem,3vw,2rem)] italic leading-snug"
        >
          Software engineer &amp; full-stack builder.
        </p>

        <p
          ref={paraRef}
          className="hero-body mt-6 max-w-[520px] text-[18px] leading-[1.6] md:text-[20px]"
        >
          {site.heroLine}
        </p>

        <div
          ref={ctasRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <SectionLink section="work" className="btn-neon hero-cta-neon">
            View my work →
          </SectionLink>
          <SectionLink section="contact" className="btn-soft hero-cta-soft">
            Let’s talk
          </SectionLink>
        </div>
      </div>

      <div
        ref={metaRef}
        className="container-x relative z-10 mx-auto mt-12 w-full max-w-[900px] px-4 md:mt-16 md:px-6"
      >
        <div className="hero-meta flex flex-col items-center gap-4 text-[12px] sm:flex-row sm:justify-between">
          <span>Full-stack builder</span>
          <span>Currently: coursework → ship-ready work</span>
          <SectionLink
            section="about"
            className="hero-meta-link inline-flex items-center gap-1.5 transition-colors"
          >
            Scroll
            <span ref={scrollCueRef} className="inline-block" aria-hidden>
              ↓
            </span>
          </SectionLink>
        </div>
      </div>
    </section>
  );
}
