import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import s from './KpiCard.module.css'

interface KpiCardProps {
  label: ReactNode
  value: ReactNode
  unit?: ReactNode
  /** e.g. "+2.1 pts vs. last week". */
  delta?: ReactNode
  deltaDirection?: 'up' | 'down' | 'flat'
  /** Whether "up" is good (green) — success metrics — or bad (red) — failure metrics. */
  deltaGood?: 'up' | 'down'
  sublabel?: ReactNode
  tone?: 'default' | 'success' | 'warning' | 'error' | 'info'
  /** Slot for a hand-built sparkline / mini chart. */
  chart?: ReactNode
  className?: string
}

/** Compact metric tile for KPI headers and the Control Tower. */
export function KpiCard({
  label,
  value,
  unit,
  delta,
  deltaDirection = 'flat',
  deltaGood = 'up',
  sublabel,
  tone = 'default',
  chart,
  className,
}: KpiCardProps) {
  const isGood =
    deltaDirection === 'flat'
      ? null
      : deltaDirection === deltaGood
        ? true
        : false

  return (
    <div className={cn(s.card, s[tone], className)}>
      <p className={s.label}>{label}</p>
      <p className={s.value}>
        {value}
        {unit && <span className={s.unit}>{unit}</span>}
      </p>
      {delta && (
        <p
          className={cn(
            s.delta,
            isGood === true && s.good,
            isGood === false && s.bad,
          )}
        >
          {deltaDirection !== 'flat' && (
            <Icon
              name={deltaDirection === 'up' ? 'arrow-up-right' : 'arrow-right'}
              size={13}
              className={deltaDirection === 'down' ? s.downIcon : undefined}
            />
          )}
          {delta}
        </p>
      )}
      {sublabel && <p className={s.sublabel}>{sublabel}</p>}
      {chart && <div className={s.chart}>{chart}</div>}
    </div>
  )
}
