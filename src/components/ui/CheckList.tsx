import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import s from './CheckList.module.css'

interface CheckListProps {
  items: ReactNode[]
  /** 'check' (default), 'dot', or 'dash'. */
  marker?: 'check' | 'dot' | 'dash'
  tone?: 'brand' | 'muted'
  columns?: 1 | 2
  className?: string
}

/** Green-check bullet list from the reference's comparison cards. */
export function CheckList({
  items,
  marker = 'check',
  tone = 'brand',
  columns = 1,
  className,
}: CheckListProps) {
  return (
    <ul
      className={cn(s.list, s[tone], columns === 2 && s.twoCol, className)}
      data-marker={marker}
    >
      {items.map((item, i) => (
        <li key={i} className={s.item}>
          <span className={s.marker} aria-hidden="true">
            {marker === 'check' ? <Icon name="check" size={12} /> : null}
          </span>
          <span className={s.text}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
