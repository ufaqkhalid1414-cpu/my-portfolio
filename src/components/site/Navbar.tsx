'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks, site } from '@/data/site'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 h-16 bg-ink/90 backdrop-blur-md md:h-[72px]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-5 md:px-10">
        <Link
          href="/"
          className="font-script text-[1.65rem] leading-none text-cream md:text-[1.85rem]"
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || (link.href === '/work' && pathname.startsWith('/work'))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm tracking-wide ${active ? 'is-active' : ''}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="btn-accent rounded-full px-5 py-2 text-sm font-medium"
          >
            {site.cta}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-4 flex-col gap-1.5">
              <span className={`h-px w-full bg-cream ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
              <span className={`h-px w-full bg-cream ${open ? 'opacity-0' : ''}`} />
              <span className={`h-px w-full bg-cream ${open ? '-translate-y-[8px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-cream/10 bg-ink px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
