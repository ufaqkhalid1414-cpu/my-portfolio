"use client";

import { FormEvent, useRef, useState } from "react";
import { site } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useTheme } from "./ThemeProvider";

export function Contact() {
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { theme, ready } = useTheme();
  useStaggerReveal(formRef, ".js-reveal", { y: 24, stagger: 0.08 });

  const accent = ready && theme === "light" ? "amber" : "teal";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const type = String(data.get("type") || "");
    const message = String(data.get("message") || "");
    const text = `Hi Ufaq, I'm ${name}. (${email}) Project: ${type}. ${message}`;
    const phone = site.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
    setStatus("Opening WhatsApp with your message…");
  }

  return (
    <section
      id="contact"
      className={`relative section-pad ${
        accent === "amber" ? "aurora-amber" : "aurora-teal"
      }`}
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Have a project in mind"
          accent={accent}
        />
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div className="text-center lg:text-left">
            <p className="text-[var(--muted)] leading-relaxed max-w-md mx-auto lg:mx-0">
              Tell me what you want to build. I’ll reply with a clear next step —
              scope, timeline, and whether I’m the right fit.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li>
                <span className="text-[var(--muted)]">Email · </span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[var(--contact-accent)] hover:underline"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <span className="text-[var(--muted)]">Phone · </span>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="text-[var(--contact-accent)] hover:underline"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <span className="text-[var(--muted)]">WhatsApp · </span>
                <a
                  href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                  className="text-[var(--contact-accent)] hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="glass-strong rounded-3xl p-6 md:p-8 space-y-4"
          >
            <div className="js-reveal">
              <label className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Name
              </label>
              <input
                name="name"
                required
                className="mt-2 w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--contact-accent-soft)]"
                placeholder="Your name"
              />
            </div>
            <div className="js-reveal">
              <label className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--contact-accent-soft)]"
                placeholder="you@email.com"
              />
            </div>
            <div className="js-reveal">
              <label className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Project type
              </label>
              <input
                name="type"
                className="mt-2 w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--contact-accent-soft)]"
                placeholder="Web app / DBMS / Game / Other"
              />
            </div>
            <div className="js-reveal">
              <label className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="mt-2 w-full rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] outline-none focus:border-[var(--contact-accent-soft)] resize-y"
                placeholder="What are we building?"
              />
            </div>
            <div className="js-reveal">
              <button type="submit" className="btn-whatsapp w-full sm:w-auto">
                Send via WhatsApp
              </button>
            </div>
            {status && (
              <p className="text-sm text-[var(--contact-accent)]">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
