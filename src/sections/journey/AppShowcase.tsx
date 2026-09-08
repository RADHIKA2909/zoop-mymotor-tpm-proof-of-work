import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { CheckList } from '@/components/ui/CheckList'
import { Callout } from '@/components/ui/Callout'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { PhoneFrame } from '@/components/diagrams/PhoneFrame'
import { CAPABILITY_CARD, SHOWCASE_HEADER, SHOWCASE_SCREENS } from './_data'
import { JourneyAppScreen } from './JourneyAppScreen'
import s from './AppShowcase.module.css'

export function AppShowcase() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.head}>
          <h2 className={s.title}>{SHOWCASE_HEADER.title}</h2>
          <p className={s.lead}>{SHOWCASE_HEADER.lead}</p>
        </div>

        <div className={s.grid}>
          <ScrollReveal className={s.phones}>
            {SHOWCASE_SCREENS.map((screen, i) => (
              <div className={s.phoneCell} key={screen.variant}>
                <PhoneFrame size="sm" caption={screen.caption}>
                  <JourneyAppScreen variant={screen.variant} />
                </PhoneFrame>
                {i < SHOWCASE_SCREENS.length - 1 && (
                  <span className={s.arrow} aria-hidden="true">
                    <Icon name="arrow-right" size={16} />
                  </span>
                )}
              </div>
            ))}
          </ScrollReveal>

          <ScrollReveal className={s.sideCol} delay={100}>
            <div className={s.capCard}>
              <h3 className={s.capTitle}>{CAPABILITY_CARD.title}</h3>
              <CheckList items={[...CAPABILITY_CARD.bullets]} />
              <Pill tone="success" variant="soft" caps size="sm" dot className={s.capPill}>
                {CAPABILITY_CARD.source}
              </Pill>
            </div>
          </ScrollReveal>
        </div>

        <Callout kind="source" className={s.disclaimer}>
          {SHOWCASE_HEADER.disclaimer}
        </Callout>
      </Container>
    </section>
  )
}
