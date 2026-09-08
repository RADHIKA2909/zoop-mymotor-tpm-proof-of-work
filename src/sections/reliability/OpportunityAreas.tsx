import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { OPPORTUNITIES, OPPORTUNITY_HEADER } from './_data'
import s from './OpportunityAreas.module.css'

export function OpportunityAreas() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <SectionHeader
          eyebrow={OPPORTUNITY_HEADER.eyebrow}
          title={OPPORTUNITY_HEADER.title}
          lead={<p>{OPPORTUNITY_HEADER.lead}</p>}
          actions={
            <Pill tone="proposed" caps size="sm">
              Proposed
            </Pill>
          }
        />

        <div className={s.grid}>
          {OPPORTUNITIES.map((o, i) => (
            <ScrollReveal key={o.num} delay={i * 50} className={s.cell}>
              <div className={s.card}>
                <div className={s.cardTop}>
                  <span className={s.num}>{o.num}</span>
                  <IconChip icon={o.icon} />
                </div>
                <h3 className={s.cardTitle}>{o.title}</h3>
                <p className={s.cardText}>{o.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
