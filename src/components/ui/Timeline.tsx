import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { StatusTone } from './StatusDot'
import s from './Timeline.module.css'

export interface TimelineItem {
  /** Time / phase label, e.g. "T+00:04" or "Detection". */
  marker: ReactNode
  title: ReactNode
  description?: ReactNode
  tone?: StatusTone
  /** Right-aligned meta (owner, SLA, duration). */
  meta?: ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

/** Vertical timeline for incident / RCA / vendor-lifecycle flows. */
export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn(s.timeline, className)}>
      {items.map((item, i) => (
        <li key={i} className={s.item}>
          <span
            className={cn(s.node, s[`tone-${item.tone ?? 'neutral'}`])}
            aria-hidden="true"
          />
          <div className={s.content}>
            <div className={s.row}>
              <span className={s.marker}>{item.marker}</span>
              {item.meta && <span className={s.meta}>{item.meta}</span>}
            </div>
            <p className={s.title}>{item.title}</p>
            {item.description && <p className={s.desc}>{item.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}
