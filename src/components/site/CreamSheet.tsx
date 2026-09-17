import type { ReactNode } from 'react'

type CreamSheetProps = {
  children: ReactNode
  className?: string
  id?: string
}

export function CreamSheet({ children, className = '', id }: CreamSheetProps) {
  return (
    <section
      id={id}
      className={`rounded-t-[48px] bg-cream text-ink shadow-[var(--shadow-sheet)] md:rounded-t-[56px] ${className}`}
    >
      {children}
    </section>
  )
}
