/**
 * Small formatting helpers for the case-study data (metrics, KPI cards, tables).
 * Nothing here implies real ZOOP numbers — callers pass illustrative values.
 */

export function formatNumber(value: number, opts?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-IN', opts).format(value)
}

/** 1234567 -> "12.3L", 4500 -> "4.5K" (Indian-style short scale). */
export function formatCompactIN(value: number): string {
  if (Math.abs(value) >= 1_00_00_000) return `${trimZero(value / 1_00_00_000)}Cr`
  if (Math.abs(value) >= 1_00_000) return `${trimZero(value / 1_00_000)}L`
  if (Math.abs(value) >= 1_000) return `${trimZero(value / 1_000)}K`
  return String(value)
}

export function formatPercent(fraction: number, digits = 1): string {
  return `${(fraction * 100).toFixed(digits)}%`
}

/** Seconds -> "2m 30s" / "45s" / "1h 05m". */
export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`
  if (m > 0) return `${m}m ${String(sec).padStart(2, '0')}s`
  return `${sec}s`
}

/** Relative age from an ISO date or ms timestamp — "3d ago", "5m ago". */
export function formatRelative(input: string | number | Date, now: Date = new Date()): string {
  const then = input instanceof Date ? input : new Date(input)
  const diff = now.getTime() - then.getTime()
  const abs = Math.abs(diff)
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31_536_000_000],
    ['month', 2_592_000_000],
    ['day', 86_400_000],
    ['hour', 3_600_000],
    ['minute', 60_000],
    ['second', 1000],
  ]
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  for (const [unit, ms] of units) {
    if (abs >= ms || unit === 'second') {
      return rtf.format(Math.round(-diff / ms), unit)
    }
  }
  return 'just now'
}

function trimZero(n: number): string {
  return n.toFixed(1).replace(/\.0$/, '')
}
