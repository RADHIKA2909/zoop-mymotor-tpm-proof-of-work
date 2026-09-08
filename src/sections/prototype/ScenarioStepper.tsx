import type { Dispatch } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import { STEPS } from './_data'
import { stepDone, type PrototypeAction, type PrototypeState } from './_state'
import s from './ScenarioStepper.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

export function ScenarioStepper({ state, dispatch }: Props) {
  return (
    <ol className={s.stepper}>
      {STEPS.map((step, i) => {
        const active = state.step === step.id
        const done = stepDone(state, step.id)
        return (
          <li key={step.id} className={s.item}>
            <button
              className={cn(s.step, active && s.active, done && s.done)}
              aria-current={active ? 'step' : undefined}
              onClick={() => dispatch({ type: 'SET_STEP', step: step.id })}
            >
              <span className={s.marker}>
                {done && !active ? <Icon name="check" size={13} /> : step.num}
              </span>
              <span className={s.label}>{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <Icon name="chevron-right" size={14} className={s.sep} aria-hidden="true" />
            )}
          </li>
        )
      })}
    </ol>
  )
}
