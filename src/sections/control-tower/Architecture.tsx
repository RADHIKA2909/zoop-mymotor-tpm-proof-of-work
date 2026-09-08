import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { DiagramFrame } from '@/components/ui/DiagramFrame'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import {
  ARCH_CONSUMERS,
  ARCH_FLOW,
  ARCH_LABEL,
  ARCH_OUTPUTS,
  ARCH_SIDE_OUTPUT,
} from './_data'
import s from './Architecture.module.css'

export function Architecture() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>How the control tower fits together</Eyebrow>
        <h2 className={s.title}>A conceptual architecture</h2>
        <p className={s.lead}>
          This shows how transaction and system signals could flow into a reliability
          layer and out to the teams that act on them. Internal services, APIs and
          technologies are deliberately not specified.
        </p>

        <ScrollReveal>
          <DiagramFrame disclaimer={ARCH_LABEL} className={s.frame}>
            <div className={s.flow}>
              {ARCH_FLOW.map((step, i) => (
                <div className={s.flowSeg} key={step}>
                  <span className={i === ARCH_FLOW.length - 1 ? s.flowNodeKey : s.flowNode}>
                    {step}
                  </span>
                  {i < ARCH_FLOW.length - 1 && (
                    <Icon name="chevron-down" size={16} className={s.flowArrow} />
                  )}
                </div>
              ))}
              <Icon name="chevron-down" size={16} className={s.flowArrow} />
              <div className={s.outputs}>
                {ARCH_OUTPUTS.map((o) => (
                  <span className={s.output} key={o}>{o}</span>
                ))}
              </div>
              <Icon name="chevron-down" size={16} className={s.flowArrow} />
              <span className={s.consumers}>{ARCH_CONSUMERS}</span>
              <p className={s.sideOut}>
                <Icon name="arrow-right" size={13} /> {ARCH_SIDE_OUTPUT} (output of the incident layer)
              </p>
            </div>
          </DiagramFrame>
        </ScrollReveal>
      </Container>
    </section>
  )
}
