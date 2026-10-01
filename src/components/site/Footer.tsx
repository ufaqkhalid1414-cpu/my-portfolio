import { HashLink } from '@/components/site/HashLink'
import { navLinks, site } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-12 text-cream md:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,0.7fr))]">
        <div>
          <p className="font-script text-2xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            Third-year BSCS student in Gujranwala. Databases, specification, and systems that stay
            coherent.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="mb-1 font-display text-sm font-semibold uppercase tracking-tight">Site</p>
          {navLinks.map((link) => (
            <a key={link.href} className="text-link-accent" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="mb-1 font-display text-sm font-semibold uppercase tracking-tight">Contact</p>
          <a className="text-link-accent" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="text-link-accent" href={site.github.href}>
            GitHub
          </a>
          <a className="text-link-accent" href={site.whatsapp.href} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <HashLink className="text-link-accent" href="/#write">
            Form
          </HashLink>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1400px] text-xs text-ink-muted">
        © 2026 {site.name}
      </p>
    </footer>
  )
}
