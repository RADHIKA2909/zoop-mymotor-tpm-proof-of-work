import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { NodeFlow } from '@/components/diagrams/NodeFlow'
import { METRICS_HEADER, METRICS_NOTE, METRIC_NAMES, METRIC_RELATIONSHIP } from './_data'
import s from './OperationalMetrics.module.css'

export function OperationalMetrics() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>{METRICS_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{METRICS_HEADER.title}</h2>
        <p className={s.lead}>{METRICS_HEADER.lead}</p>

        <ScrollReveal className={s.strip}>
          {METRIC_NAMES.map((m) => (
            <Pill key={m} tone="neutral" variant="outline" size="sm">
              {m}
            </Pill>
          ))}
        </ScrollReveal>

        <div className={s.relationship}>
          <NodeFlow nodes={METRIC_RELATIONSHIP} direction="column" connector="line" />
        </div>

        <p className={s.note}>{METRICS_NOTE}</p>
      </Container>
    </section>
  )
}
