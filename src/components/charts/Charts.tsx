import { useId } from 'react'
import { cn } from '@/lib/cn'
import s from './Charts.module.css'

/* =============================================================================
   Hand-built SVG chart primitives. No charting dependency. All colours come
   from design tokens (var(--viz-*)) so they theme with the rest of the site.
   These render ILLUSTRATIVE data passed by the caller — never real ZOOP figures.
   ============================================================================= */

interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  /** Stroke colour token. */
  color?: string
  /** Fill the area under the line. */
  area?: boolean
  className?: string
  ariaLabel?: string
}

export function Sparkline({
  data,
  width = 120,
  height = 36,
  color = 'var(--viz-1)',
  area = true,
  className,
  ariaLabel = 'Trend',
}: SparklineProps) {
  const id = useId()
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const stepX = width / (data.length - 1)
  const pad = 2

  const points = data.map((d, i) => {
    const x = i * stepX
    const y = pad + (height - pad * 2) * (1 - (d - min) / span)
    return [x, y] as const
  })

  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const areaPath = `${line} L${width} ${height} L0 ${height} Z`

  return (
    <svg
      className={cn(s.sparkline, className)}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      preserveAspectRatio="none"
    >
      {area && (
        <>
          <defs>
            <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#spark-${id})`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={2.4} fill={color} />
    </svg>
  )
}

interface MiniBarsProps {
  data: { label: string; value: number; color?: string }[]
  max?: number
  height?: number
  className?: string
}

export function MiniBars({ data, max, height = 120, className }: MiniBarsProps) {
  const ceiling = max ?? (Math.max(...data.map((d) => d.value)) || 1)
  return (
    <div className={cn(s.miniBars, className)} style={{ height }}>
      {data.map((d) => (
        <div className={s.miniBarCol} key={d.label}>
          <div className={s.miniBarTrack}>
            <div
              className={s.miniBarFill}
              style={{
                height: `${(d.value / ceiling) * 100}%`,
                background: d.color ?? 'var(--viz-1)',
              }}
            />
          </div>
          <span className={s.miniBarLabel}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}

interface GaugeArcProps {
  /** 0–1. */
  value: number
  label?: string
  sublabel?: string
  size?: number
  /** Colour thresholds: value >= key uses that colour. */
  color?: string
  className?: string
}

export function GaugeArc({
  value,
  label,
  sublabel,
  size = 128,
  color = 'var(--viz-1)',
  className,
}: GaugeArcProps) {
  const clamped = Math.max(0, Math.min(1, value))
  const r = size / 2 - 10
  const circ = Math.PI * r // half circle
  const offset = circ * (1 - clamped)
  const cx = size / 2
  const cy = size / 2

  return (
    <div className={cn(s.gauge, className)} style={{ width: size }}>
      <svg viewBox={`0 0 ${size} ${size / 2 + 10}`} width={size} role="img" aria-label={label ? `${label}: ${Math.round(clamped * 100)}%` : `${Math.round(clamped * 100)}%`}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="var(--viz-grid)"
          strokeWidth={9}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className={s.gaugeArc}
        />
      </svg>
      <div className={s.gaugeText}>
        <span className={s.gaugeValue}>{Math.round(clamped * 100)}%</span>
        {label && <span className={s.gaugeLabel}>{label}</span>}
        {sublabel && <span className={s.gaugeSub}>{sublabel}</span>}
      </div>
    </div>
  )
}

interface DonutSegment {
  label: string
  value: number
  color: string
}

interface DonutProps {
  segments: DonutSegment[]
  size?: number
  thickness?: number
  centerLabel?: string
  centerValue?: string
  className?: string
}

export function Donut({
  segments,
  size = 140,
  thickness = 18,
  centerLabel,
  centerValue,
  className,
}: DonutProps) {
  const total = segments.reduce((sum, s2) => sum + s2.value, 0) || 1
  const r = (size - thickness) / 2
  const circ = 2 * Math.PI * r
  let acc = 0

  return (
    <div className={cn(s.donutWrap, className)}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} role="img" aria-label="Distribution">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--viz-grid)" strokeWidth={thickness} />
          {segments.map((seg) => {
            const len = (seg.value / total) * circ
            const el = (
              <circle
                key={seg.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={thickness}
                strokeDasharray={`${len} ${circ - len}`}
                strokeDashoffset={-acc}
                strokeLinecap="butt"
              />
            )
            acc += len
            return el
          })}
        </g>
        {(centerValue || centerLabel) && (
          <text x="50%" y="50%" className={s.donutCenter} textAnchor="middle" dominantBaseline="middle">
            {centerValue && (
              <tspan x="50%" dy="-0.1em" className={s.donutCenterValue}>
                {centerValue}
              </tspan>
            )}
            {centerLabel && (
              <tspan x="50%" dy="1.3em" className={s.donutCenterLabel}>
                {centerLabel}
              </tspan>
            )}
          </text>
        )}
      </svg>
    </div>
  )
}
