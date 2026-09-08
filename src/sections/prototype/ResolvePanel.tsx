import type { Dispatch } from 'react'
import { Button } from '@/components/ui/Button'
import { Pill } from '@/components/ui/Pill'
import { Icon } from '@/components/ui/Icon'
import { SCENARIOS } from './_data'
import type { PrototypeAction, PrototypeState } from './_state'
import s from './ResolvePanel.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

export function ResolvePanel({ state, dispatch }: Props) {
  const sc = SCENARIOS[state.scenario]
  const resolved = state.status === 'Resolved' || state.status === 'Closed'

  if (!resolved) {
    return (
      <div className={s.pending}>
        <p className={s.pendingTitle}>{sc.steps.resolve.title}</p>
        <p className={s.pendingBlurb}>{sc.steps.resolve.blurb}</p>
        <Button iconRight="arrow-right" onClick={() => dispatch({ type: 'RESOLVE_INCIDENT' })}>
          Mark incident as resolved
        </Button>
      </div>
    )
  }

  const r = sc.resolution
  return (
    <div className={s.panel}>
      <div className={s.success}>
        <span className={s.disc} aria-hidden="true">
          <Icon name="check" size={26} />
        </span>
        <h3 className={s.title}>Incident resolved</h3>
        <p className={s.sub}>
          {sc.incident.id} has been resolved and the customer can continue their journey.
        </p>
      </div>

      <div className={s.summary}>
        <span className={s.summaryLabel}>Resolution summary</span>
        <p className={s.summaryText}>{r.summary}</p>
        <dl className={s.defs}>
          <div><dt>Resolution type</dt><dd>{r.type}</dd></div>
          <div><dt>Customer impact</dt><dd>{r.impact}</dd></div>
          <div><dt>Resolved by</dt><dd>{state.owner ?? r.resolvedBy}</dd></div>
          <div><dt>Resolution time</dt><dd>Illustrative</dd></div>
        </dl>
        <Pill tone="assumption" variant="outline" caps size="sm">
          Illustrative — no performance claim
        </Pill>
      </div>

      <Button
        variant="secondary"
        iconRight="arrow-right"
        onClick={() => dispatch({ type: 'SET_STEP', step: 'learn' })}
        className={s.next}
      >
        Continue to Learn
      </Button>
    </div>
  )
}
