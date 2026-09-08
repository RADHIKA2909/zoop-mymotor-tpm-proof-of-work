import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { EXCEPTION } from './_data'
import s from './ExceptionModel.module.css'

export function ExceptionModel() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <h2 className={s.title}>{EXCEPTION.title}</h2>
        <p className={s.lead}>{EXCEPTION.lead}</p>

        <ScrollReveal>
          <ol className={s.flow}>
            {EXCEPTION.steps.map((step, i) => (
              <li className={s.step} key={step.key}>
                <div className={s.stepHead}>
                  <span className={s.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={s.stepLabel}>{step.label}</span>
                  {i < EXCEPTION.steps.length - 1 && (
                    <span className={s.stepArrow} aria-hidden="true">
                      <Icon name="arrow-right" size={14} />
                    </span>
                  )}
                </div>
                <p className={s.stepExample}>{step.example}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>

        <Pill tone="proposed" variant="outline" caps size="sm" className={s.label}>
          {EXCEPTION.label}
        </Pill>
      </Container>
    </section>
  )
}
