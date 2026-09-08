import type { Dispatch } from 'react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { SCENARIOS } from './_data'
import type { PrototypeAction, PrototypeState } from './_state'
import { ScenarioBar } from './ScenarioBar'
import { ScenarioStepper } from './ScenarioStepper'
import { DetectPanel } from './DetectPanel'
import { IncidentDetailPanel } from './IncidentDetailPanel'
import { ActionPanel } from './ActionPanel'
import { ResolvePanel } from './ResolvePanel'
import { LearnPanel } from './LearnPanel'
import { AuditLogPanel } from './AuditLogPanel'
import { StageModals } from './StageModals'
import s from './PrototypeStage.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

export function PrototypeStage({ state, dispatch }: Props) {
  const sc = SCENARIOS[state.scenario]

  return (
    <section className={s.section} id="prototype-app">
      <Container size="wide">
        <div className={s.head}>
          <div>
            <Eyebrow>Featured scenario</Eyebrow>
            <h2 className={s.title}>{sc.label} — from detection to resolution</h2>
            <p className={s.lead}>
              This walkthrough shows how an operator handles the incident below, based on
              reliability themes identified from public user feedback. The payment scenario
              is the most detailed; use “Try this scenario” to switch.
            </p>
          </div>
        </div>

        <div className={s.frame}>
          <ScenarioBar state={state} dispatch={dispatch} />

          <Callout kind="assumption" className={s.banner}>
            Illustrative prototype data — fictional incident and transaction IDs, no real
            customer data. Every action here is simulated with local state.
          </Callout>

          <div className={s.layout}>
            <div className={s.main}>
              <ScenarioStepper state={state} dispatch={dispatch} />

              <div className={s.panel}>
                {state.step === 'detect' && <DetectPanel state={state} dispatch={dispatch} />}
                {state.step === 'investigate' && (
                  <IncidentDetailPanel state={state} dispatch={dispatch} />
                )}
                {state.step === 'act' && <ActionPanel state={state} dispatch={dispatch} />}
                {state.step === 'resolve' && <ResolvePanel state={state} dispatch={dispatch} />}
                {state.step === 'learn' && <LearnPanel state={state} dispatch={dispatch} />}
              </div>
            </div>

            <AuditLogPanel state={state} />
          </div>
        </div>

        <p className={s.foot}>
          <Pill tone="proposed" caps size="sm">
            Proposed interactive prototype
          </Pill>{' '}
          <span>
            Conceptual state model: Open → Assigned → Investigating → Escalated → Resolved →
            Closed.
          </span>
        </p>
      </Container>

      <StageModals state={state} dispatch={dispatch} />
    </section>
  )
}
