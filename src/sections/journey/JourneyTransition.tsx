import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { IconChip } from '@/components/ui/IconChip'
import { TRANSITION } from './_data'
import s from './JourneyTransition.module.css'

export function JourneyTransition() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.inner}>
          <IconChip icon="leaf" size="lg" tone="deep" />
          <div className={s.text}>
            <p className={s.eyebrow}>{TRANSITION.eyebrow}</p>
            <p className={s.heading}>{TRANSITION.heading}</p>
          </div>
          <Button to="/feedback" iconRight="arrow-right" size="lg" className={s.cta}>
            {TRANSITION.ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  )
}
