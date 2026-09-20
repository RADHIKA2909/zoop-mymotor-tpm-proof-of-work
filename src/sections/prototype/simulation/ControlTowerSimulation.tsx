import { useReducer } from 'react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { Button } from '@/components/ui/Button'
import { initialSimState, simReducer } from './_simState'
import { SIM_DISCLAIMER, SIM_INTRO } from './_simData'
import { RoleSwitcher } from './RoleSwitcher'
import { ViewToggle } from './ViewToggle'
import { ControlTowerPanel } from './ControlTowerPanel'
import { MyMotorPanel } from './MyMotorPanel'
import s from './ControlTowerSimulation.module.css'

/**
 * "Operate the Control Tower" — a self-contained RBAC + shared-state
 * simulation, additive to the existing 5-scenario incident stepper above it.
 * One reducer drives both the Control Tower panel and the MyMotor mini app,
 * so a Control Tower action (change pricing, reconcile a transaction) is
 * visibly reflected in the customer-facing MyMotor experience — not two
 * unrelated mockups sitting side by side.
 */
export function ControlTowerSimulation() {
  const [state, dispatch] = useReducer(simReducer, undefined, initialSimState)

  return (
    <section className={s.section} id="operate-control-tower">
      <Container size="wide">
        <div className={s.head}>
          <div>
            <Eyebrow>{SIM_INTRO.eyebrow}</Eyebrow>
            <h2 className={s.title}>{SIM_INTRO.title}</h2>
            <p className={s.lead}>{SIM_INTRO.lead}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => dispatch({ type: 'RESET_SIMULATION' })}>
            Reset simulation
          </Button>
        </div>

        <Callout kind="assumption" className={s.disclaimer}>
          {SIM_DISCLAIMER}
        </Callout>

        <div className={s.frame}>
          <div className={s.controls}>
            <RoleSwitcher role={state.role} dispatch={dispatch} />
            <ViewToggle view={state.view} dispatch={dispatch} />
          </div>

          <div className={s.stage}>
            {state.view === 'control-tower' ? (
              <ControlTowerPanel state={state} dispatch={dispatch} />
            ) : (
              <MyMotorPanel state={state} />
            )}
          </div>
        </div>

        <p className={s.footNote}>
          <Pill tone="proposed" caps size="sm">
            Proposed
          </Pill>{' '}
          Control Tower and MyMotor read the same simulated state — a change on one side shows up on the other.
        </p>
      </Container>
    </section>
  )
}
