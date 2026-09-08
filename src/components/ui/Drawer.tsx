import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import { Portal, useEscapeKey, useScrollLock } from './Portal'
import s from './Drawer.module.css'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  /** Optional sub-line under the title (e.g. a transaction id). */
  eyebrow?: ReactNode
  side?: 'right' | 'left'
  width?: number
  /** Sticky footer actions. */
  footer?: ReactNode
  children: ReactNode
}

/**
 * Slide-in panel for detail views (transaction detail, incident detail).
 * Kept mounted during the close transition via CSS; closes on Esc / backdrop.
 */
export function Drawer({
  open,
  onClose,
  title,
  eyebrow,
  side = 'right',
  width = 460,
  footer,
  children,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useScrollLock(open)
  useEscapeKey(open, onClose)

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  return (
    <Portal>
      <div className={cn(s.root, open && s.open)} aria-hidden={!open}>
        <div className={s.backdrop} onClick={onClose} />
        <div
          ref={panelRef}
          className={cn(s.panel, s[side])}
          style={{ width: `min(${width}px, 100vw)` }}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === 'string' ? title : 'Detail panel'}
          tabIndex={-1}
        >
          <header className={s.header}>
            <div className={s.headingText}>
              {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
              {title && <h2 className={s.title}>{title}</h2>}
            </div>
            <button className={s.close} onClick={onClose} aria-label="Close panel">
              <Icon name="close" size={18} />
            </button>
          </header>
          <div className={s.body}>{children}</div>
          {footer && <footer className={s.footer}>{footer}</footer>}
        </div>
      </div>
    </Portal>
  )
}
