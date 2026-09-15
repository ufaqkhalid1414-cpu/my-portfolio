'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { scrollToHash } from '../lib/scrollToHash'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
}

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-texture" aria-hidden="true" />
      <motion.div
        className="hero-copy"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <motion.p className="eyebrow" variants={item}>
          {profile.role}
        </motion.p>
        <motion.h1 variants={item}>{profile.name}</motion.h1>
        <motion.p className="hero-tagline" variants={item}>
          {profile.tagline}
        </motion.p>
        <motion.p className="hero-intro" variants={item}>
          {profile.intro}
        </motion.p>
        <motion.div className="hero-actions" variants={item}>
          <a
            className="btn btn-primary"
            href="#contact"
            onClick={(event) => {
              event.preventDefault()
              scrollToHash('#contact')
              window.history.pushState(null, '', '#contact')
            }}
          >
            Get in touch
          </a>
          <a
            className="btn btn-ghost"
            href="#projects"
            onClick={(event) => {
              event.preventDefault()
              scrollToHash('#projects')
              window.history.pushState(null, '', '#projects')
            }}
          >
            View projects
          </a>
        </motion.div>
        <motion.p className="hero-meta" variants={item}>
          {profile.location}
        </motion.p>
      </motion.div>
    </section>
  )
}
