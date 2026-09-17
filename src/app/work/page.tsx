import { CreamSheet } from '@/components/site/CreamSheet'
import { ProjectCard } from '@/components/site/ProjectCard'
import { Reveal } from '@/components/site/Reveal'
import { caseStudies } from '@/data/work'

export default function WorkIndexPage() {
  return (
    <>
      <section className="px-5 pt-12 pb-10 md:px-10 md:pt-16">
        <div className="mx-auto max-w-[1400px] lg:max-w-[70%]">
          <Reveal>
            <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[0.9] tracking-tight uppercase">
              Work
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[42ch] text-ink-muted">
              Three case studies. Each one has its own page.
            </p>
          </Reveal>
        </div>
      </section>

      <CreamSheet className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-stretch gap-8 md:grid-cols-3">
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
      </CreamSheet>
    </>
  )
}
