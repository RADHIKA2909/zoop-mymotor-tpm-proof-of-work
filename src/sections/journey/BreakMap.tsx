import { Container } from '@/components/ui/Container'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { StatusDot } from '@/components/ui/StatusDot'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import {
  BREAK_HEADER,
  BREAK_NOTE,
  CUSTOMER_ROWS,
  DEPENDENCY_ROWS,
  RISK_LEGEND,
} from './_data'
import { RiskChip } from './RiskChip'
import s from './BreakMap.module.css'

export function BreakMap() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.head}>
          <div>
            <h2 className={s.title}>{BREAK_HEADER.title}</h2>
            <p className={s.lead}>{BREAK_HEADER.lead}</p>
          </div>
          <ul className={s.legend}>
            {RISK_LEGEND.map((item) => (
              <li key={item.label}>
                <StatusDot tone={item.tone} label={item.label} />
              </li>
            ))}
          </ul>
        </div>

        <div className={s.grid}>
          <ScrollReveal className={s.col}>
            <div className={s.panel}>
              <header className={s.panelHead}>
                <div className={s.panelTitleRow}>
                  <Icon name="user" size={16} />
                  <span className={s.panelTitle}>Customer experience</span>
                </div>
                <p className={s.panelSub}>What the user does and feels</p>
                <Pill tone="proposed" caps size="sm" className={s.panelPill}>
                  Proposed experience model
                </Pill>
              </header>
              <ul className={s.rows}>
                {CUSTOMER_ROWS.map((row) => (
                  <li className={s.row} key={row.step}>
                    <span className={s.rowIcon} aria-hidden="true">
                      <Icon name={row.icon} size={15} />
                    </span>
                    <div className={s.rowBody}>
                      <span className={s.rowLabel}>{row.step}</span>
                      <span className={s.rowText}>{row.line}</span>
                    </div>
                    <span className={s.state}>{row.state}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal className={s.col} delay={100}>
            <div className={s.panel}>
              <header className={s.panelHead}>
                <div className={s.panelTitleRow}>
                  <Icon name="cog" size={16} />
                  <span className={s.panelTitle}>System / operational dependencies</span>
                </div>
                <p className={s.panelSub}>What needs to work in the background</p>
                <Pill tone="assumption" caps size="sm" className={s.panelPill}>
                  Conceptual dependency model
                </Pill>
              </header>
              <ul className={s.rows}>
                {DEPENDENCY_ROWS.map((row) => (
                  <li className={s.row} key={row.label}>
                    <span className={s.rowIcon} aria-hidden="true">
                      <Icon name={row.icon} size={15} />
                    </span>
                    <div className={s.rowBody}>
                      <span className={s.rowLabel}>{row.label}</span>
                      <span className={s.rowText}>{row.desc}</span>
                    </div>
                    <RiskChip tone={row.risk.tone}>{row.risk.text}</RiskChip>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <Callout kind="assumption" className={s.note}>
          {BREAK_NOTE}
        </Callout>
      </Container>
    </section>
  )
}
