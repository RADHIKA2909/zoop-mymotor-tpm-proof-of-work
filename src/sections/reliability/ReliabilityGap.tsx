import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { NodeFlow } from '@/components/diagrams/NodeFlow'
import { GAP } from './_data'
import s from './ReliabilityGap.module.css'

export function ReliabilityGap() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <h2 className={s.title}>{GAP.title}</h2>
        <p className={s.subtitle}>{GAP.subtitle}</p>

        <ScrollReveal className={s.compare}>
          <div className={s.col} data-side="expected">
            <span className={s.colLabel}>Expected state</span>
            <ul className={s.list}>
              {GAP.pairs.map((p) => (
                <li key={p.expected}>{p.expected}</li>
              ))}
            </ul>
          </div>

          <div className={s.vs} aria-hidden="true">
            <Icon name="arrow-right" size={18} />
          </div>

          <div className={s.col} data-side="actual">
            <span className={s.colLabel}>Actual state</span>
            <ul className={s.list}>
              {GAP.pairs.map((p) => (
                <li key={p.actual}>{p.actual}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <p className={s.outcome}>{GAP.outcome}</p>

        <div className={s.statementRow}>
          <p className={s.statement}>{GAP.statement}</p>
          <Pill tone="proposed" variant="outline" caps size="sm">
            {GAP.frameworkLabel}
          </Pill>
        </div>

        <div className={s.dependency}>
          <span className={s.depTitle}>The same failure can touch several systems</span>
          <NodeFlow
            connector="arrow"
            nodes={GAP.dependency.map((step, i) => ({
              id: String(i),
              label: step,
              tone: i === 1 ? 'brand' : 'default',
            }))}
          />
          <Pill tone="assumption" variant="outline" caps size="sm" className={s.depLabel}>
            {GAP.dependencyLabel}
          </Pill>
        </div>
      </Container>
    </section>
  )
}
