import { JourneyHero } from './JourneyHero'
import { JourneyFlow } from './JourneyFlow'
import { AppShowcase } from './AppShowcase'
import { BreakMap } from './BreakMap'
import { MomentThatMatters } from './MomentThatMatters'
import { TpmQuestions } from './TpmQuestions'
import { JourneyTransition } from './JourneyTransition'

/**
 * Section 2 — User Journey.
 *
 * Story: ecosystem -> customer journey -> where can it break -> what to listen
 * for in feedback -> Section 3. The journey model is a product-thinking model
 * built from publicly observable MyMotor capabilities; it is NOT claimed to
 * represent ZOOP's internal workflow. No solution is designed here — no Control
 * Tower. Bespoke light-mode page (works under the global dark toggle via generic
 * tokens).
 */
export function JourneySection() {
  return (
    <article>
      <JourneyHero />
      <JourneyFlow />
      <AppShowcase />
      <BreakMap />
      <MomentThatMatters />
      <TpmQuestions />
      <JourneyTransition />
    </article>
  )
}
