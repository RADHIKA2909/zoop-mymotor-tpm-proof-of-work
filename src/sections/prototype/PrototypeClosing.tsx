import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { CLOSING } from './_data'
import { scrollToApp } from './_shared'
import s from './PrototypeClosing.module.css'

export function PrototypeClosing() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.inner}>
          <p className={s.eyebrow}>{CLOSING.eyebrow}</p>
          <h2 className={s.title}>
            {CLOSING.titleLead}
            <br />
            <span className={s.accent}>{CLOSING.titleAccent}</span>
          </h2>
          <p className={s.supporting}>{CLOSING.supporting}</p>
          <div className={s.actions}>
            <Button to="/" iconLeft="arrow-left" size="lg">
              Back to overview
            </Button>
            <Button onClick={scrollToApp} variant="secondary" size="lg" iconRight="arrow-up-right">
              View the prototype again
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
