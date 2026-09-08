import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { CENTRAL_INSIGHT, TAKEAWAYS, TAKEAWAYS_HEADER } from './_data'
import s from './TpmTakeaways.module.css'

export function TpmTakeaways() {
  return (
    <section className={s.section} data-theme="dark">
      <Container size="wide">
        <Eyebrow tone="inverse">{TAKEAWAYS_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{TAKEAWAYS_HEADER.title}</h2>
        <p className={s.lead}>{TAKEAWAYS_HEADER.lead}</p>

        <div className={s.grid}>
          {TAKEAWAYS.map((t, i) => (
            <ScrollReveal key={t.num} delay={i * 60} className={s.cell}>
              <div className={s.card}>
                <span className={s.icon} aria-hidden="true">
                  <Icon name={t.icon} size={18} />
                </span>
                <h3 className={s.cardTitle}>{t.title}</h3>
                <p className={s.cardBody}>{t.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className={s.insight}>
          <p className={s.statement}>
            {CENTRAL_INSIGHT.statement.map((line, i) => (
              <span key={line} className={i === 1 ? s.statementAccent : undefined}>
                {line}{' '}
              </span>
            ))}
          </p>
          <div className={s.chain}>
            {CENTRAL_INSIGHT.chain.map((step, i) => (
              <div className={s.chainSeg} key={step}>
                <span className={s.chainNode}>{step}</span>
                {i < CENTRAL_INSIGHT.chain.length - 1 && (
                  <span className={s.chainArrow} aria-hidden="true">
                    <Icon name="arrow-right" size={15} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
