import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { ANALYSIS_HEADERS, CAUSES, CAUSES_NOTE, IMPACTS, SIGNALS } from './_data'
import s from './ThreeWayAnalysis.module.css'

export function ThreeWayAnalysis() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.grid}>
          {/* Column 1 — signals */}
          <ScrollReveal className={s.col}>
            <Eyebrow>{ANALYSIS_HEADERS.signals.eyebrow}</Eyebrow>
            <h2 className={s.colTitle}>{ANALYSIS_HEADERS.signals.title}</h2>
            <p className={s.colLead}>{ANALYSIS_HEADERS.signals.lead}</p>
            <ul className={s.rows}>
              {SIGNALS.map((row) => (
                <li className={s.row} key={row.num}>
                  <span className={s.rowIcon} aria-hidden="true">
                    <Icon name={row.icon} size={16} />
                  </span>
                  <div className={s.rowBody}>
                    <div className={s.rowTop}>
                      <span className={s.rowTitle}>{row.title}</span>
                      <Pill
                        tone={row.badge === 'Recurring' ? 'warning' : 'neutral'}
                        size="sm"
                      >
                        {row.badge}
                      </Pill>
                    </div>
                    <p className={s.rowText}>{row.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Column 2 — causes */}
          <ScrollReveal className={s.col} delay={80}>
            <Eyebrow>{ANALYSIS_HEADERS.causes.eyebrow}</Eyebrow>
            <h2 className={s.colTitle}>{ANALYSIS_HEADERS.causes.title}</h2>
            <Callout kind="inferred" className={s.causeNote}>
              {CAUSES_NOTE}
            </Callout>
            <ul className={s.rows}>
              {CAUSES.map((row) => (
                <li className={s.row} key={row.num}>
                  <span className={s.rowIcon} aria-hidden="true">
                    <Icon name={row.icon} size={16} />
                  </span>
                  <div className={s.rowBody}>
                    <span className={s.rowTitle}>{row.title}</span>
                    <p className={s.rowText}>{row.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Column 3 — impact */}
          <ScrollReveal className={s.col} delay={160}>
            <Eyebrow>{ANALYSIS_HEADERS.impact.eyebrow}</Eyebrow>
            <h2 className={s.colTitle}>{ANALYSIS_HEADERS.impact.title}</h2>
            <p className={s.colLead}>{ANALYSIS_HEADERS.impact.lead}</p>
            <ul className={s.impacts}>
              {IMPACTS.map((impact) => (
                <li className={s.impact} key={impact.title}>
                  <span className={s.impactIcon} aria-hidden="true">
                    <Icon name={impact.icon} size={16} />
                  </span>
                  <div>
                    <span className={s.impactTitle}>{impact.title}</span>
                    <p className={s.impactVoice}>{impact.voice}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
