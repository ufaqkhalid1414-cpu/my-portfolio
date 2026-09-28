"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useTheme } from "./ThemeProvider";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { theme, ready } = useTheme();
  useStaggerReveal(listRef, ".js-reveal", { y: 40, stagger: 0.1 });
  const accent = ready && theme === "light" ? "amber" : "blend";

  return (
    <section id="faq" className="relative section-pad aurora-blend overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_300px_at_20%_10%,rgba(45,212,191,0.09),transparent_55%),radial-gradient(480px_260px_at_90%_80%,rgba(167,139,250,0.1),transparent_50%)]" />
      <div className="container-x relative max-w-5xl">
        <SectionHeading eyebrow="FAQ" title="Quick answers" accent={accent} />

        <div className="relative mx-auto max-w-3xl">
          <div
            className="pointer-events-none absolute left-[1.35rem] top-4 bottom-4 w-px md:left-[1.6rem]"
            style={{ background: "var(--faq-spine)" }}
            aria-hidden
          />

          <div ref={listRef} className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              return (
                <div
                  key={item.q}
                  className={`js-reveal relative overflow-hidden rounded-[1.4rem] border backdrop-blur-md transition-all duration-300 ${
                    isOpen
                      ? "border-[var(--surface-border)] shadow-[0_0_40px_var(--faq-accent-glow)]"
                      : "border-[var(--surface-border)] bg-[var(--surface-soft)] hover:bg-[var(--surface)]"
                  }`}
                  style={
                    isOpen
                      ? { background: "var(--faq-card-open)" }
                      : undefined
                  }
                >
                  <div
                    className="absolute inset-y-0 left-0 w-1 opacity-80"
                    style={{ background: "var(--faq-rail)" }}
                  />
                  <button
                    type="button"
                    className="relative flex w-full items-start gap-4 px-5 py-5 pl-6 text-left md:gap-5 md:px-7 md:py-6 md:pl-8"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-sm transition-all ${
                        isOpen
                          ? "shadow-[0_0_18px_var(--faq-accent-glow)]"
                          : "border border-[var(--surface-border)] bg-[var(--surface)] text-[var(--muted)]"
                      }`}
                      style={
                        isOpen
                          ? {
                              background: "var(--faq-accent)",
                              color: "var(--faq-accent-ink)",
                            }
                          : undefined
                      }
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 pt-1">
                      <span className="block font-semibold text-base text-[var(--text)] md:text-lg">
                        {item.q}
                      </span>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.span
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="mt-3 block overflow-hidden text-sm leading-relaxed text-[var(--muted)]"
                          >
                            {item.a}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-[var(--faq-accent)]/40 bg-[var(--faq-accent-soft)] text-[var(--faq-accent)]"
                          : "border-[var(--surface-border)] bg-[var(--surface-soft)] text-[var(--muted)]"
                      }`}
                      aria-hidden
                    >
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
