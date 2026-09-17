'use client'

import { faqs } from '@/data/site'

export function FaqList() {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {faqs.map((item) => (
        <details key={item.question} className="faq-item group py-4">
          <summary className="cursor-pointer list-none text-[0.95rem] font-medium leading-snug text-ink md:text-base">
            <span className="flex items-start justify-between gap-6">
              {item.question}
              <span className="mt-0.5 shrink-0 text-sm font-normal text-accent transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-ink/70 md:text-[0.95rem]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
