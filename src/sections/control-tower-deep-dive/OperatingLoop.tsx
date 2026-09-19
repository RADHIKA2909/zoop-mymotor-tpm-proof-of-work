import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Icon } from '@/components/ui/Icon'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { LOOP_HEADER, LOOP_LABEL, LOOP_STEPS } from './_data'
import s from './OperatingLoop.module.css'

export function OperatingLoop() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>{LOOP_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{LOOP_HEADER.title}</h2>

        <ScrollReveal>
          <ol className={s.flow}>
            {LOOP_STEPS.map((step, i) => (
              <li className={s.step} key={step.key}>
                <div className={s.stepHead}>
                  <span className={s.stepIcon} aria-hidden="true">
                    <Icon name={step.icon} size={18} />
                  </span>
                  <span className={s.stepLabel}>{step.label}</span>
                  {i < LOOP_STEPS.length - 1 && (
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
          {LOOP_LABEL}
        </Pill>
      </Container>
    </section>
  )
}
