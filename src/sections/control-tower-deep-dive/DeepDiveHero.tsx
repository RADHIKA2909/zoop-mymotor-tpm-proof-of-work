import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Callout } from '@/components/ui/Callout'
import { HERO } from './_data'
import s from './DeepDiveHero.module.css'

export function DeepDiveHero() {
  return (
    <section className={s.hero}>
      <Container size="wide">
        <div className={s.text}>
          <Eyebrow number={HERO.eyebrowNumber}>{HERO.eyebrow}</Eyebrow>
          <h1 className={s.title}>{HERO.title}</h1>
          <p className={s.subtitle}>{HERO.subtitle}</p>
          <p className={s.supporting}>{HERO.supporting}</p>
        </div>
        <Callout kind="proposed" className={s.disclaimer}>
          {HERO.disclaimer}
        </Callout>
      </Container>
    </section>
  )
}
