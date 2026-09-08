import { cn } from '@/lib/cn'
import type { SectionDef } from '@/data/sections'
import { Icon } from './Icon'
import { Pill } from './Pill'
import s from './Placeholder.module.css'

interface PlaceholderProps {
  section: SectionDef
  className?: string
}

const STATUS_COPY: Record<SectionDef['status'], { label: string; tone: 'pending' | 'info' | 'success' }> = {
  planned: { label: 'Planned — not built yet', tone: 'pending' },
  'in-progress': { label: 'In progress', tone: 'info' },
  done: { label: 'Built', tone: 'success' },
}

/**
 * Shown on a section route until that section is built from its own detailed
 * prompt. Lists the *planned* contents only — never invented findings, stats or
 * architecture.
 */
export function Placeholder({ section, className }: PlaceholderProps) {
  const status = STATUS_COPY[section.status]

  return (
    <div className={cn(s.wrap, className)}>
      <div className={s.head}>
        <Pill tone={status.tone} dot caps size="sm">
          {status.label}
        </Pill>
        <p className={s.lede}>
          This section will be built from its own detailed brief (with a visual
          reference). Below is what it will contain — no content, findings or
          numbers have been written yet.
        </p>
      </div>

      <div className={s.grid}>
        <section className={s.panel}>
          <h3 className={s.panelTitle}>Planned contents</h3>
          <ul className={s.list}>
            {section.planned.map((item, i) => (
              <li key={i} className={s.item}>
                <span className={s.marker} aria-hidden="true">
                  <Icon name="chevron-right" size={13} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className={s.meta}>
          <div className={s.metaRow}>
            <span className={s.metaKey}>Phase</span>
            <span className={s.metaVal}>{section.phase}</span>
          </div>
          <div className={s.metaRow}>
            <span className={s.metaKey}>Absorbs</span>
            <span className={s.metaVal}>
              <ul className={s.absorbList}>
                {section.absorbs.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </span>
          </div>
          <p className={s.metaNote}>
            The 6-section navigation follows the reference design. Brief areas
            like PRD, RCA, metrics and vendor management live inside these
            sections rather than as separate pages.
          </p>
        </aside>
      </div>
    </div>
  )
}
