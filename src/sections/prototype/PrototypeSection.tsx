import { useReducer } from 'react'
import { initialState, reducer } from './_state'
import { PrototypeHero } from './PrototypeHero'
import { PrototypeIntro } from './PrototypeIntro'
import { PrototypeStage } from './PrototypeStage'
import { OtherScenarios } from './OtherScenarios'
import { PrototypeHighlights } from './PrototypeHighlights'
import { DesignPrinciples } from './DesignPrinciples'
import { ControlTowerMapping } from './ControlTowerMapping'
import { WhatThisShows } from './WhatThisShows'
import { FinalTakeaways } from './FinalTakeaways'
import { CaseStudySummary } from './CaseStudySummary'
import { PrototypeClosing } from './PrototypeClosing'

/**
 * Section 6 — Interactive Prototype.
 *
 * Turns the conceptual Reliability Control Tower (Section 5) into a working,
 * clickable operator workflow: detect → investigate → act → resolve → learn,
 * across five illustrative scenarios (payment is the most detailed).
 *
 * ⚠️ PROPOSED / CONCEPTUAL — not real ZOOP software, architecture, workflow,
 * vendor integration, SLA, metric or data. All incident / transaction IDs,
 * provider names, owners, timestamps and messages are fictional and exist only
 * to make the proposed workflow tangible. Prototype state is local and in-memory
 * (one reducer); it resets on unmount and via the "Reset scenario" control.
 */
export function PrototypeSection() {
  const [state, dispatch] = useReducer(reducer, 'payment', initialState)

  return (
    <article>
      <PrototypeHero />
      <PrototypeIntro />
      <PrototypeStage state={state} dispatch={dispatch} />
      <OtherScenarios dispatch={dispatch} />
      <PrototypeHighlights />
      <DesignPrinciples />
      <ControlTowerMapping />
      <WhatThisShows />
      <FinalTakeaways />
      <CaseStudySummary />
      <PrototypeClosing />
    </article>
  )
}
