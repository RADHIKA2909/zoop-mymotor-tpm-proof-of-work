import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { CLAIM_META, type ClaimKind } from '@/data/claims'
import s from './Callout.module.css'

interface CalloutProps {
  /**
   * The claim type. Drives colour + default label so the honesty system is
   * visible everywhere in the case study.
   */
  kind: ClaimKind | 'note'
  /** Overrides the default label ("Observed", "Proposed", …). */
  label?: string
  title?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * A labelled aside. Use it to attribute claims:
 *   <Callout kind="assumption">We assume a payment gateway sits between …</Callout>
 */
export function Callout({ kind, label, title, children, className }: CalloutProps) {
  const resolvedLabel =
    label ?? (kind === 'note' ? 'Note' : CLAIM_META[kind].label)

  return (
    <aside className={cn(s.callout, s[kind], className)}>
      <span className={s.tag}>{resolvedLabel}</span>
      <div className={s.body}>
        {title && <p className={s.title}>{title}</p>}
        <div className={s.content}>{children}</div>
      </div>
    </aside>
  )
}
