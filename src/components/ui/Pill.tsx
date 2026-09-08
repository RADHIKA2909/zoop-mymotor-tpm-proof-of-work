import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { ClaimKind } from '@/data/claims'
import s from './Pill.module.css'

export type PillTone =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'pending'
  | ClaimKind

interface PillProps {
  children: ReactNode
  tone?: PillTone
  /** Solid fill vs. tinted surface (default) vs. outline. */
  variant?: 'soft' | 'solid' | 'outline'
  size?: 'sm' | 'md'
  /** Leading status dot. */
  dot?: boolean
  /** Uppercase + tracked (the reference's tag treatment). */
  caps?: boolean
  className?: string
}

/** Rounded tag / badge. Used for status, claim labels and section overlines. */
export function Pill({
  children,
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  dot = false,
  caps = false,
  className,
}: PillProps) {
  return (
    <span
      className={cn(
        s.pill,
        s[`tone-${tone}`],
        s[`variant-${variant}`],
        s[`size-${size}`],
        caps && s.caps,
        className,
      )}
    >
      {dot && <span className={s.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}
