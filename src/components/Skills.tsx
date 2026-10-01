"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "@/data/content";
import { SectionHeading } from "./SectionHeading";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useTheme } from "./ThemeProvider";

/**
 * Same-width scatter:
 * 1 straight base (lowest) → 2 up-right → 3 up-left → 4 up-right
 * `top` keeps the highest card below the heading gap.
 */
const stackMotion = [
  { x: 0, top: 130, rotate: 0 },
  { x: 50, top: 88, rotate: 2.1 },
  { x: -46, top: 48, rotate: -2.2 },
  { x: 36, top: 10, rotate: 1.5 },
];

export function Skills() {
  const [hovered, setHovered] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { theme, ready } = useTheme();
  useStaggerReveal(stageRef, ".js-reveal", { y: 40, stagger: 0.1 });
  const accent = ready && theme === "light" ? "violet" : "blend";

  return (
    <section
      id="skills"
      className="relative aurora-blend px-4 pb-8 pt-14 md:px-6 md:pb-10 md:pt-16"
    >
      <div className="container-x relative w-full">
        <div className="relative z-30 bg-transparent">
          <SectionHeading
            eyebrow="Skills"
            title="My Skills"
            accent={accent}
            className="!mb-0"
          />
        </div>

        <div
          ref={stageRef}
          className="relative z-10 mx-auto mt-20 h-[290px] w-full max-w-3xl md:mt-24 md:h-[280px]"
        >
          {skillGroups.map((group, index) => {
            const pose = stackMotion[index] ?? stackMotion[0];
            const isHovered = hovered === index;
            const dimmed = hovered !== null && !isHovered;

            return (
              <div
                key={group.title}
                className="js-reveal absolute left-0 right-0 w-full"
                style={{
                  top: pose.top,
                  zIndex: isHovered ? 40 : index + 1,
                }}
              >
                <motion.article
                  className="skill-card w-full cursor-pointer rounded-2xl border px-5 py-5 backdrop-blur-xl md:px-7 md:py-6"
                  style={{
                    boxShadow: isHovered
                      ? "0 28px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.35)"
                      : undefined,
                  }}
                  animate={{
                    opacity: dimmed ? 0.42 : 1,
                    x: pose.x,
                    y: isHovered ? -10 : 0,
                    rotate: isHovered ? 0 : pose.rotate,
                    scale: isHovered ? 1.02 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 20,
                  }}
                  onHoverStart={() => setHovered(index)}
                  onHoverEnd={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  tabIndex={0}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                    <div className="min-w-0">
                      <h3 className="skill-card-title text-base font-semibold tracking-tight sm:text-lg">
                        {group.title}
                      </h3>
                      <p className="skill-card-desc mt-1.5 max-w-md text-sm leading-relaxed sm:hidden">
                        {group.description}
                      </p>
                    </div>
                    <p className="skill-card-desc hidden max-w-md text-sm leading-relaxed sm:block sm:text-right">
                      {group.description}
                    </p>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="skill-card-chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
