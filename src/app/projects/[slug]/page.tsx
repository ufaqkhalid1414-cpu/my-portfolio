import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    { id: "problem", label: "Problem" },
    { id: "approach", label: "Approach" },
    { id: "result", label: "Result" },
    { id: "stack", label: "Stack" },
    { id: "links", label: "Links" },
  ];

  return (
    <div className="aurora-violet min-h-[50vh]">
      <div className="container-x px-4 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          <aside className="lg:sticky lg:top-28 h-fit glass rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)] mb-3">
              On this page
            </p>
            <nav className="flex lg:flex-col gap-2 overflow-x-auto">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-[var(--muted)] hover:text-[var(--text)] whitespace-nowrap"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="space-y-12">
            <header id="overview">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--violet)]">
                {project.category}
              </p>
              <h1 className="font-display text-4xl md:text-5xl mt-2">{project.title}</h1>
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl border border-[var(--surface-border)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </header>

            <section id="problem">
              <h2 className="font-display text-3xl">Problem</h2>
              <p className="mt-3 text-[var(--muted)] leading-relaxed max-w-3xl">
                {project.problem}
              </p>
            </section>
            <section id="approach">
              <h2 className="font-display text-3xl">Approach</h2>
              <p className="mt-3 text-[var(--muted)] leading-relaxed max-w-3xl">
                {project.approach}
              </p>
            </section>
            <section id="result">
              <h2 className="font-display text-3xl">Result</h2>
              <p className="mt-3 text-[var(--muted)] leading-relaxed max-w-3xl">
                {project.result}
              </p>
            </section>
            <section id="stack">
              <h2 className="font-display text-3xl">Stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--chip-border)] bg-[var(--chip-bg)] px-3 py-1 text-sm text-[var(--text)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
            <section id="links" className="flex flex-wrap gap-3">
              <Link href="/#contact" className="btn-neon">
                Ask for a demo
              </Link>
              <Link href="/#work" className="btn-soft">
                More projects
              </Link>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}
