import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { TXN_FOCUS } from './_data'
import s from './TransactionFocus.module.css'

export function TransactionFocus() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <h2 className={s.title}>{TXN_FOCUS.title}</h2>

        <ScrollReveal className={s.chain}>
          {TXN_FOCUS.chain.map((step, i) => (
            <div className={s.step} key={step.label}>
              <div className={s.stepRow}>
                <span className={s.stepLabel}>{step.label}</span>
                <span className={s.stepValue}>{step.value}</span>
              </div>
              {i < TXN_FOCUS.chain.length - 1 && (
                <span className={s.stepArrow} aria-hidden="true">
                  <Icon name="chevron-down" size={16} />
                </span>
              )}
            </div>
          ))}
        </ScrollReveal>

        <div className={s.statementRow}>
          <p className={s.statement}>{TXN_FOCUS.statement}</p>
          <Pill tone="proposed" variant="outline" caps size="sm">
            {TXN_FOCUS.label}
          </Pill>
        </div>
      </Container>
    </section>
  )
}
