'use client'

import dynamic from 'next/dynamic'

const Hero3D = dynamic(() => import('@/components/site/Hero3D').then((mod) => mod.Hero3D), {
  ssr: false,
})

export function Hero3DSlot() {
  return <Hero3D />
}
