import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PriorityPlot } from '@/components/diagrams/PriorityPlot'
import { PRIORITY_FOCUS, PRIORITY_HEADER, PRIORITY_POINTS } from './_data'
import s from './ReliabilityPrioritization.module.css'

export function ReliabilityPrioritization() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>{PRIORITY_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{PRIORITY_HEADER.title}</h2>
        <p className={s.lead}>{PRIORITY_HEADER.lead}</p>

        <ScrollReveal className={s.layout}>
          <PriorityPlot
            xAxisLabel={PRIORITY_HEADER.xAxis}
            yAxisLabel={PRIORITY_HEADER.yAxis}
            quadrantLabels={{
              topRight: 'Priority focus',
              topLeft: 'Investigate',
              bottomLeft: 'Low priority',
              bottomRight: 'Monitor',
            }}
            points={PRIORITY_POINTS}
          />

          <div className={s.side}>
            <p className={s.sideTitle}>Primary focus areas</p>
            <ul className={s.sideList}>
              {PRIORITY_FOCUS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className={s.sideNote}>
              High customer impact <em>and</em> a strong, recurring reliability
              signal — the two problems worth investigating in depth.
            </p>
            <Pill tone="assumption" caps size="sm" className={s.sidePill}>
              Illustrative prioritization
            </Pill>
          </div>
        </ScrollReveal>

        <p className={s.note}>{PRIORITY_HEADER.note}</p>
      </Container>
    </section>
  )
}
