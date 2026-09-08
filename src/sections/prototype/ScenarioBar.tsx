import type { Dispatch } from 'react'
import { cn } from '@/lib/cn'
import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import {
  ROLE_LABEL,
  ROLES,
  SCENARIO_ORDER,
  SCENARIOS,
  type RoleId,
  type ScenarioId,
} from './_data'
import type { PrototypeAction, PrototypeState } from './_state'
import s from './ScenarioBar.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

export function ScenarioBar({ state, dispatch }: Props) {
  const role = ROLES.find((r) => r.id === state.role)!

  return (
    <div className={s.bar}>
      <div className={s.row}>
        <label className={s.field}>
          <span className={s.fieldLabel}>Try this scenario</span>
          <span className={s.selectWrap}>
            <select
              className={s.select}
              value={state.scenario}
              onChange={(e) =>
                dispatch({ type: 'SELECT_SCENARIO', scenario: e.target.value as ScenarioId })
              }
            >
              {SCENARIO_ORDER.map((id) => (
                <option key={id} value={id}>
                  {SCENARIOS[id].label}
                </option>
              ))}
            </select>
            <Icon name="chevron-down" size={14} className={s.selectIcon} />
          </span>
        </label>

        <Button variant="ghost" size="sm" iconLeft="refresh" onClick={() => dispatch({ type: 'RESET' })}>
          Reset scenario
        </Button>
      </div>

      <div className={s.roleRow}>
        <span className={s.roleGroupLabel}>Acting as</span>
        <div className={s.roleTabs} role="tablist" aria-label="Role">
          {ROLES.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={state.role === r.id}
              className={cn(s.roleTab, state.role === r.id && s.roleTabActive)}
              onClick={() => dispatch({ type: 'SET_ROLE', role: r.id as RoleId })}
            >
              {r.label}
            </button>
          ))}
        </div>
        <Pill tone="proposed" caps size="sm">Proposed role model</Pill>
      </div>
      <p className={s.roleCaption}>
        <strong>{role.label}</strong> — {role.can} <span className={s.roleNote}>{ROLE_LABEL}</span>
      </p>
    </div>
  )
}
