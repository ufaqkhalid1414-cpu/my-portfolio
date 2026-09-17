'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { scrollToHash } from '@/components/site/HashLink'

export function ScrollToHash() {
  const pathname = usePathname()

  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return
    const timer = window.setTimeout(() => {
      scrollToHash(id)
    }, 80)
    return () => window.clearTimeout(timer)
  }, [pathname])

  return null
}
