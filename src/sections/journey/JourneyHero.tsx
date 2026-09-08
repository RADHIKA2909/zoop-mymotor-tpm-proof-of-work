import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { HERO } from './_data'
import { JourneyHeroVisual } from './JourneyHeroVisual'
import s from './JourneyHero.module.css'

export function JourneyHero() {
  return (
    <section className={s.hero}>
      <Container size="wide">
        <div className={s.grid}>
          <div className={s.text}>
            <Eyebrow number={HERO.eyebrowNumber}>{HERO.eyebrow}</Eyebrow>
            <h1 className={s.title}>{HERO.title}</h1>
            <p className={s.supporting}>{HERO.supporting}</p>
            <Pill tone="brand" variant="outline" caps size="sm" className={s.badge}>
              {HERO.badge}
            </Pill>
          </div>

          <div className={s.visual}>
            <p className={s.scriptLeft} aria-hidden="true">
              {HERO.scriptLeft.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className={s.scriptRight} aria-hidden="true">
              {HERO.scriptRight.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <JourneyHeroVisual />
            <p className={s.caption}>{HERO.visualCaption}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
