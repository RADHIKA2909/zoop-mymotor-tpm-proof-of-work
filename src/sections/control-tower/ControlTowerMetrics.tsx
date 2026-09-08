import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { CheckList } from '@/components/ui/CheckList'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { METRIC_CATEGORIES, NORTH_STAR } from './_data'
import s from './ControlTowerMetrics.module.css'

export function ControlTowerMetrics() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Control tower metrics</Eyebrow>
        <h2 className={s.title}>How would we know the system is working?</h2>
        <p className={s.lead}>
          Proposed KPIs across the operating loop. No current values are claimed — these
          are what the Control Tower should measure.
        </p>

        <ScrollReveal className={s.grid}>
          {METRIC_CATEGORIES.map((cat) => (
            <div className={s.cat} key={cat.title}>
              <span className={s.catTitle}>{cat.title}</span>
              <ul className={s.metrics}>
                {cat.metrics.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollReveal>

        <div className={s.northStar}>
          <div className={s.nsHead}>
            <span className={s.nsKicker}>Primary outcome</span>
            <Pill tone="proposed" caps size="sm">{NORTH_STAR.label}</Pill>
          </div>
          <p className={s.nsPrimary}>{NORTH_STAR.primary}</p>
          <p className={s.nsExplain}>{NORTH_STAR.explain}</p>
          <div className={s.nsCandidate}>
            <span className={s.nsCandidateKey}>Candidate north star</span>
            <span className={s.nsCandidateVal}>{NORTH_STAR.candidate}</span>
          </div>
          <p className={s.nsSupportingKey}>Supporting metrics</p>
          <CheckList marker="dot" columns={2} items={[...NORTH_STAR.supporting]} />
        </div>
      </Container>
    </section>
  )
}
