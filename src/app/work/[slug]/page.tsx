import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CreamSheet } from '@/components/site/CreamSheet'
import { ProcessTimeline, WbsBreakdown } from '@/components/site/ProcessTimeline'
import { Reveal } from '@/components/site/Reveal'
import { VisualSlot } from '@/components/site/VisualSlot'
import { caseStudies, getCaseStudy, getNextCaseStudy, getPreviousCaseStudy } from '@/data/work'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }))
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = getCaseStudy(slug)
  if (!project) notFound()

  const nextProject = getNextCaseStudy(project.slug)
  const previousProject = getPreviousCaseStudy(project.slug)
  const wide = project.visuals.filter((visual) => visual.size === 'wide')
  const primary = project.visuals.filter((visual) => visual.size === 'primary')
  const support = project.visuals.filter((visual) => visual.size === 'support')
  const behind = project.visuals.filter((visual) => visual.size === 'behind')
  const isCert = project.slug === 'certification-system'

  return (
    <>
      <section className="px-5 pt-12 pb-10 md:px-10 md:pt-16">
        <div className="mx-auto grid max-w-[1400px] gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <Reveal>
            <h1 className="font-display text-[clamp(2.8rem,7vw,5.2rem)] font-semibold leading-[0.9] tracking-tight uppercase">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-[40ch] text-lg leading-relaxed text-ink-muted lg:justify-self-end">
              {project.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      <CreamSheet className="px-5 py-16 md:px-10 md:py-24">
        <article className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
                  The Challenge
                </h2>
                <p className="mt-4 max-w-[58ch] leading-relaxed text-ink/75">{project.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="lg:mt-10">
                <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
                  The Approach
                </h2>
                <p className="mt-4 max-w-[58ch] leading-relaxed text-ink/75">{project.approach}</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">The Work</h2>
            {isCert ? (
              <div className="mt-8 space-y-12">
                <div>
                  <p className="mb-4 text-sm text-ink/60">Build sequence</p>
                  <ProcessTimeline />
                </div>
                <div>
                  <p className="mb-4 text-sm text-ink/60">Work breakdown</p>
                  <WbsBreakdown />
                </div>
              </div>
            ) : (
              <>
                {wide.length > 0 ? (
                  <div className="mt-8 grid grid-cols-1 gap-6">
                    {wide.map((visual, index) => (
                      <Reveal key={visual.src} delay={Math.min(index * 0.06, 0.18)}>
                        <VisualSlot src={visual.src} label={visual.label} wide />
                      </Reveal>
                    ))}
                  </div>
                ) : null}
                <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${wide.length > 0 ? 'mt-6' : 'mt-8'}`}>
                  {primary.map((visual, index) => (
                    <Reveal key={visual.src} delay={index * 0.06}>
                      <VisualSlot src={visual.src} label={visual.label} />
                    </Reveal>
                  ))}
                </div>
                {support.length > 0 ? (
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {support.map((visual, index) => (
                      <Reveal key={visual.src} delay={index * 0.06}>
                        <VisualSlot src={visual.src} label={visual.label} />
                      </Reveal>
                    ))}
                  </div>
                ) : null}
                {behind.length > 0 ? (
                  <div className="mt-10">
                    <p className="mb-4 text-sm text-ink/60">Behind the design</p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {behind.map((visual, index) => (
                        <Reveal key={visual.src} delay={index * 0.06}>
                          <VisualSlot src={visual.src} label={visual.label} />
                        </Reveal>
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <Reveal>
            <div className="mt-16 max-w-[62ch]">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-tight">
                The Outcome
              </h2>
              <p className="mt-4 leading-relaxed text-ink/75">{project.outcome}</p>
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 items-start gap-6 border-t border-ink/10 pt-10">
            {previousProject ? (
              <Link
                href={`/work/${previousProject.slug}`}
                className="text-link-accent justify-self-start text-left text-sm leading-snug md:text-base"
              >
                ← Previous project
                <span className="mt-1 block text-ink/70">{previousProject.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="text-link-accent justify-self-end text-right text-sm leading-snug md:text-base"
              >
                Next project →
                <span className="mt-1 block text-ink/70">{nextProject.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>
      </CreamSheet>
    </>
  )
}
