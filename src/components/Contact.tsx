'use client'

import { useState, type FormEvent } from 'react'
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { profile } from '../data/profile'
import { GlassCard } from './GlassCard'
import { Section } from './Section'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'visitor'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <Section id="contact" eyebrow="Let's talk" title="Contact" className="contact-section">
      <div className="contact-glow" aria-hidden="true" />
      <div className="contact-shell">
        <div className="contact-grid">
          <GlassCard className="contact-details" hover={false}>
            <p>Reach me directly or send a short message.</p>
            <ul className="contact-list">
              <li>
                <span>Email</span>
                <a className="contact-pill card-hover" href={`mailto:${profile.email}`}>
                  <HiOutlineMail aria-hidden="true" />
                  {profile.email}
                </a>
              </li>
              <li>
                <span>Phone</span>
                <a className="contact-pill card-hover" href={profile.phoneHref}>
                  <HiOutlinePhone aria-hidden="true" />
                  {profile.phone}
                </a>
              </li>
              <li>
                <span>Location</span>
                <p className="contact-pill contact-pill--static card-hover">
                  <HiOutlineLocationMarker aria-hidden="true" />
                  {profile.location}
                </p>
              </li>
            </ul>
          </GlassCard>

          <GlassCard className="contact-form-card" hover={false}>
            <form className="contact-form" onSubmit={onSubmit}>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Send message
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </Section>
  )
}
