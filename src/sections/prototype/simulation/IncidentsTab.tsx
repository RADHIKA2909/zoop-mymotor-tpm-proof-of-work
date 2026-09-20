import { useEffect, type Dispatch } from 'react'
import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import { Drawer } from '@/components/ui/Drawer'
import { Timeline, type TimelineItem } from '@/components/ui/Timeline'
import {
  INCIDENT,
  INCIDENT_TIMELINE,
  NO_EXECUTE_NOTE,
  RCA,
  RCA_LABEL,
  RECONCILE_STEP_LABEL,
  RECONCILE_SUCCESS_LABEL,
  RECONCILE_TRIGGERED_LABEL,
  type PermissionLevel,
} from './_simData'
import type { SimAction, SimState } from './_simState'
import s from './IncidentsTab.module.css'

interface Props {
  state: SimState
  dispatch: Dispatch<SimAction>
  perm: PermissionLevel
}

export function IncidentsTab({ state, dispatch, perm }: Props) {
  const canExecute = perm === 'execute'
  const resolved = state.transaction.internalStatus === 'success'

  // Simulate the reconciliation call — cleaned up if the panel unmounts mid-flight.
  useEffect(() => {
    if (!state.reconciling) return
    const t = window.setTimeout(() => dispatch({ type: 'RECONCILE_DONE' }), 900)
    return () => window.clearTimeout(t)
  }, [state.reconciling, dispatch])

  const timeline: TimelineItem[] = INCIDENT_TIMELINE.map((t) => ({
    marker: t.time,
    title: t.label,
    tone: t.tone,
  }))
  // "Reconciliation triggered" only appears once the operator has actually
  // clicked Reconcile — never before, even though the incident itself starts
  // in a degraded/pending state.
  if (state.reconciling || resolved) {
    timeline.push({ marker: '10:42', title: RECONCILE_TRIGGERED_LABEL, tone: 'info' })
  }
  if (resolved) {
    timeline.push({ marker: '—', title: 'Transaction = Success', tone: 'success' })
  }

  return (
    <div className={s.wrap}>
      <div className={s.card}>
        <div className={s.cardHead}>
          <div>
            <p className={s.title}>{INCIDENT.title}</p>
            <p className={s.sub}>{INCIDENT.id}</p>
          </div>
          <Pill tone={resolved ? 'success' : 'error'} size="sm" dot>
            {resolved ? 'Resolved' : 'Degraded'}
          </Pill>
        </div>
        <dl className={s.metrics}>
          <div><dt>Success rate</dt><dd>96.8%</dd></div>
          <div><dt>Failed transactions</dt><dd>{INCIDENT.affectedTransactions}</dd></div>
          <div><dt>SLA</dt><dd>{resolved ? 'Within target' : 'Breached'}</dd></div>
        </dl>
        <Button size="sm" onClick={() => dispatch({ type: 'OPEN_INCIDENT_DRAWER' })}>
          Investigate
        </Button>
      </div>

      <Drawer
        open={state.incidentDrawerOpen}
        onClose={() => dispatch({ type: 'CLOSE_INCIDENT_DRAWER' })}
        eyebrow={INCIDENT.id}
        title={INCIDENT.title}
      >
        <div className={s.drawerBody}>
          <dl className={s.fields}>
            <div><dt>Severity</dt><dd>{INCIDENT.severity}</dd></div>
            <div><dt>Started</dt><dd>{INCIDENT.started}</dd></div>
            <div><dt>Affected transactions</dt><dd>{INCIDENT.affectedTransactions}</dd></div>
            <div><dt>Customer impact</dt><dd>{INCIDENT.customerImpact}</dd></div>
            <div><dt>Current status</dt><dd>{resolved ? 'Resolved' : 'Investigating'}</dd></div>
            <div><dt>Detected through</dt><dd>{INCIDENT.detectedThrough}</dd></div>
          </dl>

          <p className={s.blockLabel}>Transaction timeline</p>
          <Timeline items={timeline} />

          <p className={s.blockLabel}>Reconciliation</p>
          <div className={s.txnCard}>
            <div className={s.txnRow}>
              <span>Transaction</span>
              <span className={s.mono}>{state.transaction.id}</span>
            </div>
            <div className={s.txnRow}>
              <span>Provider status</span>
              <Pill tone="success" size="sm" dot>Success</Pill>
            </div>
            <div className={s.txnRow}>
              <span>Internal status</span>
              <Pill tone={resolved ? 'success' : 'pending'} size="sm" dot>
                {resolved ? 'Success' : 'Pending'}
              </Pill>
            </div>
            <div className={s.txnRow}>
              <span>Amount</span>
              <span className={s.mono}>₹{state.transaction.amount.toLocaleString('en-IN')}</span>
            </div>

            {!resolved && canExecute && (
              <Button
                size="sm"
                onClick={() => dispatch({ type: 'START_RECONCILE' })}
                disabled={state.reconciling}
              >
                {state.reconciling ? RECONCILE_STEP_LABEL : 'Reconcile Transaction'}
              </Button>
            )}
            {!resolved && !canExecute && (
              <Callout kind="assumption" className={s.permNote}>
                {NO_EXECUTE_NOTE}
              </Callout>
            )}
            {resolved && <p className={s.success}>✓ {RECONCILE_SUCCESS_LABEL}</p>}
          </div>

          {resolved && (
            <>
              <p className={s.blockLabel}>Root Cause Analysis</p>
              <dl className={s.rca}>
                <div className={s.rcaRow}><dt>Problem</dt><dd>{RCA.problem}</dd></div>
                <div className={s.rcaRow}><dt>Impact</dt><dd>{RCA.impact}</dd></div>
                <div className={s.rcaRow}><dt>Likely root cause</dt><dd>{RCA.rootCause}</dd></div>
                <div className={s.rcaRow}><dt>Immediate mitigation</dt><dd>{RCA.mitigation}</dd></div>
                <div className={s.rcaRow}>
                  <dt>Long-term improvement</dt>
                  <dd>
                    <ul className={s.rcaList}>
                      {RCA.improvements.map((imp) => (
                        <li key={imp}>{imp}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              <Pill tone="proposed" variant="outline" caps size="sm">{RCA_LABEL}</Pill>
            </>
          )}
        </div>
      </Drawer>
    </div>
  )
}
