import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { IconChip } from '@/components/ui/IconChip'
import { TRANSITION } from './_data'
import s from './SectionTransition.module.css'

export function SectionTransition() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.inner}>
          <IconChip icon="leaf" size="lg" tone="deep" />
          <div className={s.text}>
            <p className={s.progression}>
              {TRANSITION.progression.map((step, i) => (
                <span key={step}>
                  {step}
                  {i < TRANSITION.progression.length - 1 && (
                    <span className={s.arrow} aria-hidden="true">
                      {' → '}
                    </span>
                  )}
                </span>
              ))}
            </p>
            <p className={s.subtext}>{TRANSITION.subtext}</p>
          </div>
          <Button to="/journey" iconRight="arrow-right" size="lg" className={s.cta}>
            {TRANSITION.ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  )
}
