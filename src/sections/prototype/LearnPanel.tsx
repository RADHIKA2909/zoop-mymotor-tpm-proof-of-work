import type { Dispatch } from 'react'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { Icon } from '@/components/ui/Icon'
import { SCENARIOS } from './_data'
import type { PrototypeAction, PrototypeState } from './_state'
import s from './LearnPanel.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

const CLOSURE = [
  'Detected',
  'Assigned',
  'Investigated',
  'Escalated',
  'Resolved',
  'Customer updated',
  'RCA captured',
]

export function LearnPanel({ state, dispatch }: Props) {
  const sc = SCENARIOS[state.scenario]
  const r = sc.rca

  return (
    <div className={s.panel}>
      <div className={s.head}>
        <p className={s.stepTitle}>Learn from the incident</p>
        <p className={s.stepBlurb}>{sc.steps.learn.blurb}</p>
      </div>

      <dl className={s.fields}>
        <Field k="Root cause category">{r.rootCauseCategory}</Field>
        <Field k="What happened?">{r.whatHappened}</Field>
        <Field k="What should prevent recurrence?">{r.prevention}</Field>
        <Field k="Related improvement">{r.relatedImprovement}</Field>
      </dl>

      <div className={s.actions}>
        <Button size="sm" variant="secondary" iconLeft="file" onClick={() => dispatch({ type: 'CAPTURE_RCA' })}>
          Add to RCA
        </Button>
        <Button size="sm" variant="secondary" iconLeft="bulb" onClick={() => dispatch({ type: 'CAPTURE_RCA' })}>
          Create product improvement
        </Button>
        <Button size="sm" variant="secondary" iconLeft="link" onClick={() => dispatch({ type: 'CAPTURE_RCA' })}>
          Link related incident
        </Button>
      </div>

      <div className={s.closure} data-closed={state.rcaCaptured}>
        <div className={s.closureHead}>
          <span className={s.closureTitle}>
            {state.rcaCaptured ? 'Incident closed' : 'Incident closure'}
          </span>
          {state.rcaCaptured && (
            <Pill tone="success" size="sm" dot>
              Closed
            </Pill>
          )}
        </div>
        <ol className={s.flow}>
          {CLOSURE.map((step, i) => (
            <li key={step} className={s.flowStep}>
              <span className={s.flowNode}>{step}</span>
              {i < CLOSURE.length - 1 && (
                <Icon name="arrow-right" size={13} className={s.flowArrow} aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
        <p className={s.closureNote}>
          Every incident should feed back into product, engineering and vendor improvements.
        </p>
      </div>

      <Pill tone="proposed" variant="outline" caps size="sm">
        Conceptual RCA workflow
      </Pill>
    </div>
  )
}

function Field({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className={s.field}>
      <dt>{k}</dt>
      <dd>{children}</dd>
    </div>
  )
}
