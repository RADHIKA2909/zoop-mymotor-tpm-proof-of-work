import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { FINAL_TAKEAWAYS } from './_data'
import s from './FinalTakeaways.module.css'

export function FinalTakeaways() {
  return (
    <section className={s.section} data-theme="dark">
      <Container size="wide">
        <Eyebrow tone="inverse">{FINAL_TAKEAWAYS.eyebrow}</Eyebrow>
        <h2 className={s.title}>{FINAL_TAKEAWAYS.title}</h2>
        <p className={s.lead}>{FINAL_TAKEAWAYS.supporting}</p>

        <div className={s.grid}>
          {FINAL_TAKEAWAYS.cards.map((c, i) => (
            <ScrollReveal key={c.num} delay={i * 60} className={s.cell}>
              <div className={s.card}>
                <span className={s.icon} aria-hidden="true">
                  <Icon name={c.icon} size={18} />
                </span>
                <h3 className={s.cardTitle}>{c.title}</h3>
                <p className={s.cardBody}>{c.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
