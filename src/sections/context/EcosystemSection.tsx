import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { ECOSYSTEM_HEADER } from './_data'
import { EcosystemDiagram } from './EcosystemDiagram'
import { ReliabilityQuestions } from './ReliabilityQuestions'
import { TpmLens } from './TpmLens'
import s from './EcosystemSection.module.css'

export function EcosystemSection() {
  return (
    <section className={s.section} data-theme="dark">
      <Container size="wide">
        <header className={s.header}>
          <div>
            <Eyebrow tone="inverse">{ECOSYSTEM_HEADER.eyebrow}</Eyebrow>
            <h2 className={s.title}>
              {ECOSYSTEM_HEADER.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className={s.lead}>{ECOSYSTEM_HEADER.lead}</p>
          </div>
        </header>

        <ScrollReveal className={s.block}>
          <EcosystemDiagram />
        </ScrollReveal>

        <div className={s.questions}>
          <p className={s.questionsIntro}>
            Every hop is a place the customer&rsquo;s experience can quietly break:
          </p>
          <ReliabilityQuestions />
        </div>

        <TpmLens />
      </Container>
    </section>
  )
}
