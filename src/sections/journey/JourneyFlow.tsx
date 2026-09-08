import { useState } from 'react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FLOW_HEADER, STAGES } from './_data'
import { JourneyStage } from './JourneyStage'
import s from './JourneyFlow.module.css'

type Mode = 'happy' | 'breakpoints'

const MODES: { id: Mode; label: string }[] = [
  { id: 'happy', label: 'Happy path' },
  { id: 'breakpoints', label: 'Breakpoints' },
]

function ModeToggle({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className={s.toggle} role="tablist" aria-label="Journey view">
      {MODES.map((m) => (
        <button
          key={m.id}
          role="tab"
          aria-selected={mode === m.id}
          className={cn(s.toggleBtn, mode === m.id && s.toggleBtnActive)}
          onClick={() => onChange(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}

export function JourneyFlow() {
  const [mode, setMode] = useState<Mode>('happy')

  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.header}>
          <div>
            <Eyebrow>{FLOW_HEADER.eyebrow}</Eyebrow>
            <h2 className={s.title}>
              {FLOW_HEADER.title}{' '}
              <span className={s.titleMuted}>{FLOW_HEADER.lead}</span>
            </h2>
          </div>
          <ModeToggle mode={mode} onChange={setMode} />
        </div>

        {mode === 'breakpoints' && (
          <p className={s.banner}>
            <Icon name="alert" size={15} />
            {FLOW_HEADER.breakpointBanner}
          </p>
        )}

        <ScrollReveal>
          <div className={cn(s.track, mode === 'breakpoints' && s.trackBreak)}>
            {STAGES.map((stage, i) => (
              <div className={s.cell} key={stage.num}>
                <JourneyStage stage={stage} mode={mode} />
                {i < STAGES.length - 1 && (
                  <span className={s.connector} aria-hidden="true">
                    <Icon name="arrow-right" size={16} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
