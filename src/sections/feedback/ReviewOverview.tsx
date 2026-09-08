import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Callout } from '@/components/ui/Callout'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { OVERVIEW } from './_data'
import s from './ReviewOverview.module.css'

export function ReviewOverview() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <SectionHeader
          eyebrow={OVERVIEW.eyebrow}
          title={OVERVIEW.title}
          lead={<p>{OVERVIEW.lead}</p>}
        />

        <div className={s.grid}>
          {OVERVIEW.cards.map((card, i) => (
            <ScrollReveal key={card.label} delay={i * 60} className={s.cell}>
              <div className={s.card}>
                <span className={s.icon} aria-hidden="true">
                  <Icon name={card.icon} size={18} />
                </span>
                <span className={s.label}>{card.label}</span>
                <span className={s.value}>{card.value}</span>
                <span className={s.hint}>{card.hint}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <Callout kind="note" className={s.note}>
          {OVERVIEW.note}
        </Callout>
      </Container>
    </section>
  )
}
