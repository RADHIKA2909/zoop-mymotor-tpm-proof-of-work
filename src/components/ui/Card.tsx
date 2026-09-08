import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import s from './Card.module.css'

interface CardProps {
  children: ReactNode
  /** Visual weight. */
  variant?: 'default' | 'muted' | 'brand' | 'outline'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Adds hover lift + pointer affordance (use when the whole card is a link/button). */
  interactive?: boolean
  as?: ElementType
  className?: string
}

/** The rounded, softly bordered surface used throughout the reference layout. */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  as: Tag = 'div',
  className,
}: CardProps) {
  return (
    <Tag
      className={cn(
        s.card,
        s[variant],
        s[`pad-${padding}`],
        interactive && s.interactive,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
