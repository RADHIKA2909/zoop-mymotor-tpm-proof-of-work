import { useState, type Dispatch } from 'react'
import { cn } from '@/lib/cn'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { DataTable, type Column } from '@/components/ui/DataTable'
import {
  INCIDENT_LIST,
  INCIDENT_STATUS_TONE,
  SCENARIOS,
  SEVERITY_FILTERS,
  SEVERITY_TONE,
  STATUS_FILTERS,
  type IncidentRow,
} from './_data'
import type { PrototypeAction, PrototypeState } from './_state'
import s from './DetectPanel.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

export function DetectPanel({ state, dispatch }: Props) {
  const [severity, setSeverity] = useState<string>(SEVERITY_FILTERS[0])
  const [status, setStatus] = useState<string>(STATUS_FILTERS[0])

  const rows = INCIDENT_LIST.filter(
    (r) =>
      (severity === SEVERITY_FILTERS[0] || r.severity === severity) &&
      (status === STATUS_FILTERS[0] || r.status === status),
  )

  const step = SCENARIOS[state.scenario].steps.detect

  const open = (row: IncidentRow) => {
    if (!row.scenarioId) return
    if (row.scenarioId !== state.scenario) {
      dispatch({ type: 'SELECT_SCENARIO', scenario: row.scenarioId })
    }
    dispatch({ type: 'OPEN_INCIDENT' })
  }

  const columns: Column<IncidentRow>[] = [
    { key: 'id', header: 'ID', render: (r) => <code className={s.id}>{r.id}</code> },
    { key: 'issue', header: 'Issue', render: (r) => <span className={s.issue}>{r.issue}</span> },
    {
      key: 'severity',
      header: 'Severity',
      render: (r) => (
        <Pill tone={SEVERITY_TONE[r.severity]} size="sm" dot>
          {r.severity}
        </Pill>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <Pill tone={INCIDENT_STATUS_TONE[r.status]} size="sm">
          {r.status}
        </Pill>
      ),
    },
    { key: 'age', header: 'Age', align: 'right', hideOnMobile: true },
    { key: 'owner', header: 'Owner', hideOnMobile: true },
  ]

  return (
    <div className={s.panel}>
      <div className={s.head}>
        <div>
          <p className={s.stepTitle}>{step.title}</p>
          <p className={s.stepBlurb}>{step.blurb}</p>
        </div>
      </div>

      <div className={s.filters}>
        <FilterGroup label="Severity" options={[...SEVERITY_FILTERS]} value={severity} onChange={setSeverity} />
        <FilterGroup label="Status" options={[...STATUS_FILTERS]} value={status} onChange={setStatus} />
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        onRowClick={(r) => open(r)}
        activeRowId={INCIDENT_LIST.find((r) => r.scenarioId === state.scenario)?.id}
        density="compact"
        emptyMessage="No incidents match these filters."
      />

      <Callout kind="assumption" className={s.note}>
        Illustrative incident data — fictional IDs, no real customer data. Select a row to open the incident.
      </Callout>
    </div>
  )
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className={s.group}>
      <span className={s.groupLabel}>{label}</span>
      <div className={s.chips} role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            className={cn(s.chip, value === o && s.chipActive)}
            aria-pressed={value === o}
            onClick={() => onChange(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
