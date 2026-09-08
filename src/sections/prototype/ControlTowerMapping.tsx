import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { CT_MAPPING } from './_data'
import s from './ControlTowerMapping.module.css'

export function ControlTowerMapping() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.head}>
          <div>
            <Eyebrow>Control tower concept → prototype experience</Eyebrow>
            <h2 className={s.title}>The prototype implements Section 5</h2>
            <p className={s.lead}>
              Each part of the proposed Control Tower operating model maps to a concrete
              screen or action in this prototype.
            </p>
          </div>
          <Pill tone="proposed" caps size="sm">
            §5 → §6
          </Pill>
        </div>

        <ScrollReveal className={s.grid}>
          {CT_MAPPING.map((m) => (
            <div className={s.row} key={m.concept}>
              <span className={s.concept}>{m.concept}</span>
              <Icon name="arrow-right" size={15} className={s.arrow} aria-hidden="true" />
              <span className={s.proto}>{m.prototype}</span>
            </div>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  )
}
