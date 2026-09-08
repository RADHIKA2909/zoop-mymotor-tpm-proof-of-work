import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import s from './DataTable.module.css'

export interface Column<Row> {
  key: string
  header: ReactNode
  /** Cell renderer. Defaults to (row as any)[key]. */
  render?: (row: Row) => ReactNode
  align?: 'left' | 'right' | 'center'
  /** CSS width value, e.g. "120px" or "20%". */
  width?: string
  /** Hide below the tablet breakpoint. */
  hideOnMobile?: boolean
}

interface DataTableProps<Row> {
  columns: Column<Row>[]
  rows: Row[]
  getRowId: (row: Row, index: number) => string
  onRowClick?: (row: Row) => void
  /** Row currently selected (highlighted). */
  activeRowId?: string
  emptyMessage?: ReactNode
  /** Compact density for dashboards. */
  density?: 'comfortable' | 'compact'
  className?: string
  caption?: ReactNode
}

/** Generic, accessible table. Rows can be clickable (drawer / detail views). */
export function DataTable<Row>({
  columns,
  rows,
  getRowId,
  onRowClick,
  activeRowId,
  emptyMessage = 'No rows to show.',
  density = 'comfortable',
  className,
  caption,
}: DataTableProps<Row>) {
  return (
    <div className={cn(s.scroll, className)}>
      <table className={cn(s.table, s[density])}>
        {caption && <caption className={s.caption}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width, textAlign: col.align ?? 'left' }}
                className={cn(col.hideOnMobile && s.hideOnMobile)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className={s.empty} colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => {
              const id = getRowId(row, i)
              const clickable = Boolean(onRowClick)
              return (
                <tr
                  key={id}
                  className={cn(
                    clickable && s.clickable,
                    activeRowId === id && s.active,
                  )}
                  onClick={clickable ? () => onRowClick?.(row) : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  onKeyDown={
                    clickable
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onRowClick?.(row)
                          }
                        }
                      : undefined
                  }
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{ textAlign: col.align ?? 'left' }}
                      className={cn(col.hideOnMobile && s.hideOnMobile)}
                    >
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
