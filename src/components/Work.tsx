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
          className="work-card group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[16px] border outline-none transition-[border-color,box-shadow,background] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--violet)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            aria-hidden
            className="work-card-rim pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset"
          />

          <div
            className="work-card-media relative mx-2.5 mt-2.5 overflow-hidden rounded-xl"
            style={{ transform: "translateZ(18px)" }}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority={priority}
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 768px) 92vw, 380px"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80"
              />
            </div>
          </div>

          <div
            className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3 sm:px-4"
            style={{ transform: "translateZ(28px)" }}
          >
            <p className="work-card-category text-[0.65rem] font-medium uppercase tracking-[0.16em]">
              {project.category}
            </p>
            <h3 className="work-card-title mt-1 text-[0.98rem] font-semibold leading-snug tracking-tight sm:text-[1.05rem]">
              {project.title}
            </h3>
            <p className="work-card-desc mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed">
              {project.summary}
            </p>

            <div className="mt-auto flex items-end justify-between gap-3 pt-3.5">
              <div className="flex min-w-0 flex-wrap gap-1.5">
                {project.stack.slice(0, 3).map((tag) => (
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
          title="Selected case studies"
          accent="violet"
          subtitle="Three builds with clear problems, decisions, and outcomes — campus systems, playable algorithms, and a ship-ready engineering pipeline."
        />

        <div
          ref={gridRef}
          className="mx-auto flex max-w-[400px] flex-col gap-5 overflow-visible py-8 sm:gap-5"
        >
          {projects.map((project, index) => (
            <div key={project.slug} className="js-reveal">
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
