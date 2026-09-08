import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { ALERT_LABEL, ALERT_RULES } from './_data'
import s from './Alerting.module.css'

export function Alerting() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Proactive monitoring</Eyebrow>
        <h2 className={s.title}>Don't wait for customers to report the problem.</h2>

        <ScrollReveal className={s.grid}>
          {ALERT_RULES.map((rule, i) => (
            <div className={s.rule} key={i}>
              <span className={s.iconWrap} aria-hidden="true">
                <Icon name="bell" size={16} />
              </span>
              <div>
                <p className={s.if}>
                  <span className={s.kw}>IF</span> {rule.ifText}
                </p>
                <p className={s.then}>
                  <span className={s.kw}>THEN</span> {rule.thenText}
                </p>
              </div>
            </div>
          ))}
        </ScrollReveal>

        <Pill tone="proposed" variant="outline" caps size="sm" className={s.label}>
          {ALERT_LABEL}
        </Pill>
      </Container>
    </section>
  )
}
