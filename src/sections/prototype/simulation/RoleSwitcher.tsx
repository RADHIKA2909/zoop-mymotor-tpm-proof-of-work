import type { Dispatch } from 'react'
import { cn } from '@/lib/cn'
import { Pill } from '@/components/ui/Pill'
import { ROLE_LABEL, SIM_ROLES, type SimRole } from './_simData'
import type { SimAction } from './_simState'
import s from './RoleSwitcher.module.css'

interface Props {
  role: SimRole
  dispatch: Dispatch<SimAction>
}

export function RoleSwitcher({ role, dispatch }: Props) {
  const current = SIM_ROLES.find((r) => r.id === role)!

  return (
    <div className={s.wrap}>
      <div className={s.row}>
        <span className={s.groupLabel}>View as</span>
        <div className={s.tabs} role="tablist" aria-label="Role">
          {SIM_ROLES.map((r) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={role === r.id}
              className={cn(s.tab, role === r.id && s.tabActive)}
              onClick={() => dispatch({ type: 'SELECT_ROLE', role: r.id })}
            >
              {r.label}
            </button>
          ))}
        </div>
        <Pill tone="proposed" caps size="sm">Proposed role model</Pill>
      </div>
      <p className={s.caption}>
        <strong>{current.label}</strong> — {current.can} <span className={s.note}>{ROLE_LABEL}</span>
      </p>
    </div>
  )
}
