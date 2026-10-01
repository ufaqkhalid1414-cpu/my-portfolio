"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { site } from "@/data/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { active, navigateTo, toRootHref } = useActiveSection();
  const headerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const pill = pillRef.current;
      const nav = navRef.current;
      const contact = contactRef.current;
      if (!pill) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const shrink = () => {
          pill.classList.add("is-scrolled");
          gsap.to(pill, {
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 10,
            paddingRight: 10,
            maxWidth: 720,
            backdropFilter: "blur(16px)",
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (nav) {
            gsap.to(nav, {
              gap: 10,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
          if (contact) {
            gsap.to(contact, {
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 12,
              paddingRight: 12,
              fontSize: 12,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        const expand = () => {
          pill.classList.remove("is-scrolled");
          gsap.to(pill, {
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
            maxWidth: 800,
            backdropFilter: "blur(24px)",
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
          if (nav) {
            gsap.to(nav, {
              gap: 20,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
          if (contact) {
            gsap.to(contact, {
              paddingTop: 8,
              paddingBottom: 8,
              paddingLeft: 16,
              paddingRight: 16,
              fontSize: 14,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        };

        gsap.timeline({
          scrollTrigger: {
            start: 80,
            end: 81,
            onEnter: shrink,
            onLeaveBack: expand,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: headerRef }
  );

  function onNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    e.preventDefault();
    setOpen(false);
    navigateTo(href);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 px-3 pt-4 pr-14 md:px-6 md:pr-20 md:pt-5"
      style={{ minHeight: 72 }}
    >
      <div
        ref={pillRef}
        className="nav-pill mx-auto flex w-full max-w-[800px] items-center gap-2 rounded-full border px-2.5 py-2 backdrop-blur-xl sm:gap-3 sm:px-3 md:px-4"
      >
        <Link
          href="/#home"
          className="nav-logo"
          aria-label={site.name}
          onClick={(e) => onNavClick(e, "/#home")}
        >
          <span className="nav-logo-letter">U</span>
        </Link>

        <nav
          ref={navRef}
          className="hidden min-w-0 flex-1 items-center justify-center gap-3 lg:flex xl:gap-5"
        >
          {site.nav.map((item) => {
            const isActive = active === item.href;
            const href = toRootHref(item.href);
            return (
              <Link
                key={item.href}
                href={href}
                onClick={(e) => onNavClick(e, href)}
                className={`nav-link inline-flex shrink-0 items-center gap-1.5 text-[13px] xl:text-sm transition-colors duration-300 ${
                  isActive ? "is-active" : ""
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-[var(--status-dot)] shadow-[0_0_8px_var(--logo-glow-soft)] transition-all duration-300 ${
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                  aria-hidden
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <Link
            ref={contactRef}
            href="/#contact"
            className="btn-contact-glow hidden text-sm px-4 py-2 sm:inline-flex"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              navigateTo("/#contact");
            }}
          >
            Contact Me
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-soft)] text-[var(--text)] transition hover:opacity-90 lg:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-[18px] flex-col gap-[5px]" aria-hidden>
              <span
                className={`h-[2px] w-full rounded-full bg-current transition-transform ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-full bg-current transition-opacity ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full rounded-full bg-current transition-transform ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="mx-auto mt-2 max-w-5xl rounded-3xl border border-[var(--surface-border)] p-4 backdrop-blur-xl lg:hidden"
          style={{ background: "var(--nav-menu-bg)" }}
        >
          <div className="flex flex-col gap-3">
            {site.nav.map((item) => {
              const href = toRootHref(item.href);
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={`nav-link transition-colors duration-300 ${
                    active === item.href ? "is-active" : ""
                  }`}
                  onClick={(e) => onNavClick(e, href)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              className="btn-contact-glow w-fit text-sm"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                navigateTo("/#contact");
              }}
            >
              Contact Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
