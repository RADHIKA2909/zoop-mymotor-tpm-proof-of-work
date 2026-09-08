import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import { Portal, useEscapeKey, useScrollLock } from './Portal'
import s from './Modal.module.css'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  footer?: ReactNode
  children: ReactNode
}

/** Centered dialog for focused tasks (confirm a retry, view an RCA template). */
export function Modal({ open, onClose, title, size = 'md', footer, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollLock(open)
  useEscapeKey(open, onClose)

  useEffect(() => {
    if (open) ref.current?.focus()
  }, [open])

  return (
    <Portal>
      <div className={cn(s.root, open && s.open)} aria-hidden={!open}>
        <div className={s.backdrop} onClick={onClose} />
        <div
          ref={ref}
          className={cn(s.dialog, s[size])}
          role="dialog"
          aria-modal="true"
          aria-label={typeof title === 'string' ? title : 'Dialog'}
          tabIndex={-1}
        >
          {title && (
            <header className={s.header}>
              <h2 className={s.title}>{title}</h2>
              <button className={s.close} onClick={onClose} aria-label="Close dialog">
                <Icon name="close" size={18} />
              </button>
            </header>
          )}
          <div className={s.body}>{children}</div>
          {footer && <footer className={s.footer}>{footer}</footer>}
        </div>
      </div>
    </Portal>
  )
}
