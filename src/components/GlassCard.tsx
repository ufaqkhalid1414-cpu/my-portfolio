import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  const classes = ['glass-card', hover ? 'card-hover' : '', className]
    .filter(Boolean)
    .join(' ')

  return <article className={classes}>{children}</article>
}
