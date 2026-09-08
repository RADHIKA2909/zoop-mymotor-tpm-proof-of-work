import type { Dispatch, ReactNode } from 'react'
import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import { Tabs } from '@/components/ui/Tabs'
import { Timeline } from '@/components/ui/Timeline'
import { DataTable, type Column } from '@/components/ui/DataTable'
import { Icon } from '@/components/ui/Icon'
import {
  CUSTOMER_STATUS_OPTIONS,
  DETAIL_TABS,
  SCENARIOS,
  SEVERITY_TONE,
  type TabId,
} from './_data'
import { STATUS_TONE, type PrototypeAction, type PrototypeState } from './_shared'
import s from './IncidentDetailPanel.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

export function IncidentDetailPanel({ state, dispatch }: Props) {
  const sc = SCENARIOS[state.scenario]
  const inc = sc.incident

  return (
    <div className={s.panel}>
      <header className={s.header}>
        <div className={s.headMain}>
          <span className={s.id}>{inc.id}</span>
          <h3 className={s.issue}>{inc.issue}</h3>
          <p className={s.meta}>
            {inc.customers} affected · opened {inc.opened}
          </p>
        </div>
        <div className={s.headPills}>
          <Pill tone={SEVERITY_TONE[inc.severity]} size="sm" dot>
            {inc.severity}
          </Pill>
          <Pill tone={STATUS_TONE[state.status]} size="sm">
            {state.status}
          </Pill>
        </div>
      </header>

      <Tabs
        variant="pill"
        activeId={state.activeTab}
        onChange={(id) => dispatch({ type: 'SET_TAB', tab: id as TabId })}
        items={DETAIL_TABS.map((t) => ({
          id: t.id,
          label: t.label,
          content: <TabBody tab={t.id} state={state} dispatch={dispatch} />,
        }))}
      />
    </div>
  )
}

function TabBody({
  tab,
  state,
  dispatch,
}: {
  tab: TabId
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}) {
  const sc = SCENARIOS[state.scenario]

  if (tab === 'overview') {
    const o = sc.overview
    return (
      <div className={s.body}>
        <p className={s.summary}>{o.summary}</p>
        <div className={s.states}>
          <span className={s.stateChip} data-kind="expected">
            <span className={s.stateKey}>Expected</span>
            {o.expected}
          </span>
          <Icon name="arrow-right" size={14} className={s.stateArrow} />
          <span className={s.stateChip} data-kind="actual">
            <span className={s.stateKey}>Actual</span>
            {o.actual}
          </span>
        </div>
        <dl className={s.defs}>
          <Def k="Journey stage">{o.journeyStage}</Def>
          <Def k="Customer impact">{sc.incident.customers}</Def>
          <Def k="Dependency">{o.dependency}</Def>
          <Def k="Owner">{state.owner ?? o.owner}</Def>
          <Def k="Next action">{o.nextAction}</Def>
        </dl>
        <Pill tone="assumption" variant="outline" caps size="sm">
          Illustrative incident
        </Pill>
      </div>
    )
  }

  if (tab === 'timeline') {
    return (
      <div className={s.body}>
        <Timeline
          items={sc.timeline.map((e) => ({ marker: e.time, title: e.label, tone: e.tone }))}
        />
        <Callout kind="assumption" className={s.note}>
          Illustrative incident timeline — fictional timestamps showing state progression.
        </Callout>
      </div>
    )
  }

  if (tab === 'impact') {
    const ci = sc.customerImpact
    return (
      <div className={s.body}>
        <dl className={s.defs}>
          <Def k="Customers affected">{ci.count}</Def>
          <Def k="Transaction">{ci.txnId}</Def>
          <Def k="Journey">{ci.journey}</Def>
          <Def k="Current state">{ci.state}</Def>
        </dl>
        <div className={s.msgCard}>
          <span className={s.msgLabel}>Customer-facing message</span>
          <p className={s.msg}>{state.customerStatus ? statusMessage(state.customerStatus) : ci.message}</p>
          {state.customerStatus && (
            <span className={s.msgTag}>Updated by operator · {state.customerStatus}</span>
          )}
        </div>
        <div className={s.impactActions}>
          <Button variant="secondary" size="sm" iconLeft="headset" onClick={() => dispatch({ type: 'OPEN_MODAL', modal: 'customer' })}>
            Update customer status
          </Button>
        </div>
        <p className={s.principle}>
          Operations should know not just what failed, but who is affected.
        </p>
        <Pill tone="proposed" variant="outline" caps size="sm">
          Conceptual
        </Pill>
      </div>
    )
  }

  if (tab === 'diagnostics') {
    const d = sc.diagnostics
    return (
      <div className={s.body}>
        <div className={s.states}>
          <span className={s.stateChip} data-kind="expected">
            <span className={s.stateKey}>Expected state</span>
            {d.expected}
          </span>
          <Icon name="arrow-right" size={14} className={s.stateArrow} />
          <span className={s.stateChip} data-kind="actual">
            <span className={s.stateKey}>Actual state</span>
            {d.actual}
          </span>
        </div>
        <div className={s.diagGrid}>
          <div>
            <span className={s.diagLabel}>Possible signals</span>
            <ul className={s.list}>
              {d.signals.map((sig) => (
                <li key={sig}>
                  <Icon name="chevron-right" size={12} />
                  {sig}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className={s.diagLabel}>Recent events</span>
            <ul className={s.list}>
              {d.recentEvents.map((e) => (
                <li key={e}>
                  <Icon name="chevron-right" size={12} />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <dl className={s.defs}>
          <Def k="Dependency">{d.dependency}</Def>
        </dl>
        <Callout kind="inferred" className={s.note}>
          Conceptual diagnostics — potential signals, not confirmed ZOOP architecture.
        </Callout>
      </div>
    )
  }

  // related
  const columns: Column<(typeof sc.relatedTxns)[number]>[] = [
    { key: 'id', header: 'Transaction', render: (r) => <code className={s.id}>{r.id}</code> },
    { key: 'journey', header: 'Journey' },
    { key: 'state', header: 'State' },
    { key: 'age', header: 'Age', align: 'right', hideOnMobile: true },
    { key: 'provider', header: 'Provider', hideOnMobile: true },
  ]
  return (
    <div className={s.body}>
      <DataTable
        columns={columns}
        rows={sc.relatedTxns}
        getRowId={(r) => r.id}
        density="compact"
      />
      <p className={s.principle}>
        A related-transaction view helps distinguish a single incident from a wider
        dependency problem.
      </p>
      <Callout kind="proposed" className={s.note}>
        Conceptual view — illustrative transactions, fictional IDs.
      </Callout>
    </div>
  )
}

function Def({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className={s.def}>
      <dt>{k}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function statusMessage(value: string): string {
  return CUSTOMER_STATUS_OPTIONS.find((o) => o.value === value)?.message ?? value
}
