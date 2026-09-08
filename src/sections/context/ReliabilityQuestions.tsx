import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { RELIABILITY_QS } from './_data'
import s from './ReliabilityQuestions.module.css'

/** Four open questions that expose the operational complexity. Not solutions. */
export function ReliabilityQuestions() {
  return (
    <div className={s.grid}>
      {RELIABILITY_QS.map((q, i) => (
        <ScrollReveal key={q.id} delay={i * 60} className={s.cell}>
          <div className={s.card}>
            <span className={s.icon} aria-hidden="true">
              <Icon name={q.icon} size={18} />
            </span>
            <p className={s.label}>{q.label}</p>
            <p className={s.question}>{q.question}</p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
