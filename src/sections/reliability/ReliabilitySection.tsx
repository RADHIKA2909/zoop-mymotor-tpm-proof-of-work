import { ReliabilityHero } from './ReliabilityHero'
import { ThreeWayAnalysis } from './ThreeWayAnalysis'
import { ExceptionModel } from './ExceptionModel'
import { TpmTakeaways } from './TpmTakeaways'
import { ReliabilityTransition } from './ReliabilityTransition'

/**
 * Section 4 — Reliability Analysis.
 *
 * Turns Section 3's feedback signals into a structured reliability analysis:
 * reliability signals -> potential (inferred) root causes -> customer impact ->
 * a proposed exception-management model -> TPM takeaways -> the question
 * Section 5 answers.
 *
 * Public-research based. Qualitative risk only; root causes are inferred; every
 * framework / model / diagram is proposed / conceptual / illustrative. Nothing
 * here is ZOOP's internal system.
 */
export function ReliabilitySection() {
  return (
    <article>
      <ReliabilityHero />
      <ThreeWayAnalysis />
      <ExceptionModel />
      <TpmTakeaways />
      <ReliabilityTransition />
    </article>
  )
}
