import { ContextHero } from './ContextHero'
import { TwoPaths } from './TwoPaths'
import { CapabilityMap } from './CapabilityMap'
import { EcosystemSection } from './EcosystemSection'
import { SectionTransition } from './SectionTransition'

/**
 * Section 1 — ZOOP × MyMotor: Ecosystem Context.
 *
 * Narrative: ZOOP -> two mobility contexts -> zoom into MyMotor -> what MyMotor
 * brings together -> the ecosystem underneath the simple experience -> why
 * reliability becomes a product + technical + operational problem -> bridge to
 * Section 2 (User Journey).
 *
 * Bespoke layout (does not use SectionScaffold — this section has its own hero
 * and its own forward CTA). Everything is public-information-based; the ecosystem
 * diagram is explicitly labelled conceptual / illustrative.
 */
export function ContextSection() {
  return (
    <article>
      <ContextHero />
      <TwoPaths />
      <CapabilityMap />
      <EcosystemSection />
      <SectionTransition />
    </article>
  )
}
