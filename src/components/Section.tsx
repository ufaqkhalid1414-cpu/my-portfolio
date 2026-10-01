'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type SectionProps = {
  id: string
  eyebrow?: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, children, className = '' }: SectionProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={`section ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: 'easeOut' as const }}
    >
      <div className="section-heading">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  )
}
