import Link from 'next/link'
import { CreamSheet } from '@/components/site/CreamSheet'
import { Hero3DSlot } from '@/components/site/Hero3DSlot'
import { ProjectCard } from '@/components/site/ProjectCard'
import { Reveal } from '@/components/site/Reveal'
import { headlineOptions, howIWork, site } from '@/data/site'
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
                {headlineOptions[0]}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[36ch] text-base leading-relaxed text-ink-muted">
                I design and build systems that stay coherent when more than one person has to rely on
                them.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Hero3DSlot />
          </Reveal>
        </div>
      </section>

      <CreamSheet id="work" className="px-5 pb-24 pt-16 md:px-10 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight uppercase md:text-6xl">
              Selected work
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
        </div>
      </CreamSheet>

      <section className="bg-cream px-5 pb-28 pt-4 text-ink md:px-10">
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
          <Reveal delay={0.12}>
            <Link href="/work" className="btn-ink mt-16 inline-flex rounded-full px-6 py-3 text-sm font-medium">
              Read the case studies
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
