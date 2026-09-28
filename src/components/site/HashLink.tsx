'use client'

import type { MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type HashLinkProps = {
  href: string
  className?: string
  children: ReactNode
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function scrollToHash(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  const navOffset = 100
  const top = window.scrollY + el.getBoundingClientRect().top - navOffset
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  return true
}

export function HashLink({ href, className, children, onClick }: HashLinkProps) {
  const pathname = usePathname()
  const hashIndex = href.indexOf('#')
  const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : ''
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) || '/' : href

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented || !hash) return
    const onTargetPage = pathname === path || (path === '/' && pathname === '/')
    if (!onTargetPage) return
    if (!document.getElementById(hash)) return
    event.preventDefault()
    scrollToHash(hash)
    window.history.pushState(null, '', `${path === '/' ? '' : path}#${hash}`)
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
