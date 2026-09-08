import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import s from './Eyebrow.module.css'

interface EyebrowProps {
  children: ReactNode
  /** Optional leading number, e.g. "01". */
  number?: string
  tone?: 'brand' | 'muted' | 'inverse'
  className?: string
}

/** The tracked green overline used above every section headline in the reference. */
export function Eyebrow({ children, number, tone = 'brand', className }: EyebrowProps) {
  return (
    <p className={cn(s.eyebrow, s[tone], className)}>
      {number && <span className={s.number}>{number}</span>}
      {number && <span className={s.sep} aria-hidden="true">—</span>}
      <span>{children}</span>
    </p>
  )
}
