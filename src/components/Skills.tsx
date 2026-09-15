import type { IconType } from 'react-icons'
import { DiVisualstudio } from 'react-icons/di'
import {
  HiOutlineDocumentText,
  HiOutlineShare,
  HiOutlineSwitchHorizontal,
  HiOutlineViewGrid,
} from 'react-icons/hi'
import {
  SiCplusplus,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiXampp,
} from 'react-icons/si'
import { skillGroups } from '../data/profile'
import { GlassCard } from './GlassCard'
import { Section } from './Section'

const skillIcons: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  MySQL: SiMysql,
  'C++': SiCplusplus,
  'Data Structures': HiOutlineShare,
  XAMPP: SiXampp,
  'Visual Studio': DiVisualstudio,
  SRS: HiOutlineDocumentText,
  'Use Case Diagrams': HiOutlineViewGrid,
  'Sequence Diagrams': HiOutlineSwitchHorizontal,
}

const categoryClass: Record<string, string> = {
  'Front-End': 'skill-group--frontend',
  Programming: 'skill-group--programming',
  'Back-End / Database': 'skill-group--database',
  Tools: 'skill-group--tools',
  'Requirement Engineering': 'skill-group--re',
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="Capabilities" title="Skills">
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <GlassCard
            key={group.title}
            hover
            className={`skill-group ${categoryClass[group.title] ?? ''}`.trim()}
          >
            <h3>{group.title}</h3>
            <ul className="pills">
              {group.items.map((item) => {
                const Icon = skillIcons[item]
                return (
                  <li key={item}>
                    {Icon ? <Icon aria-hidden="true" /> : null}
                    {item}
                  </li>
                )
              })}
            </ul>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}
