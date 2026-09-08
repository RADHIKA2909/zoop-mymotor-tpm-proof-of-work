import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { MATRIX_HEADER, MATRIX_POINTS } from './_data'
import s from './PrioritizationMatrix.module.css'

export function PrioritizationMatrix() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <h2 className={s.title}>{MATRIX_HEADER.title}</h2>
        <p className={s.lead}>{MATRIX_HEADER.lead}</p>

        <ScrollReveal className={s.layout}>
          <div className={s.plotWrap}>
            <span className={s.yAxis}>{MATRIX_HEADER.yAxis} →</span>
            <div className={s.plot}>
              <span className={cn(s.quadLabel, s.qTopRight)}>Investigate first</span>
              <span className={cn(s.quadLabel, s.qTopLeft)}>Watch</span>
              <span className={cn(s.quadLabel, s.qBottomLeft)}>Monitor</span>
              <span className={cn(s.quadLabel, s.qBottomRight)}>Improve</span>

              {MATRIX_POINTS.map((p) => (
                <div
                  key={p.id}
                  className={cn(s.point, p.highlight && s.pointHi)}
                  style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
                >
                  <span className={s.dot} />
                  <span className={s.pointLabel}>{p.label}</span>
                </div>
              ))}
            </div>
            <span className={s.xAxis}>{MATRIX_HEADER.xAxis} →</span>
          </div>

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
