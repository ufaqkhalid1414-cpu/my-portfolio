'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import { navLinks, profile } from '../data/profile'
import { scrollToHash } from '../lib/scrollToHash'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((node): node is HTMLElement => node instanceof HTMLElement)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`)
        }
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onHashClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault()
    setOpen(false)
    scrollToHash(hash)
    window.history.pushState(null, '', hash)
    setActive(hash)
  }

  return (
    <header className={`nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav glass-nav" aria-label="Primary">
        <a className="nav-logo" href="#home" onClick={(event) => onHashClick(event, '#home')}>
          {profile.name}
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span />
          <span />
          <span />
        </button>

        <ul id="primary-nav" className={`nav-links ${open ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href ? 'is-active' : undefined}
                onClick={(event) => onHashClick(event, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
