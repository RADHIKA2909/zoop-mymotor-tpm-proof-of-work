import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { THEMES } from './_data'
import s from './ThemesGrid.module.css'

const SIGNAL_TONE: Record<string, 'warning' | 'brand' | 'neutral' | 'success'> = {
  'Reliability-sensitive': 'warning',
  Recurring: 'brand',
  Mixed: 'neutral',
  'Mostly positive': 'success',
}

interface ThemesGridProps {
  onViewEvidence: (themeId: string) => void
}

export function ThemesGrid({ onViewEvidence }: ThemesGridProps) {
  return (
    <section className={s.section}>
      <Container size="wide">
        <SectionHeader
          eyebrow="Top themes from user reviews"
          title="What users talk about most"
          lead={
            <p>
              Across the reviews I analysed, a few themes repeatedly surfaced —
              from charger availability to payment issues and support.
            </p>
          }
        />

        <div className={s.grid}>
          {THEMES.map((theme, i) => (
            <ScrollReveal key={theme.id} delay={i * 50} className={s.cell}>
              <div className={s.card}>
                <div className={s.cardTop}>
                  <IconChip icon={theme.icon} />
                  <Pill tone={SIGNAL_TONE[theme.signal] ?? 'neutral'} size="sm" caps>
                    {theme.signal}
                  </Pill>
                </div>
                <h3 className={s.name}>{theme.name}</h3>
                <p className={s.desc}>{theme.description}</p>
                <div className={s.tags}>
                  {theme.tags.map((tag) => (
                    <span key={tag} className={s.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className={s.link}
                  onClick={() => onViewEvidence(theme.id)}
                >
                  View evidence
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
