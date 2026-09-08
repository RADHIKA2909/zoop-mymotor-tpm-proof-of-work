import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { PRODUCTION_QUESTIONS, PROTOTYPE_LIMITATIONS } from './_data'
import s from './ProductionValidation.module.css'

export function ProductionValidation() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.head}>
          <div>
            <Eyebrow>Before production</Eyebrow>
            <h2 className={s.title}>What I would validate first</h2>
            <p className={s.lead}>
              This prototype is a starting point, not a production claim. These questions
              would need real answers from ZOOP's teams and systems first.
            </p>
          </div>
          <Pill tone="assumption" caps size="sm">
            Validation questions
          </Pill>
        </div>

        <ScrollReveal className={s.list}>
          {PRODUCTION_QUESTIONS.map((q, i) => (
            <div className={s.item} key={q}>
              <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.q}>{q}</span>
            </div>
          ))}
        </ScrollReveal>

        <div className={s.limits}>
          <span className={s.limitsTitle}>What this prototype simulates vs. what needs a backend</span>
          <dl className={s.limitDefs}>
            {PROTOTYPE_LIMITATIONS.map((l) => (
              <div key={l.label}>
                <dt>{l.label}</dt>
                <dd>{l.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  )
}
