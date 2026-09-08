import { cn } from '@/lib/cn'
import s from './StatusDot.module.css'

export type StatusTone =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'pending'
  | 'neutral'

interface StatusDotProps {
  tone: StatusTone
  label?: string
  /** Soft pulsing ring — use sparingly for "live / active" states. */
  pulse?: boolean
  className?: string
}

export function StatusDot({ tone, label, pulse, className }: StatusDotProps) {
  return (
    <span className={cn(s.wrap, className)}>
      <span
        className={cn(s.dot, s[tone], pulse && s.pulse)}
        aria-hidden={label ? 'true' : undefined}
      />
      {label && <span className={s.label}>{label}</span>}
    </span>
  )
}
