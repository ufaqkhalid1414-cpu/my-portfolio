import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureBlueprint } from "@/components/ArchitectureBlueprint";
import { projects } from "@/data/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "outcome", label: "Outcome" },
    { id: "highlights", label: "Highlights" },
    { id: "stack", label: "Stack" },
  ];

  return (
    <div className="aurora-violet min-h-[50vh]">
      <div className="container-x px-4 pt-16 pb-16 md:pt-20 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
          <aside className="h-fit lg:sticky lg:top-28">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
              On this page
            </p>
            <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="whitespace-nowrap rounded-lg px-2 py-1.5 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--chip-bg)] hover:text-[var(--text)]"
                >
                  {s.label}
                </a>
              ))}
            </nav>
            <Link
              href="/#work"
              className="mt-6 hidden text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)] lg:inline-flex"
            >
              ← All case studies
            </Link>
          </aside>

          <article className="min-w-0 space-y-14">
            <header id="overview" className="scroll-mt-28">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.16em] text-[var(--violet)]">
                <span>{project.category}</span>
                <span className="text-[var(--muted)]" aria-hidden>
                  ·
                </span>
                <span className="text-[var(--muted)]">{project.year}</span>
              </div>
              <h1 className="font-display mt-3 text-4xl leading-[1.08] tracking-tight md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                {project.summary}
              </p>

              <dl className="mt-6 grid gap-4 border-y border-[var(--surface-border)] py-5 sm:grid-cols-3">
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                    Role
                  </dt>
                  <dd className="mt-1 text-sm text-[var(--text)]">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                    Context
                  </dt>
                  <dd className="mt-1 text-sm text-[var(--text)]">{project.context}</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                    Year
                  </dt>
                  <dd className="mt-1 text-sm text-[var(--text)]">{project.year}</dd>
                </div>
              </dl>

              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.35rem] border border-[var(--surface-border)] bg-[var(--surface)]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  priority
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-display text-2xl tracking-tight text-[var(--text)] md:text-[1.65rem]">
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </header>

            <section id="architecture" className="scroll-mt-28">
              <h2 className="font-display text-2xl md:text-3xl">Architecture</h2>
              <p className="mt-3 max-w-2xl text-[var(--muted)] leading-relaxed">
                System map for this build — a closed data loop from input through
                processing and state into the final render surface.
              </p>
              <ArchitectureBlueprint
                className="mt-6"
                title={project.architecture.title}
                caption={project.architecture.caption}
                nodes={project.architecture.nodes}
              />
            </section>

            <section id="problem" className="scroll-mt-28 max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl">Problem</h2>
              <p className="mt-4 text-[1.02rem] leading-[1.75] text-[var(--muted)]">
                {project.problem}
              </p>
            </section>

            <section id="approach" className="scroll-mt-28 max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl">Approach</h2>
              <p className="mt-4 text-[1.02rem] leading-[1.75] text-[var(--muted)]">
                {project.approach}
              </p>
            </section>

            <section id="outcome" className="scroll-mt-28 max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl">Outcome</h2>
              <p className="mt-4 text-[1.02rem] leading-[1.75] text-[var(--muted)]">
                {project.result}
              </p>
            </section>

            <section id="highlights" className="scroll-mt-28 max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl">Highlights</h2>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[1.02rem] leading-relaxed text-[var(--muted)]"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--violet)]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="stack" className="scroll-mt-28">
              <h2 className="font-display text-2xl md:text-3xl">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--chip-border)] bg-[var(--chip-bg)] px-3.5 py-1.5 text-sm text-[var(--text)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap gap-3 border-t border-[var(--surface-border)] pt-10">
              <Link href="/#work" className="btn-soft">
                More case studies
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
