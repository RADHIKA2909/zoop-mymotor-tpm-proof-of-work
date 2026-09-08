import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { INTRO, WHAT_YOU_CAN_DO } from './_data'
import { scrollToApp } from './_shared'
import s from './PrototypeIntro.module.css'

export function PrototypeIntro() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.grid}>
          <div className={s.lead}>
            <Eyebrow>{INTRO.eyebrow}</Eyebrow>
            <h2 className={s.title}>{INTRO.title}</h2>
            <p className={s.supporting}>{INTRO.supporting}</p>
            <Button onClick={scrollToApp} iconRight="arrow-right" size="lg" className={s.cta}>
              {INTRO.ctaLabel}
            </Button>
            <Callout kind="assumption" className={s.note}>
              {INTRO.note}
            </Callout>
          </div>

          <ScrollReveal className={s.cards}>
            {WHAT_YOU_CAN_DO.map((c) => (
              <div className={s.card} key={c.num}>
                <span className={s.cardIcon} aria-hidden="true">
                  <Icon name={c.icon} size={18} />
                </span>
                <span className={s.cardNum}>{c.num}</span>
                <h3 className={s.cardTitle}>{c.title}</h3>
                <p className={s.cardDesc}>{c.desc}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
