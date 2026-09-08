import { cn } from '@/lib/cn'
import { Icon, type IconName } from './Icon'
import s from './IconChip.module.css'

interface IconChipProps {
  icon: IconName
  size?: 'sm' | 'md' | 'lg'
  tone?: 'brand' | 'neutral' | 'deep'
  className?: string
}

/** Rounded tinted square holding a single glyph — the reference's feature-card marker. */
export function IconChip({ icon, size = 'md', tone = 'brand', className }: IconChipProps) {
  const glyph = size === 'lg' ? 24 : size === 'sm' ? 16 : 20
  return (
    <span className={cn(s.chip, s[size], s[tone], className)} aria-hidden="true">
      <Icon name={icon} size={glyph} />
    </span>
  )
}
