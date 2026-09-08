import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { IconChip } from '@/components/ui/IconChip'
import { TRANSITION } from './_data'
import s from './FeedbackTransition.module.css'

export function FeedbackTransition() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.inner}>
          <IconChip icon="shield" size="lg" tone="deep" />
          <div className={s.text}>
            <p className={s.eyebrow}>{TRANSITION.eyebrow}</p>
            <p className={s.heading}>{TRANSITION.heading}</p>
            <p className={s.supporting}>{TRANSITION.supporting}</p>
          </div>
          <Button to="/reliability" iconRight="arrow-right" size="lg" className={s.cta}>
            {TRANSITION.ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  )
}
