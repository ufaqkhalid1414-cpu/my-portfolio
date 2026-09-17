'use client'

import { useRef, useState, type FormEvent } from 'react'
import { site, whatsappHref } from '@/data/site'

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'whatsapp' | 'error'>('idle')
  const [pressed, setPressed] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email')

  function readFields(form: HTMLFormElement) {
    const data = new FormData(form)
    return {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      subject: String(data.get('subject') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = readFields(event.currentTarget)
    if (!fields.name || !fields.email || !fields.subject || !fields.message) {
      setStatus('error')
      return
    }

    setStatus('loading')
    const body = `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
    window.setTimeout(() => {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`
      setGuestName(fields.name)
      setChannel('email')
      setStatus('sent')
    }, 450)
  }

  function onWhatsApp() {
    const form = formRef.current
    if (!form) return
    const fields = readFields(form)
    if (!fields.name || !fields.message) {
      setStatus('error')
      return
    }
    const text = `Hello Ufaq, I'm ${fields.name}.${fields.email ? ` (${fields.email})` : ''}\n\n${fields.subject ? `${fields.subject}\n\n` : ''}${fields.message}`
    setGuestName(fields.name)
    setChannel('whatsapp')
    setStatus('whatsapp')
    window.open(whatsappHref(text), '_blank', 'noopener,noreferrer')
  }

  if (status === 'sent' || status === 'whatsapp') {
    return (
      <div className="max-w-[46ch]">
        <p className="font-display text-2xl font-semibold uppercase tracking-tight">Thank you</p>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-ink/75">
          {guestName ? `${guestName}, I` : 'I'} have this. If I am in class or away from my phone, I
          still receive it. I reply within a day.
        </p>
        <p className="mt-4 text-[1.05rem] leading-relaxed text-ink/75">
          {channel === 'whatsapp'
            ? 'Your WhatsApp chat should be open. Send it there, and I will answer in that thread.'
            : 'Your email app should be open with the draft. Send it, and I will answer on email.'}
        </p>
        <p className="mt-6 text-sm text-ink/55">— Ufaq</p>
        <button
          type="button"
          className="btn-ink mt-8 rounded-full px-6 py-3 text-sm font-medium"
          onClick={() => {
            setStatus('idle')
            setGuestName('')
          }}
        >
          Write another
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field id="name" label="Name" name="name" autoComplete="name" />
        <Field id="email" label="Email" name="email" type="email" autoComplete="email" />
      </div>
      <Field id="subject" label="Subject" name="subject" />
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-ink placeholder:text-ink/40"
        />
      </div>
      {status === 'error' ? (
        <p className="text-sm text-accent">
          Fill in name and message at least, plus email and subject for mail.
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          className={`btn-accent w-fit rounded-full px-7 py-3 text-sm font-medium ${
            pressed ? 'is-pressed' : ''
          } ${status === 'loading' ? 'is-loading' : ''}`}
        >
          {status === 'loading' ? 'Sending...' : 'Send email'}
        </button>
        <button
          type="button"
          className="btn-ink w-fit rounded-full px-7 py-3 text-sm font-medium"
          onClick={onWhatsApp}
        >
          Send on WhatsApp
        </button>
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  name,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  name: string
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-ink placeholder:text-ink/40"
      />
    </div>
  )
}
