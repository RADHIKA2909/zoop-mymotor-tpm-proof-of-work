import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { DIAGNOSIS_LABEL, EXCEPTIONS } from './_data'
import { DiagnosisCard } from './DiagnosisCard'
import s from './DiagnosisSection.module.css'

export function DiagnosisSection() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.head}>
          <div>
            <Eyebrow>Why did it happen?</Eyebrow>
            <h2 className={s.title}>Turning an exception into a diagnosis</h2>
            <p className={s.lead}>
              When an operator opens an incident, the Control Tower should already frame
              the gap between expected and actual state, the likely signals, the
              dependency, the owner and the next action.
            </p>
          </div>
          <Pill tone="inferred" variant="outline" caps size="sm">
            {DIAGNOSIS_LABEL}
          </Pill>
        </div>

        <ScrollReveal>
          <DiagnosisCard d={EXCEPTIONS[0].diagnosis} />
        </ScrollReveal>
      </Container>
    </section>
  )
}
