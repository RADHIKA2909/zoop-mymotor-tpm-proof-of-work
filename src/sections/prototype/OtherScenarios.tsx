import type { Dispatch } from 'react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { OTHER_SCENARIOS } from './_data'
import type { PrototypeAction } from './_state'
import s from './OtherScenarios.module.css'

export function OtherScenarios({ dispatch }: { dispatch: Dispatch<PrototypeAction> }) {
  const pick = (scenario: (typeof OTHER_SCENARIOS)[number]['scenarioId']) => {
    dispatch({ type: 'SELECT_SCENARIO', scenario })
    document.getElementById('prototype-app')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Other scenarios in the prototype</Eyebrow>
        <h2 className={s.title}>The same workflow, different failures</h2>

        <ScrollReveal className={s.grid}>
          {OTHER_SCENARIOS.map((c) => (
            <button className={s.card} key={c.scenarioId} onClick={() => pick(c.scenarioId)}>
              <span className={s.icon} aria-hidden="true">
                <Icon name={c.icon} size={18} />
              </span>
              <span className={s.cardBody}>
                <span className={s.cardTitle}>{c.title}</span>
                <span className={s.cardDesc}>{c.desc}</span>
              </span>
              <Icon name="arrow-right" size={16} className={s.arrow} aria-hidden="true" />
            </button>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  )
}
