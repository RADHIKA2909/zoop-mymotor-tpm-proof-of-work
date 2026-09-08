import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PriorityPlot } from '@/components/diagrams/PriorityPlot'
import { MATRIX_HEADER, MATRIX_POINTS } from './_data'
import s from './PrioritizationMatrix.module.css'

export function PrioritizationMatrix() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <h2 className={s.title}>{MATRIX_HEADER.title}</h2>
        <p className={s.lead}>{MATRIX_HEADER.lead}</p>

        <ScrollReveal className={s.layout}>
          <PriorityPlot
            xAxisLabel={MATRIX_HEADER.xAxis}
            yAxisLabel={MATRIX_HEADER.yAxis}
            quadrantLabels={{
              topRight: 'Investigate first',
              topLeft: 'Watch',
              bottomLeft: 'Monitor',
              bottomRight: 'Improve',
            }}
            points={MATRIX_POINTS.map((p) => ({
              id: p.id,
              label: p.label,
              x: p.x,
              y: p.y,
              tone: p.highlight ? 'brand' : 'neutral',
              emphasis: p.highlight,
            }))}
          />

          <div className={s.side}>
            <p className={s.sideTitle}>What we investigate next</p>
            <ul className={s.sideList}>
              {MATRIX_POINTS.filter((p) => p.highlight).map((p) => (
                <li key={p.id}>{p.label}</li>
              ))}
            </ul>
            <p className={s.sideNote}>
              High customer / operational impact <em>and</em> a strong reliability
              signal — the intersection worth a deeper look in Section 4.
            </p>
            <Pill tone="assumption" caps size="sm" className={s.matrixPill}>
              Illustrative prioritization
            </Pill>
          </div>
        </ScrollReveal>

        <p className={s.note}>{MATRIX_HEADER.note}</p>
      </Container>
    </section>
  )
}
