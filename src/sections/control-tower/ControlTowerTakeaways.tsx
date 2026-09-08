import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { CENTRAL_INSIGHT, TAKEAWAYS, TAKEAWAYS_HEADER } from './_data'
import s from './ControlTowerTakeaways.module.css'

export function ControlTowerTakeaways() {
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
          <p className={s.statement}>{CENTRAL_INSIGHT[0]}</p>
          <p className={s.statementAccent}>{CENTRAL_INSIGHT[1]}</p>
        </div>
      </Container>
    </section>
  )
}
