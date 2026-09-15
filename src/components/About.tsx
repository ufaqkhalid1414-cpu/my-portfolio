import { HiAcademicCap, HiChartBar, HiCodeBracket } from 'react-icons/hi2'
import { profile } from '../data/profile'
import { GlassCard } from './GlassCard'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <GlassCard className="about-card" hover={false}>
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </GlassCard>
      <dl className="about-stats">
        <div className="card-hover">
          <span className="about-stat-icon" aria-hidden="true">
            <HiAcademicCap />
          </span>
          <dt>University</dt>
          <dd>UCP, Gujranwala</dd>
        </div>
        <div className="card-hover">
          <span className="about-stat-icon" aria-hidden="true">
            <HiChartBar />
          </span>
          <dt>CGPA</dt>
          <dd>3.45 / 4.00</dd>
        </div>
        <div className="card-hover">
          <span className="about-stat-icon" aria-hidden="true">
            <HiCodeBracket />
          </span>
          <dt>Focus</dt>
          <dd>Web & software systems</dd>
        </div>
      </dl>
    </Section>
  )
}
