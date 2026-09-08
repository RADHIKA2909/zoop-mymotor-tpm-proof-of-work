import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { HERO } from './_data'
import { FeedbackHeroVisual } from './FeedbackHeroVisual'
import s from './FeedbackHero.module.css'

export function FeedbackHero() {
  return (
    <section className={s.hero}>
      <Container size="wide">
        <div className={s.grid}>
          <div className={s.text}>
            <Eyebrow number={HERO.eyebrowNumber}>{HERO.eyebrow}</Eyebrow>
            <h1 className={s.title}>
              {HERO.titleLine1}
              <br />
              <span className={s.accent}>{HERO.titleLine2}</span>
            </h1>
            <p className={s.supporting}>{HERO.supporting}</p>
            <div className={s.badges}>
              {HERO.badges.map((b) => (
                <Pill key={b} tone="brand" variant="outline" caps size="sm">
                  {b}
                </Pill>
              ))}
            </div>
          </div>

          <div className={s.visual}>
            <p className={s.script} aria-hidden="true">
              {HERO.script.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <FeedbackHeroVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}
