import { cn } from '@/lib/cn'
import { buildProgress } from '@/data/sections'
import s from './SectionProgress.module.css'

interface SectionProgressProps {
  variant?: 'bar' | 'inline'
  className?: string
}

/** "X of 6 sections built" indicator. */
export function SectionProgress({ variant = 'bar', className }: SectionProgressProps) {
  const { done, total } = buildProgress()
  const pct = Math.round((done / total) * 100)

  if (variant === 'inline') {
    return (
      <span className={cn(s.inline, className)}>
        {done}/{total} sections built
      </span>
    )
  }

  return (
    <div className={cn(s.wrap, className)}>
      <div className={s.labelRow}>
        <span className={s.label}>Build progress</span>
        <span className={s.count}>
          {done} / {total}
        </span>
      </div>
      <div className={s.track} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={s.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
