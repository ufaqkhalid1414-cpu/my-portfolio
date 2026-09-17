'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ProcessTimeline } from '@/components/site/ProcessTimeline'

type ProjectCardProps = {
  href: string
  title: string
  description: string
  image?: string
  thumbnail?: 'image' | 'timeline'
}

export function ProjectCard({
  href,
  title,
  description,
  image,
  thumbnail = 'image',
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      data-hovered={hovered ? 'true' : 'false'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card h-full overflow-hidden rounded-[28px] bg-cream-deep"
    >
      <Link href={href} className="group flex h-full flex-col">
        <div className="aspect-[16/10] shrink-0 overflow-hidden bg-[#d9d2c2]">
          {thumbnail === 'timeline' ? (
            <div className="card-media h-full origin-center">
              <ProcessTimeline compact />
            </div>
          ) : image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover object-top"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-2xl font-semibold tracking-tight uppercase">{title}</h3>
          <p className="mt-2 max-w-[42ch] text-[0.95rem] leading-relaxed text-ink/70">{description}</p>
          <span className="text-link-accent mt-auto inline-block pt-5 text-sm font-medium">
            View project
          </span>
        </div>
      </Link>
    </article>
  )
}
