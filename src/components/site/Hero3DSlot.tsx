'use client'

import dynamic from 'next/dynamic'

const Hero3D = dynamic(() => import('@/components/site/Hero3D').then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="h-[280px] rounded-[32px] border border-cream/10 bg-[#161616] lg:h-[420px] lg:translate-y-8"
    />
  ),
})

export function Hero3DSlot() {
  return <Hero3D />
}
