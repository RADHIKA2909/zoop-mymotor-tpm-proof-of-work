import { useState } from 'react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { CheckList } from '@/components/ui/CheckList'
import { IconChip } from '@/components/ui/IconChip'
import { FREIGHT_NOTE, type PathCardData } from './_data'
import s from './PathCard.module.css'

interface PathCardProps {
  data: PathCardData
}

export function PathCard({ data }: PathCardProps) {
  const [noteOpen, setNoteOpen] = useState(false)

  const handleCta = () => {
    if (data.cta.scrollTo) {
      document
        .getElementById(data.cta.scrollTo)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className={cn(s.card, data.highlighted && s.highlighted)}>
      <div className={s.head}>
        <IconChip icon={data.icon} tone={data.highlighted ? 'brand' : 'neutral'} />
        <span className={s.eyebrow}>{data.eyebrow}</span>
      </div>

      <h3 className={s.title}>{data.title}</h3>
      <p className={s.body}>{data.body}</p>

      <CheckList
        className={s.points}
        tone={data.highlighted ? 'brand' : 'muted'}
        items={data.points}
      />

      <div className={s.footer}>
        {data.cta.kind === 'primary' ? (
          <Button iconRight="arrow-right" onClick={handleCta}>
            {data.cta.label}
          </Button>
        ) : (
          <Button variant="link" iconRight="arrow-right" href={data.cta.href}>
            {data.cta.label}
          </Button>
        )}

        {data.id === 'freight' && (
          <button
            type="button"
            className={s.noteToggle}
            aria-expanded={noteOpen}
            onClick={() => setNoteOpen((v) => !v)}
          >
            Why consumer-only?
          </button>
        )}
      </div>

      {data.id === 'freight' && noteOpen && (
        <p className={s.note}>{FREIGHT_NOTE}</p>
      )}
    </div>
  )
}
