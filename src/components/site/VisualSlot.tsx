type VisualSlotProps = {
  src: string
  label: string
  wide?: boolean
}

export function VisualSlot({ src, label, wide = false }: VisualSlotProps) {
  return (
    <figure className="overflow-hidden rounded-[28px] bg-cream-deep shadow-[0_18px_40px_rgb(13_13_13_/_0.12)]">
      {wide ? (
        <div className="flex justify-center px-7 py-8 sm:px-12 md:px-20 md:py-12">
          <img
            src={src}
            alt={label}
            className="block h-auto w-full max-w-[52rem] rounded-[18px] ring-1 ring-ink/10"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/10]">
          <img
            src={src}
            alt={label}
            className="absolute inset-0 h-full w-full object-contain object-top"
          />
        </div>
      )}
      <figcaption className="border-t border-ink/10 px-5 py-3 text-sm font-medium text-ink">
        {label}
      </figcaption>
    </figure>
  )
}
