import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { NodeFlow } from '@/components/diagrams/NodeFlow'
import { PROBLEM_FLOW_HEADER, PROBLEM_LABEL, PROBLEMS } from './_data'
import s from './ProblemFlow.module.css'

export function ProblemFlow() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <SectionHeader
          eyebrow={PROBLEM_FLOW_HEADER.eyebrow}
          title={PROBLEM_FLOW_HEADER.title}
          lead={<p>{PROBLEM_FLOW_HEADER.lead}</p>}
        />

        <div className={s.flow}>
          <NodeFlow
            connector="arrow"
            nodes={PROBLEM_FLOW_HEADER.flow.map((step, i) => ({
              id: String(i),
              label: step,
              tone: i === PROBLEM_FLOW_HEADER.flow.length - 1 ? 'brand' : 'default',
            }))}
          />
        </div>

        <div className={s.grid}>
          {PROBLEMS.map((problem, i) => (
            <ScrollReveal key={problem.id} delay={i * 60} className={s.cell}>
              <article className={s.card}>
                <div className={s.cardHead}>
                  <h3 className={s.cardTitle}>{problem.title}</h3>
                  <Pill tone="inferred" size="sm" caps>
                    {PROBLEM_LABEL}
                  </Pill>
                </div>
                <dl className={s.aspects}>
                  <div className={s.aspect}>
                    <dt>User signal</dt>
                    <dd>{problem.userSignal}</dd>
                  </div>
                  <div className={s.aspect}>
                    <dt>Potential underlying signal</dt>
                    <dd>{problem.underlyingSignal}</dd>
                  </div>
                  <div className={s.aspect}>
                    <dt>Product implication</dt>
                    <dd>{problem.productImplication}</dd>
                  </div>
                </dl>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
