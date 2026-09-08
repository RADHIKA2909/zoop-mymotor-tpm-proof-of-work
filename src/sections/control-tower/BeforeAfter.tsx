import { Container } from '@/components/ui/Container'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { BEFORE_AFTER } from './_data'
import s from './BeforeAfter.module.css'

function Flow({ steps, tone }: { steps: readonly string[]; tone: 'before' | 'after' }) {
  return (
    <ol className={s.flow} data-tone={tone}>
      {steps.map((step, i) => (
        <li className={s.step} key={step}>
          <span className={s.stepText}>{step}</span>
          {i < steps.length - 1 && (
            <Icon name="chevron-down" size={14} className={s.stepArrow} />
          )}
        </li>
      ))}
    </ol>
  )
}

export function BeforeAfter() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <h2 className={s.title}>From reactive support to proactive operations.</h2>
        <p className={s.lead}>
          The Control Tower's real value is the shift in operating model — not the
          dashboard itself.
        </p>

        <ScrollReveal className={s.grid}>
          <div className={s.col}>
            <span className={s.colLabel} data-tone="before">Before</span>
            <Flow steps={BEFORE_AFTER.before} tone="before" />
          </div>
          <div className={s.col}>
            <span className={s.colLabel} data-tone="after">After</span>
            <Flow steps={BEFORE_AFTER.after} tone="after" />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
