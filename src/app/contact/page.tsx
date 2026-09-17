import { ContactForm } from '@/components/site/ContactForm'
import { CreamSheet } from '@/components/site/CreamSheet'
import { Reveal } from '@/components/site/Reveal'
import { site } from '@/data/site'

export default function ContactPage() {
  return (
    <>
      <section className="px-5 pt-12 pb-10 md:px-10 md:pt-16">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h1 className="font-display text-[clamp(3.4rem,10vw,6.5rem)] font-semibold leading-[0.88] tracking-tight uppercase">
              Contact
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[42ch] text-ink-muted">
              Email stays. WhatsApp opens a chat to me with what you typed. I reply within a day if I
              cannot pick up immediately.
            </p>
          </Reveal>
        </div>
      </section>

      <CreamSheet className="px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Reveal>
            <div className="rounded-[32px] bg-cream-deep p-6 md:p-10">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:pt-8">
            <p className="font-display text-2xl font-semibold uppercase tracking-tight">Direct</p>
            <ul className="mt-6 space-y-4 text-[1.05rem]">
              <li>
                <a className="text-link-accent" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li>
                <a className="text-link-accent" href={site.phoneHref}>
                  {site.phone}
                </a>
              </li>
              <li>
                <a className="text-link-accent" href={site.github.href}>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp.href}
                  className="btn-accent mt-2 inline-flex rounded-full px-5 py-2 text-sm font-medium"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </CreamSheet>
    </>
  )
}
