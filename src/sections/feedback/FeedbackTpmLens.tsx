import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { TPM_HEADER, TPM_QUESTIONS } from './_data'
import s from './FeedbackTpmLens.module.css'

export function FeedbackTpmLens() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>{TPM_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{TPM_HEADER.title}</h2>

        <div className={s.shift}>
          <div className={s.shiftCol}>
            <span className={s.shiftLabel}>Before</span>
            <p className={s.shiftText}>{TPM_HEADER.before}</p>
          </div>
          <Icon name="arrow-right" size={20} className={s.shiftArrow} />
          <div className={s.shiftCol} data-after>
            <span className={s.shiftLabel}>After</span>
            <p className={s.shiftText}>{TPM_HEADER.after}</p>
          </div>
        </div>

        <div className={s.grid}>
          {TPM_QUESTIONS.map((q, i) => (
            <ScrollReveal key={q.num} delay={i * 60} className={s.cell}>
              <div className={s.card}>
                <div className={s.cardTop}>
                  <span className={s.num}>{q.num}</span>
                  <span className={s.icon} aria-hidden="true">
                    <Icon name={q.icon} size={16} />
                  </span>
                </div>
                <h3 className={s.cardTitle}>{q.title}</h3>
                <p className={s.cardBody}>{q.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
