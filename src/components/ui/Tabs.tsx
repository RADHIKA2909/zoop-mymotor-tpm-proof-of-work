import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import s from './Tabs.module.css'

export interface TabItem {
  id: string
  label: ReactNode
  content: ReactNode
}

interface TabsProps {
  items: TabItem[]
  defaultTabId?: string
  /** Controlled active tab. */
  activeId?: string
  onChange?: (id: string) => void
  variant?: 'underline' | 'pill'
  className?: string
}

/** Accessible tab set (roving state, arrow-key navigation). */
export function Tabs({
  items,
  defaultTabId,
  activeId,
  onChange,
  variant = 'underline',
  className,
}: TabsProps) {
  const baseId = useId()
  const [internal, setInternal] = useState(defaultTabId ?? items[0]?.id)
  const current = activeId ?? internal

  const select = (id: string) => {
    if (!activeId) setInternal(id)
    onChange?.(id)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = items.findIndex((t) => t.id === current)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      select(items[(idx + 1) % items.length].id)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      select(items[(idx - 1 + items.length) % items.length].id)
    }
  }

  const active = items.find((t) => t.id === current)

  return (
    <div className={cn(s.tabs, className)}>
      <div
        role="tablist"
        className={cn(s.list, s[variant])}
        onKeyDown={onKeyDown}
      >
        {items.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={tab.id === current}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={tab.id === current ? 0 : -1}
            className={cn(s.tab, tab.id === current && s.tabActive)}
            onClick={() => select(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {active && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${active.id}`}
          aria-labelledby={`${baseId}-tab-${active.id}`}
          className={s.panel}
        >
          {active.content}
        </div>
      )}
    </div>
  )
}
