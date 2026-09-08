import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/Icon'
import type { RiskTone } from './_data'
import s from './RiskChip.module.css'

/** Small "potential breakpoint" chip — icon + label, amber or red. */
export function RiskChip({ tone, children }: { tone: RiskTone; children: string }) {
  return (
    <span className={cn(s.chip, s[tone])}>
      <Icon name="alert" size={12} />
      {children}
    </span>
  )
}
