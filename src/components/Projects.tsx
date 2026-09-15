'use client'

import type { IconType } from 'react-icons'
import { DiVisualstudio } from 'react-icons/di'
import {
  HiOutlineDocumentText,
  HiOutlineShare,
  HiOutlineSwitchHorizontal,
  HiOutlineViewGrid,
} from 'react-icons/hi'
import {
  SiCplusplus,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiPhp,
} from 'react-icons/si'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/profile'
import { Section } from './Section'

const techIcons: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  MySQL: SiMysql,
  PHP: SiPhp,
  'C++': SiCplusplus,
  DSA: HiOutlineShare,
  'Visual Studio': DiVisualstudio,
  SRS: HiOutlineDocumentText,
  'Use Cases': HiOutlineViewGrid,
  'Sequence Diagrams': HiOutlineSwitchHorizontal,
}

export function Projects() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="projects" eyebrow="Selected work" title="Projects">
      <div className="projects-grid">
        {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="glass-card card-hover project-card"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                ease: 'easeOut' as const,
                delay: reduceMotion ? 0 : index * 0.1,
              }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="pills">
                {project.tags.map((tag) => {
                  const Icon = techIcons[tag]
                  return (
                    <li key={tag}>
                      {Icon ? <Icon aria-hidden="true" /> : null}
                      {tag}
                    </li>
                  )
                })}
              </ul>
            </motion.article>
          ))}
      </div>
    </Section>
  )
}
