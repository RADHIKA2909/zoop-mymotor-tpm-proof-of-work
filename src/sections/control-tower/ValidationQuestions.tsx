import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { VALIDATION_QUESTIONS } from './_data'
import s from './ValidationQuestions.module.css'

export function ValidationQuestions() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.head}>
          <div>
            <Eyebrow>Before building this</Eyebrow>
            <h2 className={s.title}>What I would validate first.</h2>
            <p className={s.lead}>
              This concept is deliberately built from the outside. These are the questions
              that would need real answers from ZOOP's teams and systems before any of it
              is designed for real.
            </p>
          </div>
          <Pill tone="assumption" caps size="sm">
            Validation questions
          </Pill>
        </div>

        <ScrollReveal>
          <ol className={s.list}>
            {VALIDATION_QUESTIONS.map((q, i) => (
              <li className={s.item} key={q}>
                <span className={s.num}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.q}>{q}</span>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </Container>
    </section>
  )
}
