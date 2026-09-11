import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CENTRAL_INSIGHT } from './_data'
import s from './ControlTowerTakeaways.module.css'

export function ControlTowerTakeaways() {
  return (
    <section className={s.section} data-theme="dark">
      <Container size="wide">
        <Eyebrow tone="inverse">Key Takeaway</Eyebrow>
        <p className={s.statement}>{CENTRAL_INSIGHT[0]}</p>
        <p className={s.statementAccent}>{CENTRAL_INSIGHT[1]}</p>
      </Container>
    </section>
  )
}
