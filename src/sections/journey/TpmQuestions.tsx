import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { TPM_HEADER, TPM_QUESTIONS } from './_data'
import s from './TpmQuestions.module.css'

export function TpmQuestions() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>{TPM_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{TPM_HEADER.title}</h2>

        <div className={s.grid}>
          {TPM_QUESTIONS.map((q, i) => (
            <ScrollReveal key={q.question} delay={i * 60} className={s.cell}>
              <FeatureCard icon={q.icon} title={q.question}>
                {q.detail}
              </FeatureCard>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
