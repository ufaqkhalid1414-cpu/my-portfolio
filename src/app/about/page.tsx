import { CreamSheet } from '@/components/site/CreamSheet'
import { Reveal } from '@/components/site/Reveal'
import { site } from '@/data/site'

const tools = ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'C++', 'Unity (C#)']

export default function AboutPage() {
  return (
    <>
      <section className="px-5 pt-12 pb-16 md:px-10 md:pt-16">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[0.9] tracking-tight uppercase">
              About
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-6 text-sm md:grid-cols-4">
              <div>
                <dt className="text-ink-muted">Study</dt>
                <dd className="mt-1 text-cream">
                  {site.education.degree}, {site.education.status}
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">CGPA</dt>
                <dd className="mt-1 text-cream">{site.education.cgpa}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Campus</dt>
                <dd className="mt-1 text-cream">{site.education.campus}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Based</dt>
                <dd className="mt-1 text-cream">{site.location}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <CreamSheet className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:gap-10">
          <Reveal>
            <section className="rounded-[32px] bg-cream-deep px-6 py-10 md:px-12 md:py-14">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight md:text-5xl">
              Bio
            </h2>
            <div className="mt-8 max-w-[62ch] space-y-5 text-[1.05rem] leading-relaxed text-ink/75">
              <p>
                I got into building because I dislike information that lives in five places at once.
                A spreadsheet here, a paper register there, a chat thread holding the real answer: that
                is the kind of mess I want to straighten out.
              </p>
              <p>
                That is how the work has gone so far. Smart Campus is a database system for students,
                attendance, and grades. The training and certification project is a full specification
                before a line of product code. Shadow Warrior is a Unity combat game used to put data
                structures into a live loop instead of a worksheet.
              </p>
              <p>
                I am a third-year student at the University of Central Punjab, Gujranwala Campus
                (CGPA 3.45/4.00). Right now I am focused on web systems, relational modeling, and
                writing software I can walk someone through without hiding behind slides.
              </p>
            </div>
          </section>
          </Reveal>

          <Reveal>
            <section className="rounded-[32px] bg-cream-deep px-6 py-10 md:px-12 md:py-14">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight md:text-5xl">
              What I Care About
            </h2>
            <p className="mt-8 max-w-[58ch] text-[1.05rem] leading-relaxed text-ink/75">
              I care about systems that stay coherent when more than one person has to rely on them.
              That usually means getting the schema, the roles, and the workflow right before
              polishing the screen.
            </p>
          </section>
          </Reveal>

          <Reveal>
            <section className="rounded-[32px] bg-cream-deep px-6 py-10 md:px-12 md:py-14">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight md:text-5xl">
              Languages & Tools
            </h2>
            <ul className="mt-8 flex max-w-3xl flex-wrap gap-3">
              {tools.map((tool) => (
                <li key={tool}>
                  <span className="btn-ink inline-flex rounded-full px-5 py-2 text-sm font-medium">
                    {tool}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          </Reveal>

          <Reveal>
            <section className="rounded-[32px] bg-cream-deep px-6 py-10 md:px-12 md:py-14">
            <h2 className="font-display text-3xl font-semibold uppercase tracking-tight md:text-5xl">
              Talk
            </h2>
            <p className="mt-8 max-w-[50ch] text-[1.05rem] leading-relaxed text-ink/75">
              Email if you want a record. WhatsApp if you want a short conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn-ink inline-flex rounded-full px-6 py-3 text-sm font-medium">
                {site.email}
              </a>
              <a
                href={site.whatsapp.href}
                className="btn-accent inline-flex rounded-full px-6 py-3 text-sm font-medium"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </section>
          </Reveal>
        </div>
      </CreamSheet>
    </>
  )
}
