"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { projects } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";

/** Hover-only: top edge tips away from the viewer (backward) */
const BACKWARD_TILT = 70;

type Project = (typeof projects)[number];

function tagline(project: Project) {
  const line = project.problem.split(/[.!?]/)[0]?.trim();
  return line ? `${line}.` : project.category;
}

function useFinePointer() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return ok;
}

function ProjectTiltCard({
  project,
  priority,
  enableTilt,
}: {
  project: Project;
  priority?: boolean;
  enableTilt: boolean;
}) {
  const reduce = useReducedMotion();
  const canTilt = enableTilt && !reduce;

  const rotateX = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 160, damping: 20, mass: 0.45 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${springX}deg)`;

  function handleEnter() {
    if (!canTilt) return;
    rotateX.set(BACKWARD_TILT);
  }

  function handleLeave() {
    rotateX.set(0);
  }

  return (
    <div
      className="relative h-full w-full"
      style={{ perspective: "900px" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{
          transform: canTilt ? transform : undefined,
          transformStyle: "preserve-3d",
          willChange: canTilt ? "transform" : undefined,
        }}
        className="relative z-10 h-full"
      >
        <Link
          href={`/projects/${project.slug}`}
          className="work-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[20px] border outline-none transition-[border-color,box-shadow,background] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--violet)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            aria-hidden
            className="work-card-rim pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset"
          />

          <div
            className="work-card-media relative mx-3 mt-3 overflow-hidden rounded-2xl"
            style={{ transform: "translateZ(18px)" }}
          >
            <div
              aria-hidden
              className="work-card-hatch pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, transparent 46%, rgba(255,255,255,0.55) 49%, transparent 52%), linear-gradient(-45deg, transparent 46%, rgba(255,255,255,0.55) 49%, transparent 52%)",
                backgroundSize: "14px 14px",
              }}
            />
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={priority}
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[18%] bottom-[8%] h-[18%] rounded-[100%] bg-black/40 blur-xl"
              />
            </div>
          </div>

          <div
            className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5"
            style={{ transform: "translateZ(28px)" }}
          >
            <h3 className="work-card-title text-[1.05rem] font-semibold leading-snug tracking-tight sm:text-lg">
              {project.title}
            </h3>
            <p className="work-card-desc mt-1.5 line-clamp-2 text-sm leading-relaxed">
              {tagline(project)}
            </p>

            <div className="mt-auto flex items-end justify-between gap-3 pt-5">
              <div className="flex min-w-0 flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tag) => (
                  <span key={tag} className="work-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="work-card-cta inline-flex shrink-0 items-center gap-1 text-xs font-medium transition-colors">
                Case study
                <span aria-hidden className="text-sm leading-none">
                  ↗
                </span>
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export function Work() {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const gridRef = useRef<HTMLDivElement>(null);
  useStaggerReveal(gridRef, ".js-reveal", { y: 40, stagger: 0.1 });

  return (
    <section id="work" className="relative section-pad aurora-violet">
      <div className="container-x">
        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          accent="violet"
          subtitle="Three focused builds — systems, play, and process — centered as one dashboard of work."
        />

        <div
          ref={gridRef}
          className="mx-auto grid max-w-[1140px] grid-cols-1 items-stretch gap-6 overflow-visible py-8 sm:gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={`js-reveal ${
                index === 2
                  ? "md:col-span-2 md:mx-auto md:w-full md:max-w-[calc(50%-0.875rem)] lg:col-span-1 lg:mx-0 lg:max-w-none"
                  : ""
              }`}
            >
              <ProjectTiltCard
                project={project}
                priority={index === 0}
                enableTilt={finePointer && !reduce}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
