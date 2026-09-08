import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Icon } from '@/components/ui/Icon'
import { HERO, HERO_STATS } from './_data'
import { HeroVisual } from './HeroVisual'
import s from './ContextHero.module.css'

export function ContextHero() {
  return (
    <section className={s.hero}>
      <Container size="wide">
        <div className={s.grid}>
          <div className={s.text}>
            <Eyebrow number={HERO.eyebrowNumber}>{HERO.eyebrow}</Eyebrow>

            <h1 className={s.title}>
              ZOOP <span className={s.cross} aria-hidden="true">×</span>{' '}
              <span className={s.accent}>MyMotor</span>
            </h1>

            <p className={s.subhead}>{HERO.subhead}</p>
            <p className={s.supporting}>{HERO.supporting}</p>

            <Pill tone="brand" variant="outline" caps size="sm" className={s.metaPill}>
              {HERO.metaPill}
            </Pill>

            <ul className={s.stats}>
              {HERO_STATS.map((stat) => (
                <li className={s.stat} key={stat.label}>
                  <span className={s.statIcon} aria-hidden="true">
                    <Icon name={stat.icon} size={16} />
                  </span>
                  {stat.label}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.visual}>
            <p className={s.script} aria-hidden="true">
              {HERO.script.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  )
}
