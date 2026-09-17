'use client'

import { motion, useReducedMotion } from 'framer-motion'

const iconClass = 'h-[22px] w-[22px]'

function IconSearch() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16.5 20 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconLayers() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4.5 4.5 8.5 12 12.5 19.5 8.5 12 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4.5 12.5 12 16.5 19.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M4.5 16.5 12 20.5 19.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 19.5c.8-3.2 3.2-5 6.5-5s5.7 1.8 6.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 6.5c-1.6-1.2-3.6-1.8-6.2-1.8H4.5v13h1.5c2.5 0 4.4.6 6 1.8 1.6-1.2 3.5-1.8 6-1.8h1.5v-13H18.2c-2.6 0-4.6.6-6.2 1.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 6.5v12.7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function IconQuiz() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.6 9.4c.3-1.3 1.3-2 2.5-2 1.4 0 2.4.8 2.4 2.1 0 1.2-.8 1.7-1.8 2.2-.8.4-1.1.8-1.1 1.6v.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  )
}

function IconCertificate() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.5" y="5" width="15" height="11.5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 9h8M8 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 16.5 16 20.5 18 16.8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.5" y="4.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m8 12.2 2.6 2.6 5.4-5.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconDeploy() {
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 16.5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 9.5 12 5.5 16 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 18.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export const certProcessSteps = [
  { label: 'Requirement Analysis', icon: IconSearch },
  { label: 'System Design', icon: IconLayers },
  { label: 'User Module', icon: IconUser },
  { label: 'Course Module', icon: IconBook },
  { label: 'Quiz Module', icon: IconQuiz },
  { label: 'Certificate Module', icon: IconCertificate },
  { label: 'Testing', icon: IconCheck },
  { label: 'Deployment', icon: IconDeploy },
] as const

export const certWbs = [
  {
    title: 'User Module',
    items: ['Registration', 'Login', 'Authentication'],
  },
  {
    title: 'Course Module',
    items: ['Course management', 'Enrollment', 'Learning material access'],
  },
  {
    title: 'Quiz Module',
    items: ['Assessment management', 'Online certification exams'],
  },
  {
    title: 'Certificate Module',
    items: ['Automated certificate generation', 'Reporting'],
  },
] as const

type ProcessTimelineProps = {
  compact?: boolean
}

export function ProcessTimeline({ compact = false }: ProcessTimelineProps) {
  if (compact) {
    return (
      <ol className="grid h-full grid-cols-2 gap-2 p-4">
        {certProcessSteps.map((step, index) => (
          <li key={step.label} className="rounded-2xl bg-cream px-3 py-2 text-[0.7rem]">
            <span className="font-display text-accent">{String(index + 1).padStart(2, '0')}</span>
            <p className="mt-1 leading-tight font-medium text-ink">{step.label}</p>
          </li>
        ))}
      </ol>
    )
  }

  return <FullTimeline />
}

function FullTimeline() {
  const reduce = useReducedMotion()

  return (
    <ol className="relative mx-auto max-w-4xl">
      <span
        className="pointer-events-none absolute top-6 bottom-6 left-6 w-0.5 bg-accent/50 md:left-1/2 md:-translate-x-1/2"
        aria-hidden
      />
      {certProcessSteps.map((step, index) => {
        const Icon = step.icon
        const left = index % 2 === 0

        return (
          <motion.li
            key={step.label}
            className="relative mb-3 grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 md:mb-4 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-5"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.42, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative z-10 col-start-1 row-start-1 flex h-12 w-12 items-center justify-center justify-self-center rounded-full border border-accent/50 bg-cream-deep text-accent md:col-start-2">
              <Icon />
              {index < certProcessSteps.length - 1 ? (
                <span
                  className="pointer-events-none absolute top-[calc(100%+2px)] text-[10px] leading-none text-accent"
                  aria-hidden
                >
                  ↓
                </span>
              ) : null}
            </span>
            <div
              className={`col-start-2 row-start-1 rounded-[24px] bg-cream-deep px-5 py-4 ${
                left
                  ? 'md:col-start-1 md:text-right'
                  : 'md:col-start-3 md:text-left'
              }`}
            >
              <p className="font-display text-sm text-accent">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-1 text-base font-medium leading-snug text-ink">{step.label}</p>
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}

export function WbsBreakdown() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {certWbs.map((group) => (
        <div key={group.title} className="rounded-[28px] bg-cream p-6">
          <p className="font-display text-xl font-semibold uppercase tracking-tight text-ink">
            {group.title}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            {group.items.map((item) => (
              <li key={item} className="border-l-2 border-accent pl-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
