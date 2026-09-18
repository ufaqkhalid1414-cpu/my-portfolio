type VisualSlotProps = {
  src: string
  label: string
  wide?: boolean
}

export function VisualSlot({ src, label, wide = false }: VisualSlotProps) {
  return (
    <figure className="overflow-hidden rounded-[28px] bg-cream-deep shadow-[0_18px_40px_rgb(13_13_13_/_0.12)]">
      <div className={wide ? 'px-7 py-8 sm:px-12 md:px-20 md:py-12' : 'p-4 md:p-5'}>
        <div className="overflow-hidden rounded-[16px] bg-ink ring-1 ring-ink/10">
          <div className="flex items-center gap-1.5 border-b border-cream/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-cream/25" />
            <span className="h-2 w-2 rounded-full bg-cream/25" />
            <span className="h-2 w-2 rounded-full bg-cream/25" />
          </div>
          {wide ? (
            <img src={src} alt={label} className="block h-auto w-full bg-cream" />
          ) : (
            <div className="relative aspect-[16/10] bg-cream">
              <img
                src={src}
                alt={label}
                className="absolute inset-0 h-full w-full object-contain object-top"
              />
            </div>
          )}
        </div>
      </div>
      <figcaption className="border-t border-ink/10 px-5 py-3 text-sm font-medium text-ink">
        {label}
      </figcaption>
    </figure>
  )
}
