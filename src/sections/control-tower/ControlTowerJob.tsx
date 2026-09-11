import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { Pill } from '@/components/ui/Pill'
import { IconChip } from '@/components/ui/IconChip'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { JOB, PERSONAS } from './_data'
import s from './ControlTowerJob.module.css'

export function ControlTowerJob() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <SectionHeader
          eyebrow={JOB.eyebrow}
          title={JOB.title}
          lead={<p>{JOB.lead}</p>}
        />

        <div className={s.jobs}>
          {JOB.cards.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 50} className={s.cell}>
              <FeatureCard icon={c.icon} title={c.title}>
                {c.desc}
              </FeatureCard>
            </ScrollReveal>
          ))}
        </div>

        <div className={s.users}>
          <div className={s.usersHead}>
            <span className={s.usersTitle}>Who is the control tower for?</span>
            <Pill tone="proposed" caps size="sm">
              Proposed user model
            </Pill>
          </div>
          <div className={s.personaGrid}>
            {PERSONAS.map((p) => (
              <div className={s.persona} key={p.role}>
                <div className={s.personaHead}>
                  <IconChip icon={p.icon} size="sm" />
                  <span className={s.personaRole}>{p.role}</span>
                </div>
                <p className={s.personaSummary}>{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
