import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import s from './DisclosureRow.module.css'

interface DisclosureRowProps {
  summary: ReactNode
  /** Right-aligned meta shown in the header (a Pill, a count). */
  meta?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
  className?: string
}

/** Expandable row for FAQs, requirement details, exception cases. */
export function DisclosureRow({
  summary,
  meta,
  defaultOpen = false,
  children,
  className,
}: DisclosureRowProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className={cn(s.row, open && s.open, className)}>
      <button
        className={s.trigger}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="chevron-right" size={16} className={s.chevron} />
        <span className={s.summary}>{summary}</span>
        {meta && <span className={s.meta}>{meta}</span>}
      </button>
      {open && (
        <div className={s.content} id={id}>
          {children}
        </div>
      )}
    </div>
  )
}
