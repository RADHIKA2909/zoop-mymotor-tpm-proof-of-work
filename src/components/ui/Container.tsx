import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import s from './Container.module.css'

interface ContainerProps {
  children: ReactNode
  size?: 'default' | 'wide' | 'prose'
  className?: string
  as?: ElementType
}

/** Centered max-width wrapper with the standard page gutter. */
export function Container({
  children,
  size = 'default',
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return <Tag className={cn(s.container, s[size], className)}>{children}</Tag>
}
