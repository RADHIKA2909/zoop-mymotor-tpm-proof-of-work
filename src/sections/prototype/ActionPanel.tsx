import type { Dispatch } from 'react'
import { cn } from '@/lib/cn'
import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import { Icon } from '@/components/ui/Icon'
import { OPERATOR_ACTIONS, SCENARIOS, SENSITIVE_NOTE, TEAMS } from './_data'
import type { PrototypeAction, PrototypeState } from './_state'
import s from './ActionPanel.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

export function ActionPanel({ state, dispatch }: Props) {
  const sc = SCENARIOS[state.scenario]
  const step = sc.steps.act
  const resolved = state.status === 'Resolved' || state.status === 'Closed'

  const runAction = (id: string) => {
    switch (id) {
      case 'assign':
        dispatch({ type: 'ASSIGN_OWNER', owner: state.owner ?? sc.defaultOwner })
        break
      case 'note':
        dispatch({ type: 'ADD_NOTE' })
        break
      case 'provider':
        dispatch({ type: 'OPEN_MODAL', modal: 'provider' })
        break
      case 'escalate':
        dispatch({ type: 'OPEN_MODAL', modal: 'escalate' })
        break
      case 'customer':
        dispatch({ type: 'OPEN_MODAL', modal: 'customer' })
        break
      case 'retry':
        dispatch({ type: 'REQUEST_RETRY_APPROVAL' })
        break
      case 'resolve':
        dispatch({ type: 'RESOLVE_INCIDENT' })
        break
    }
  }

  return (
    <div className={s.panel}>
      <div className={s.head}>
        <p className={s.stepTitle}>{step.title}</p>
        <p className={s.stepBlurb}>{step.blurb}</p>
      </div>

      <div className={s.grid}>
        {/* Owner */}
        <div className={s.block}>
          <span className={s.blockLabel}>Assign owner</span>
          <label className={s.selectWrap}>
            <select
              className={s.select}
              value={state.owner ?? ''}
              onChange={(e) => dispatch({ type: 'ASSIGN_OWNER', owner: e.target.value })}
            >
              <option value="" disabled>
                Select a team…
              </option>
              {TEAMS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={14} className={s.selectIcon} />
          </label>
          <p className={s.ownerState}>
            Owner: <strong>{state.owner ?? 'Unassigned'}</strong> · Status:{' '}
            <strong>{state.status}</strong>
          </p>
        </div>

        {/* Actions */}
        <div className={s.block}>
          <span className={s.blockLabel}>Operator actions</span>
          <ul className={s.actions}>
            {OPERATOR_ACTIONS.map((a) => {
              const isRetry = a.id === 'retry'
              const done = Boolean(
                (a.id === 'provider' && state.providerContacted) ||
                  (a.id === 'escalate' && state.escalated) ||
                  (a.id === 'assign' && state.owner) ||
                  (a.id === 'customer' && state.customerStatus) ||
                  (a.id === 'resolve' && resolved),
              )
              return (
                <li key={a.id} className={s.actionRow}>
                  <button
                    className={cn(s.action, done && s.actionDone)}
                    onClick={() => runAction(a.id)}
                    disabled={a.id === 'resolve' && resolved}
                  >
                    <Icon name={a.icon} size={15} />
                    <span>{a.label}</span>
                    {a.kind === 'approval' && (
                      <Pill tone="warning" size="sm">
                        <Icon name="lock" size={10} /> Requires approval
                      </Pill>
                    )}
                    {done && <Icon name="check" size={14} className={s.doneMark} />}
                  </button>
                  {isRetry && state.retryApproval !== 'none' && (
                    <ApprovalRow state={state} dispatch={dispatch} />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <Callout kind="note" className={s.note}>
        {SENSITIVE_NOTE}
      </Callout>

      {!resolved && (
        <Button iconRight="arrow-right" onClick={() => dispatch({ type: 'RESOLVE_INCIDENT' })} className={s.resolveCta}>
          Mark as resolved
        </Button>
      )}
    </div>
  )
}

function ApprovalRow({ state, dispatch }: Props) {
  if (state.retryApproval === 'requested') {
    return (
      <div className={s.approval}>
        <span className={s.approvalText}>
          <Icon name="clock" size={13} /> Retry requested — awaiting Team Lead approval.
        </span>
        {state.role === 'lead' ? (
          <span className={s.approvalBtns}>
            <Button size="sm" onClick={() => dispatch({ type: 'RESOLVE_RETRY_APPROVAL', decision: 'approved' })}>
              Approve
            </Button>
            <Button size="sm" variant="ghost" onClick={() => dispatch({ type: 'RESOLVE_RETRY_APPROVAL', decision: 'rejected' })}>
              Reject
            </Button>
          </span>
        ) : (
          <span className={s.approvalHint}>Switch role to “Team Lead” to approve.</span>
        )}
      </div>
    )
  }
  return (
    <div className={s.approval} data-state={state.retryApproval}>
      <span className={s.approvalText}>
        <Icon name={state.retryApproval === 'approved' ? 'check' : 'close'} size={13} />
        Retry {state.retryApproval === 'approved' ? 'approved' : 'rejected'} by Team Lead.
      </span>
    </div>
  )
}
