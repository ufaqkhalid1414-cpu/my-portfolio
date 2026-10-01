type VisualSlotProps = {
  src: string
  label: string
  wide?: boolean
}

export function VisualSlot({ src, label, wide = false }: VisualSlotProps) {
  return (
    <figure className="overflow-hidden rounded-[28px] bg-cream">
      <div
        className={
          wide
            ? 'flex justify-center bg-cream px-4 py-6 md:px-12 md:py-10'
            : 'flex aspect-[16/10] items-center justify-center bg-cream px-3 py-4'
        }
      >
        <img
          src={src}
          alt={label}
          className="max-h-[min(68vh,38rem)] w-auto max-w-full bg-white object-contain"
        />
      </div>
      <figcaption className="border-t border-ink/10 px-5 py-3 text-sm font-medium text-ink">
        {label}
      </figcaption>
    </figure>
  )
}
