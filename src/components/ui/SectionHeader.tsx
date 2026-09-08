import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './Eyebrow'
import s from './SectionHeader.module.css'

interface SectionHeaderProps {
  eyebrow?: ReactNode
  /** Optional leading number for the eyebrow, e.g. "01". */
  eyebrowNumber?: string
  title: ReactNode
  /** Supporting paragraph. In 'split' align it sits to the right of the title. */
  lead?: ReactNode
  align?: 'stacked' | 'split' | 'center'
  tone?: 'default' | 'inverse'
  /** Right-aligned actions (buttons / links). */
  actions?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/** Standard section-opening header: eyebrow + headline + supporting copy. */
export function SectionHeader({
  eyebrow,
  eyebrowNumber,
  title,
  lead,
  align = 'stacked',
  tone = 'default',
  actions,
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(s.header, s[align], s[tone], className)}>
      <div className={s.headingCol}>
        {eyebrow && (
          <Eyebrow number={eyebrowNumber} tone={tone === 'inverse' ? 'inverse' : 'brand'}>
            {eyebrow}
          </Eyebrow>
        )}
        <Heading className={s.title}>{title}</Heading>
        {actions && <div className={s.actions}>{actions}</div>}
      </div>
      {lead && <div className={s.leadCol}>{lead}</div>}
    </header>
  )
}
