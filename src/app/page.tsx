import Link from 'next/link'
import { ContactForm } from '@/components/site/ContactForm'
import { HashLink } from '@/components/site/HashLink'
import { CreamSheet } from '@/components/site/CreamSheet'
import { FaqList } from '@/components/site/FaqList'
import { Hero3DSlot } from '@/components/site/Hero3DSlot'
import { ProjectCard } from '@/components/site/ProjectCard'
import { Reveal } from '@/components/site/Reveal'
import { howIWork, projectNotes, services, site } from '@/data/site'
import { caseStudies } from '@/data/work'

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100dvh] overflow-hidden px-5 pt-10 pb-20 md:px-10 md:pt-16">
        <div className="mx-auto grid max-w-[1400px] items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Reveal>
              <p className="text-sm text-ink-muted">Hey, I&apos;m {site.firstName}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.92] tracking-tight uppercase">
                I build systems that hold up under pressure
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-ink-muted">
                I design and build systems that stay coherent when more than one person has to rely on
                them.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-accent inline-flex rounded-full px-6 py-3 text-sm font-medium">
                  {site.cta}
                </Link>
                <HashLink
                  href="/#work"
                  className="inline-flex rounded-full border border-cream/25 px-6 py-3 text-sm font-medium text-cream transition hover:border-cream/50"
                >
                  Recent projects
                </HashLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Hero3DSlot />
            <p className="mt-3 text-center text-xs tracking-wide text-ink-muted">3D character</p>
          </Reveal>
        </div>
      </section>

      <CreamSheet className="px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <section id="services">
              <h2 className="font-display text-4xl font-semibold tracking-tight uppercase md:text-6xl">
                Services
              </h2>
              <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink/70">
                What I can show from coursework, not a company menu. Each line maps to a case study.
              </p>
              <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
                {services.map((item, index) => (
                  <li
                    key={item.title}
                    className={`max-w-[40ch] ${index === 1 ? 'md:mt-10' : index === 2 ? 'md:mt-4' : index === 3 ? 'md:mt-14' : ''}`}
                  >
                    <Reveal delay={index * 0.06}>
                      <p className="text-sm text-accent">{String(index + 1).padStart(2, '0')}</p>
                      <p className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight">
                        {item.title}
                      </p>
                      <p className="mt-3 leading-relaxed text-ink/70">{item.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <section id="work" className="mt-24 md:mt-32">
            <Reveal>
              <h2 className="font-display text-4xl font-semibold tracking-tight uppercase md:text-6xl">
                Recent projects
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
              {caseStudies.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.08} className="h-full">
                  <ProjectCard
                    href={`/work/${project.slug}`}
                    title={project.title}
                    description={project.preview}
                    thumbnail={project.thumbnail}
                    image={project.cover}
                  />
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </CreamSheet>

      <section className="bg-cream px-5 pb-20 pt-4 text-ink md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight uppercase md:text-5xl">
              How I work
            </h2>
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {howIWork.map((item, index) => (
              <li
                key={item.title}
                className={`max-w-[32ch] ${index === 1 ? 'md:mt-8' : index === 2 ? 'md:mt-16' : ''}`}
              >
                <Reveal delay={index * 0.08}>
                  <p className="font-display text-2xl font-semibold uppercase tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-3 leading-relaxed text-ink/70">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="testimonials" className="bg-cream px-5 pb-20 text-ink md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight uppercase md:text-5xl">
              Testimonials
            </h2>
            <p className="mt-5 max-w-[54ch] text-[1.05rem] leading-relaxed text-ink/70">
              I have not done paid client work, so there are no invented reviewer names. These are
              claims from my case studies. I can walk through each one.
            </p>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {projectNotes.map((item, index) => (
              <li key={item.href}>
                <Reveal delay={index * 0.08} className="h-full">
                  <blockquote className="flex h-full flex-col border border-ink/10 px-6 py-7 md:px-7 md:py-8">
                    <p className="text-xs tracking-[0.18em] text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink/80 md:text-[0.95rem]">
                      {item.quote}
                    </p>
                    <footer className="mt-auto pt-8">
                      <Link href={item.href} className="text-link-accent text-sm font-medium">
                        {item.source}
                      </Link>
                    </footer>
                  </blockquote>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="bg-cream px-5 pb-20 text-ink md:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight uppercase md:text-5xl">
              FAQ
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-10 max-w-3xl">
            <FaqList />
          </Reveal>
        </div>
      </section>

      <section id="cta" className="bg-cream px-5 pb-16 text-ink md:px-10">
        <div className="mx-auto max-w-[1400px] rounded-[32px] bg-ink px-6 py-12 text-cream md:px-12 md:py-16">
          <Reveal>
            <h2 className="max-w-[12ch] font-display text-4xl font-semibold tracking-tight uppercase md:text-6xl">
              Look through the work, then write.
            </h2>
            <p className="mt-5 max-w-[42ch] text-[1.05rem] leading-relaxed text-ink-muted">
              Email if you want a record. WhatsApp if you want a short conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <HashLink href="/#write" className="btn-accent inline-flex rounded-full px-6 py-3 text-sm font-medium">
                {site.cta}
              </HashLink>
              <Link href="/work" className="btn-ghost-cream inline-flex rounded-full px-6 py-3 text-sm font-medium">
                Read the case studies
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="write" className="bg-cream px-5 pb-28 text-ink md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Reveal>
            <div className="rounded-[32px] bg-cream-deep p-6 md:p-10">
              <h2 className="font-display text-3xl font-semibold uppercase tracking-tight md:text-4xl">
                Write to me
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
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
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}
