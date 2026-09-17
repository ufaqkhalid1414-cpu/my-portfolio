import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-ink px-5 py-12 text-cream md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-script text-2xl">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">
            Third-year BSCS student in Gujranwala. Databases, specification, and systems that stay
            coherent.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a className="text-link-accent" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="text-link-accent" href={site.github.href}>
            GitHub
          </a>
          <a className="text-link-accent" href={site.whatsapp.href} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1400px] text-xs text-ink-muted">
        © 2026 {site.name}
      </p>
    </footer>
  )
}
