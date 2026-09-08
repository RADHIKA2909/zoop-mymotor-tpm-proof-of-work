import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { IconChip } from './IconChip'
import type { IconName } from './Icon'
import s from './FeatureCard.module.css'

interface FeatureCardProps {
  icon: IconName
  title: ReactNode
  children: ReactNode
  /** Optional small print under the body (e.g. "All in one place"). */
  footnote?: ReactNode
  layout?: 'stack' | 'row'
  className?: string
}

/** Icon-chip + title + description card from the "Everything an EV owner needs" grid. */
export function FeatureCard({
  icon,
  title,
  children,
  footnote,
  layout = 'stack',
  className,
}: FeatureCardProps) {
  return (
    <div className={cn(s.card, s[layout], className)}>
      <IconChip icon={icon} />
      <div className={s.body}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.desc}>{children}</p>
        {footnote && <p className={s.footnote}>{footnote}</p>}
      </div>
    </div>
  )
}
