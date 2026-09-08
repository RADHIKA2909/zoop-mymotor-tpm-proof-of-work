import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { INSIGHTS, INSIGHTS_HEADER, UNCERTAINTY } from './_data'
import s from './KeyInsights.module.css'

export function KeyInsights() {
  return (
    <section className={s.section} data-theme="dark">
      <Container size="wide">
        <Eyebrow tone="inverse">{INSIGHTS_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{INSIGHTS_HEADER.title}</h2>
        <p className={s.lead}>{INSIGHTS_HEADER.lead}</p>

        <div className={s.grid}>
          {INSIGHTS.map((insight, i) => (
            <ScrollReveal key={insight.title} delay={i * 60} className={s.cell}>
              <div className={s.card}>
                <span className={s.icon} aria-hidden="true">
                  <Icon name={insight.icon} size={18} />
                </span>
                <h3 className={s.cardTitle}>{insight.title}</h3>
                <p className={s.cardBody}>{insight.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className={s.uncertainty}>
          <p className={s.statement}>
            {UNCERTAINTY.statement.map((line, i) => (
              <span key={line} className={i === 1 ? s.statementAccent : undefined}>
                {line}{' '}
              </span>
            ))}
          </p>

          <div className={s.model}>
            {UNCERTAINTY.model.map((step, i) => (
              <div className={s.modelSeg} key={step}>
                <span className={s.modelNode}>{step}</span>
                {i < UNCERTAINTY.model.length - 1 && (
                  <span className={s.modelArrow} aria-hidden="true">
                    <Icon name="arrow-right" size={15} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <Pill tone="assumption" variant="outline" caps size="sm" className={s.modelLabel}>
            {UNCERTAINTY.modelLabel}
          </Pill>
        </div>
      </Container>
    </section>
  )
}
