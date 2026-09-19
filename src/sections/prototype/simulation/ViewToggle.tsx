import type { Dispatch } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import type { SimView } from './_simData'
import type { SimAction } from './_simState'
import s from './ViewToggle.module.css'

interface Props {
  view: SimView
  dispatch: Dispatch<SimAction>
}

const OPTIONS: { id: SimView; label: string; icon: 'gauge' | 'wallet' }[] = [
  { id: 'control-tower', label: 'Control Tower', icon: 'gauge' },
  { id: 'mymotor', label: 'MyMotor', icon: 'wallet' },
]

export function ViewToggle({ view, dispatch }: Props) {
  return (
    <div className={s.toggle} role="tablist" aria-label="View">
      {OPTIONS.map((opt) => (
        <button
          key={opt.id}
          role="tab"
          aria-selected={view === opt.id}
          className={cn(s.option, view === opt.id && s.optionActive)}
          onClick={() => dispatch({ type: 'SELECT_VIEW', view: opt.id })}
        >
          <Icon name={opt.icon} size={15} />
          {opt.label}
        </button>
      ))}
    </div>
  )
}
