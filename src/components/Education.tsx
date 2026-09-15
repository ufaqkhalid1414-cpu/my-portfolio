import { profile } from '../data/profile'
import { GlassCard } from './GlassCard'
import { Section } from './Section'

export function Education() {
  const { education } = profile

  return (
    <Section id="education" eyebrow="Academics" title="Education">
      <GlassCard className="education-card">
        <p className="education-status">{education.status}</p>
        <h3>{education.degree}</h3>
        <p>
          {education.school}, {education.campus}
        </p>
        <p className="education-cgpa">CGPA {education.cgpa}</p>
      </GlassCard>
    </Section>
  )
}
