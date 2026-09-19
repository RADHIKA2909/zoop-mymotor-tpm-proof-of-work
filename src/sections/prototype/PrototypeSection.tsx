import { useReducer } from 'react'
import { initialState, reducer } from './_state'
import { PrototypeHero } from './PrototypeHero'
import { PrototypeIntro } from './PrototypeIntro'
import { PrototypeStage } from './PrototypeStage'
import { ControlTowerSimulation } from './simulation/ControlTowerSimulation'
import { OtherScenarios } from './OtherScenarios'
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
 *
 * CTO deep-dive branch only: `ControlTowerSimulation` is a second, additive
 * interactive module (its own reducer, `simulation/_simState.ts`) — an RBAC +
 * shared-state simulation between a Control Tower panel and a MyMotor mini
 * app. It does not modify the scenario stepper above it. See CLAUDE.md §22.
 */
export function PrototypeSection() {
  const [state, dispatch] = useReducer(reducer, 'payment', initialState)

  return (
    <article>
      <PrototypeHero />
      <PrototypeIntro />
      <PrototypeStage state={state} dispatch={dispatch} />
      <ControlTowerSimulation />
      <OtherScenarios dispatch={dispatch} />
      <PrototypeClosing />
    </article>
  )
}
