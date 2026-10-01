"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/content";
import { gsap, useGSAP, refreshScrollTriggers } from "@/lib/gsap";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { SectionLink } from "./SectionLink";

function LocalTimePKT() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) {
    return (
      <span className="text-xs text-[var(--muted)]" suppressHydrationWarning>
        Local time · — PKT
      </span>
    );
  }

  return (
    <span className="text-xs text-[var(--muted)]">
      Local time · {time} PKT
    </span>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  useStaggerReveal(gridRef, ".js-reveal", { y: 40, stagger: 0.1, once: true });

  /* Project pages: layout footer persists — restore visibility after client nav. */
  useEffect(() => {
    if (!pathname.startsWith("/projects")) return;
    const grid = gridRef.current;
    const word = wordRef.current;
    if (grid) {
      gsap.set(grid.querySelectorAll(".js-reveal"), {
        clearProps: "all",
        opacity: 1,
        y: 0,
      });
    }
    if (word) {
      gsap.set(word, { clearProps: "transform,opacity", opacity: 1, y: 0 });
    }
    const t = window.setTimeout(() => refreshScrollTriggers(), 40);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useGSAP(
    () => {
      const word = wordRef.current;
      const glow = glowRef.current;
      if (!word || !footerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(word, { clearProps: "transform,opacity", opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          word,
          { y: 40, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );

        if (glow) {
          const qx = gsap.quickTo(glow, "x", { duration: 0.6, ease: "power3.out" });
          const qy = gsap.quickTo(glow, "y", { duration: 0.6, ease: "power3.out" });
          const onMove = (e: MouseEvent) => {
            const rect = footerRef.current!.getBoundingClientRect();
            qx(e.clientX - rect.left - rect.width / 2);
            qy(e.clientY - rect.top - rect.height / 2);
          };
          footerRef.current!.addEventListener("mousemove", onMove);
          return () => footerRef.current?.removeEventListener("mousemove", onMove);
        }
      });

      return () => mm.revert();
    },
    { scope: footerRef }
  );

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative mt-4 overflow-hidden pb-2 md:mt-6"
    >
      {/* Soft top glow instead of hard border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--teal)]/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(45,212,191,0.12),transparent_70%)]"
      />

      {/* Wordmark — clipped so it doesn’t add scroll empty space */}
      <div
        ref={wordRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[min(28vw,11rem)] select-none overflow-hidden text-center"
        aria-hidden
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40vw] w-[40vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.18),transparent_65%)] blur-2xl"
        />
        <p className="footer-wordmark relative translate-y-[18%] font-display text-[min(22vw,9rem)] leading-none tracking-tight">
          {site.shortName.toUpperCase()}
        </p>
      </div>

      {/* CTA band */}
      <div className="container-x relative z-10 px-4 pt-10 pb-5 md:pt-12 md:pb-6">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="font-display text-3xl md:text-4xl tracking-tight">
            Have an idea? Let’s build it.
          </p>
          <div className="flex flex-wrap gap-3">
            <SectionLink section="contact" className="btn-soft text-sm">
              Contact Me
            </SectionLink>
            <button
              type="button"
              onClick={copyEmail}
              className="btn-copy-email rounded-full border bg-transparent px-4 py-2 text-sm text-[var(--text)]/80 transition"
            >
              {copied ? "Copied ✓" : "Copy email"}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={gridRef}
        className="container-x relative z-10 px-4 pb-8 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:pb-10"
      >
        <div className="js-reveal">
          <p className="font-display text-2xl">{site.name}</p>
          <p className="mt-3 text-sm text-[var(--muted)] max-w-sm leading-relaxed">
            {site.role}. Clean code. Clear interface. Building products that ship
            and feel considered.
          </p>
          <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-[var(--surface-border)] px-3.5 py-1.5 text-[12px] tracking-[0.02em] text-[var(--muted)]">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inset-0 animate-[heroPulse_2.4s_ease-in-out_infinite] rounded-full status-dot-pulse" />
              <span className="relative h-2 w-2 rounded-full status-dot" />
            </span>
            Available for select projects — 2026
          </div>
          <p className="mt-3">
            <LocalTimePKT />
          </p>
        </div>

        <div className="js-reveal">
          <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)] mb-3">
            Navigate
          </p>
          <ul className="space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <SectionLink
                  section={item.href.replace("#", "")}
                  className="group inline-flex items-center gap-1 text-[var(--text)]/80 transition-transform duration-300 hover:translate-x-1 hover:text-[var(--teal)]"
                >
                  <span className="inline-block -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                  {item.label}
                </SectionLink>
              </li>
            ))}
            <li>
              <SectionLink
                section="contact"
                className="group inline-flex items-center gap-1 text-[var(--text)]/80 transition-transform duration-300 hover:translate-x-1 hover:text-[var(--teal)]"
              >
                <span className="inline-block -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
                Contact
              </SectionLink>
            </li>
          </ul>
        </div>

        <div className="js-reveal">
          <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)] mb-3">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-[var(--text)]">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phoneTel}`} className="hover:text-[var(--text)]">
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                className="hover:text-[var(--text)]"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp · {site.whatsapp}
              </a>
            </li>
          </ul>
        </div>

        <div className="js-reveal">
          <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)] mb-3">
            Social
          </p>
          <div className="flex gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] text-[var(--muted)] transition hover:border-[var(--teal)]/50 hover:text-[var(--text)] hover:shadow-[0_0_18px_rgba(45,212,191,0.35)]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
              </svg>
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] text-[var(--muted)] transition hover:border-[var(--teal)]/50 hover:text-[var(--text)] hover:shadow-[0_0_18px_rgba(45,212,191,0.35)]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 7 9-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="container-x relative z-10 px-4 pb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)] md:pb-6">
        <p>© 2026 {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
