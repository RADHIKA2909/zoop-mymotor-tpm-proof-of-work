import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Pill } from '@/components/ui/Pill'
import { StatusDot } from '@/components/ui/StatusDot'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { JOURNEY_HEADER, JOURNEY_STAGES, RISK_META } from './_data'
import s from './JourneyRisk.module.css'

export function JourneyRisk() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.head}>
          <SectionHeader
            eyebrow={JOURNEY_HEADER.eyebrow}
            title={JOURNEY_HEADER.title}
            lead={<p>{JOURNEY_HEADER.lead}</p>}
          />
          <div className={s.legend}>
            <span className={s.legendTitle}>Reliability risk level</span>
            <div className={s.legendItems}>
              <StatusDot tone="success" label="Lower" />
              <StatusDot tone="warning" label="Moderate" />
              <StatusDot tone="error" label="Higher" />
            </div>
          </div>
        </div>

        <ScrollReveal>
          <div className={s.track}>
            {JOURNEY_STAGES.map((stage, i) => {
              const risk = RISK_META[stage.risk]
              return (
                <div className={s.segment} key={stage.num}>
                  <div className={s.stage} tabIndex={0}>
                    <div className={s.node}>
                      <span className={s.num}>{stage.num}</span>
                      <span className={s.icon} aria-hidden="true">
                        <Icon name={stage.icon} size={18} />
                      </span>
                    </div>
                    <p className={s.title}>{stage.title}</p>
                    <p className={s.desc}>{stage.desc}</p>
                    <Pill tone={risk.tone} size="sm" dot className={s.riskPill}>
                      {risk.label}
                    </Pill>

                    <div className={s.tooltip} role="note">
                      <span className={s.tipLabel}>Potential issue</span>
                      {stage.potentialIssue}
                    </div>
                  </div>
                  {i < JOURNEY_STAGES.length - 1 && (
                    <span className={s.connector} aria-hidden="true">
                      <Icon name="arrow-right" size={16} />
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollReveal>

        <Pill
          tone="assumption"
          variant="outline"
          caps
          size="sm"
          className={cn(s.note)}
        >
          {JOURNEY_HEADER.note}
        </Pill>
      </Container>
    </section>
  )
}
