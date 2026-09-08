import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import s from './StatGrid.module.css'

interface StatGridProps {
  children: ReactNode
  /** Minimum column width before wrapping. */
  minColumn?: number
  className?: string
}

/** Responsive auto-fit grid for KpiCards / stat tiles. */
export function StatGrid({ children, minColumn = 200, className }: StatGridProps) {
  return (
    <div
      className={cn(s.grid, className)}
      style={{ '--min-col': `${minColumn}px` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

interface StatProps {
  label: ReactNode
  value: ReactNode
  hint?: ReactNode
}

/** Lightweight inline stat (label + big number) without the KpiCard chrome. */
export function Stat({ label, value, hint }: StatProps) {
  return (
    <div className={s.stat}>
      <span className={s.statValue}>{value}</span>
      <span className={s.statLabel}>{label}</span>
      {hint && <span className={s.statHint}>{hint}</span>}
    </div>
  )
}
