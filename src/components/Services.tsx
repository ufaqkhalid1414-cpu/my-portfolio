"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { services } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useTheme } from "./ThemeProvider";

function ServiceIcon({ type }: { type: (typeof services)[number]["icon"] }) {
  const common = "h-5 w-5";
  if (type === "web") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 8h18" />
      </svg>
    );
  }
  if (type === "db") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    );
  }
  if (type === "game") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="8" width="20" height="10" rx="3" />
        <path d="M8 13h2M9 12v2M15 12.5h.01M17.5 14h.01" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7l7-4z" />
    </svg>
  );
}

export function Services() {
  const [open, setOpen] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { theme, ready } = useTheme();
  useStaggerReveal(listRef, ".js-reveal", { y: 40, stagger: 0.1 });
  const accent = ready && theme === "light" ? "violet" : "blend";

  return (
    <section id="services" className="relative section-pad aurora-blend">
      <div className="container-x relative max-w-4xl">
        <SectionHeading eyebrow="Services" title="My Services" accent={accent} />

        <div ref={listRef}>
          {services.map((service, index) => {
            const isOpen = open === index;
            return (
              <div key={service.id} className="js-reveal border-b border-[var(--surface-border)]">
                <button
                  type="button"
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-soft)] text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <ServiceIcon type={service.icon} />
                  </span>
                  <span className="flex-1 text-lg font-semibold text-[var(--text)] md:text-xl">
                    {service.title}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
                      isOpen
                        ? "border-[var(--ui-accent)]/55 bg-[var(--ui-accent-soft)] text-[var(--ui-accent)] shadow-[0_0_16px_var(--ui-accent-glow)]"
                        : "border-[var(--surface-border)] bg-[var(--surface-soft)] text-[var(--muted)] hover:border-[var(--ui-accent)]/40"
                    }`}
                  >
                    <svg
                      className={`h-4 w-4 transition-transform duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)] ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`grid items-start gap-5 pb-6 pl-0 sm:pl-16 md:grid-cols-[1.15fr_0.85fr] transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                        isOpen
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2.5 opacity-0"
                      }`}
                    >
                      <div>
                        <p className="text-sm leading-relaxed text-[var(--muted)] md:text-[0.95rem]">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-[var(--chip-border)] bg-[var(--chip-bg)] px-3 py-1.5 text-xs font-medium text-[var(--text)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div
                        className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-soft)] transition-all duration-400 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                          isOpen
                            ? "scale-100 opacity-100"
                            : "scale-[0.96] opacity-0"
                        }`}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 360px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
