import type { CSSProperties, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useInView } from '@/hooks/useInView'
import s from './ScrollReveal.module.css'

interface ScrollRevealProps {
  children: ReactNode
  /** Stagger delay in ms when several reveals sit together. */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Fades + lifts content into view on scroll. Motion-library-free; respects
 * prefers-reduced-motion via global.css.
 */
export function ScrollReveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: ScrollRevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag
      ref={ref as never}
      className={cn(s.reveal, inView && s.visible, className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
