import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import s from './FilterBar.module.css'

interface FilterBarProps {
  children: ReactNode
  /** Right-aligned slot (result count, reset button). */
  trailing?: ReactNode
  className?: string
}

/** Horizontal container for the Control Tower / table filters. */
export function FilterBar({ children, trailing, className }: FilterBarProps) {
  return (
    <div className={cn(s.bar, className)}>
      <div className={s.controls}>{children}</div>
      {trailing && <div className={s.trailing}>{trailing}</div>}
    </div>
  )
}

interface FilterSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}

/** Labelled native select styled to match the design system. */
export function FilterSelect({
  label,
  value,
  onChange,
  options,
  className,
}: FilterSelectProps) {
  return (
    <label className={cn(s.field, className)}>
      <span className={s.fieldLabel}>{label}</span>
      <span className={s.selectWrap}>
        <select
          className={s.select}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={14} className={s.selectIcon} />
      </span>
    </label>
  )
}

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className,
}: SearchInputProps) {
  return (
    <span className={cn(s.searchWrap, className)}>
      <Icon name="activity" size={15} className={s.searchIcon} />
      <input
        type="search"
        className={s.search}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </span>
  )
}
