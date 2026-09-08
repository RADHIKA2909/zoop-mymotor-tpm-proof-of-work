import { cn } from '@/lib/cn'
import s from './PriorityPlot.module.css'

export type PriorityTone =
  | 'brand'
  | 'error'
  | 'warning'
  | 'success'
  | 'neutral'

export interface PriorityPoint {
  id: string
  label: string
  /** 0–100, left → right. */
  x: number
  /** 0–100, bottom → top. */
  y: number
  tone?: PriorityTone
  /** Larger dot + focus ring + always-visible label. */
  emphasis?: boolean
}

interface PriorityPlotProps {
  points: PriorityPoint[]
  xAxisLabel: string
  yAxisLabel: string
  quadrantLabels?: {
    topRight?: string
    topLeft?: string
    bottomLeft?: string
    bottomRight?: string
  }
  className?: string
}

/**
 * Data-agnostic 2×2 priority scatter. Positions are conceptual (0–100) — this
 * plot deliberately shows no numeric scores. Used by the §3 and §4 prioritization
 * sections; each wraps it in its own section shell + copy + side panel.
 */
export function PriorityPlot({
  points,
  xAxisLabel,
  yAxisLabel,
  quadrantLabels,
  className,
}: PriorityPlotProps) {
  return (
    <div className={cn(s.wrap, className)}>
      <span className={s.yAxis}>{yAxisLabel} →</span>
      <div className={s.plot}>
        {quadrantLabels?.topRight && (
          <span className={cn(s.quad, s.qTopRight)}>{quadrantLabels.topRight}</span>
        )}
        {quadrantLabels?.topLeft && (
          <span className={cn(s.quad, s.qTopLeft)}>{quadrantLabels.topLeft}</span>
        )}
        {quadrantLabels?.bottomLeft && (
          <span className={cn(s.quad, s.qBottomLeft)}>{quadrantLabels.bottomLeft}</span>
        )}
        {quadrantLabels?.bottomRight && (
          <span className={cn(s.quad, s.qBottomRight)}>{quadrantLabels.bottomRight}</span>
        )}

        {points.map((p) => (
          <div
            key={p.id}
            className={cn(
              s.point,
              s[`tone-${p.tone ?? 'neutral'}`],
              p.emphasis && s.emphasis,
            )}
            style={{ left: `${p.x}%`, bottom: `${p.y}%` }}
            tabIndex={0}
          >
            <span className={s.dot} />
            <span className={s.pointLabel}>{p.label}</span>
          </div>
        ))}
      </div>
      <span className={s.xAxis}>{xAxisLabel} →</span>
    </div>
  )
}
