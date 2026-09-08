import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Pill } from './Pill'
import s from './DiagramFrame.module.css'

interface LegendItem {
  label: string
  color?: string
  dashed?: boolean
}

interface DiagramFrameProps {
  title?: ReactNode
  /** Short caption under the figure. */
  caption?: ReactNode
  legend?: LegendItem[]
  /** The reference's "CONCEPTUAL ECOSYSTEM — NOT INTERNAL ARCHITECTURE" tag. */
  disclaimer?: string
  tone?: 'default' | 'dark'
  children: ReactNode
  className?: string
}

/**
 * Wrapper for architecture / flow / journey diagrams. Provides the framing,
 * caption, legend and the mandatory "not internal architecture" disclaimer so
 * proposed diagrams are never mistaken for ZOOP facts.
 */
export function DiagramFrame({
  title,
  caption,
  legend,
  disclaimer,
  tone = 'default',
  children,
  className,
}: DiagramFrameProps) {
  return (
    <figure
      className={cn(s.frame, tone === 'dark' && s.dark, className)}
      data-theme={tone === 'dark' ? 'dark' : undefined}
    >
      {(title || disclaimer) && (
        <div className={s.head}>
          {title && <figcaption className={s.title}>{title}</figcaption>}
          {disclaimer && (
            <Pill tone="assumption" variant="outline" size="sm" caps>
              {disclaimer}
            </Pill>
          )}
        </div>
      )}

      <div className={s.canvas}>{children}</div>

      {(legend?.length || caption) && (
        <figcaption className={s.foot}>
          {legend?.length ? (
            <ul className={s.legend}>
              {legend.map((item) => (
                <li key={item.label} className={s.legendItem}>
                  <span
                    className={cn(s.swatch, item.dashed && s.swatchDashed)}
                    style={{ background: item.dashed ? undefined : item.color ?? 'var(--brand-green)', borderColor: item.color ?? 'var(--brand-green)' }}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          ) : null}
          {caption && <p className={s.caption}>{caption}</p>}
        </figcaption>
      )}
    </figure>
  )
}
