'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { scrollToHash } from '@/components/site/HashLink'

const pageHeadings: Record<string, string> = {
  '/work': 'work-index',
  '/about': 'about',
  '/contact': 'contact',
}

export function ScrollToHash() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const target = hash || pageHeadings[pathname]

    function go() {
      if (target) {
        scrollToHash(target)
        return
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const first = window.setTimeout(go, 50)
    const second = window.setTimeout(go, 320)
    return () => {
      window.clearTimeout(first)
      window.clearTimeout(second)
    }
  }, [pathname])

  return null
}
