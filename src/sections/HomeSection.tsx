import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Button } from '@/components/ui/Button'
import { CheckList } from '@/components/ui/CheckList'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { CLAIM_META, CLAIM_ORDER } from '@/data/claims'
import { NARRATIVE_FLOW, SECTIONS } from '@/data/sections'
import { CASE_STUDY, DISCLAIMER, SOURCES } from '@/data/company'
import s from './HomeSection.module.css'

const STATUS_LABEL: Record<string, string> = {
  planned: 'Planned',
  'in-progress': 'In progress',
  done: 'Built',
}
const STATUS_TONE = {
  planned: 'pending',
  'in-progress': 'info',
  done: 'success',
} as const

export function HomeSection() {
  return (
    <div className={s.page}>
      {/* ---------- Hero ---------- */}
      <section className={s.hero}>
        <Container size="wide">
          <div className={s.heroGrid}>
            <div className={s.heroMain}>
              <Eyebrow>{CASE_STUDY.org}</Eyebrow>
              <h1 className={s.title}>
                Technical Product Management
                <span className={s.titleAccent}> Proof of Work</span>
              </h1>
              <p className={s.thesis}>{CASE_STUDY.thesis}</p>
              <p className={s.intro}>
                A worked case study on the consumer side of ZOOP Energy —{' '}
                <strong>MyMotor</strong>. It starts from real public app reviews,
                works out where the everyday journey breaks down, and proposes an
                operational and technical answer: reliable transactions and a
                control tower to run them. Built only from public product
                information and the role description.
              </p>

              <div className={s.heroActions}>
                <Button to={SECTIONS[0].path} iconRight="arrow-right" size="lg">
                  Start the walkthrough
                </Button>
                <Button to="/styleguide" variant="secondary" size="lg">
                  Design system
                </Button>
              </div>

              <div className={s.heroMeta}>
                <Pill tone="brand" variant="outline" caps size="sm">
                  Public product research · {CASE_STUDY.researchDate}
                </Pill>
                <Pill tone="neutral" variant="outline" caps size="sm">
                  Independent · unofficial
                </Pill>
              </div>
            </div>

            <aside className={s.heroSide}>
              <span className={s.script}>Researched,</span>
              <span className={s.scriptLine2}>not assumed.</span>
              <div className={s.heroSideCard}>
                <p className={s.heroSideTitle}>The through-line</p>
                <ol className={s.flowList}>
                  {NARRATIVE_FLOW.map((step, i) => (
                    <li key={step} className={s.flowItem}>
                      <span className={s.flowNum}>{String(i + 1).padStart(2, '0')}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ---------- How to read this ---------- */}
      <section className={s.band}>
        <Container size="wide">
          <ScrollReveal>
            <Eyebrow>How to read this</Eyebrow>
            <h2 className={s.bandTitle}>Every claim is labelled.</h2>
            <p className={s.bandLede}>
              This case study is careful about what it actually knows. Four labels
              run through every section so nothing proposed is ever mistaken for
              an internal ZOOP fact.
            </p>
          </ScrollReveal>

          <div className={s.claimGrid}>
            {CLAIM_ORDER.map((kind, i) => (
              <ScrollReveal key={kind} delay={i * 60}>
                <div className={s.claimCard} data-kind={kind}>
                  <span className={s.claimTag}>{CLAIM_META[kind].label}</span>
                  <p className={s.claimBlurb}>{CLAIM_META[kind].blurb}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Case study map ---------- */}
      <section className={s.map}>
        <Container size="wide">
          <ScrollReveal>
            <Eyebrow>The case study</Eyebrow>
            <h2 className={s.bandTitle}>Six sections, one argument.</h2>
            <p className={s.bandLede}>
              The reference layout uses a six-part walkthrough. The brief's deeper
              artefacts — PRD, RCA, KPI framework, vendor scorecards — live inside
              these sections rather than as separate pages.
            </p>
          </ScrollReveal>

          <div className={s.sectionCards}>
            {SECTIONS.map((section, i) => (
              <ScrollReveal key={section.id} delay={i * 50}>
                <Link to={section.path} className={s.sectionCard}>
                  <div className={s.sectionCardTop}>
                    <span className={s.sectionNum}>{section.num}</span>
                    <Pill tone={STATUS_TONE[section.status]} dot size="sm">
                      {STATUS_LABEL[section.status]}
                    </Pill>
                  </div>
                  <h3 className={s.sectionCardTitle}>{section.navLabel}</h3>
                  <p className={s.sectionCardText}>{section.tagline}</p>
                  <div className={s.sectionCardFoot}>
                    <span>{section.planned.length} planned blocks</span>
                    <Icon name="arrow-right" size={16} />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Scope ---------- */}
      <section className={s.band}>
        <Container size="wide">
          <div className={s.scopeGrid}>
            <ScrollReveal className={s.scopeCol}>
              <Eyebrow>What this is</Eyebrow>
              <h3 className={s.scopeTitle}>A TPM thinking out loud, end to end.</h3>
              <CheckList
                items={[
                  'Public user evidence read and themed before any solution is chosen',
                  'One problem prioritized with an explicit scoring rationale',
                  'A proposed solution taken down to PRD, workflows and acceptance criteria',
                  'An operations control tower with vendor, SLA and incident thinking',
                  'A metrics framework and a rollout / UAT / monitoring plan',
                ]}
              />
            </ScrollReveal>
            <ScrollReveal className={s.scopeCol} delay={80}>
              <Eyebrow tone="muted">What it deliberately avoids</Eyebrow>
              <h3 className={s.scopeTitle}>Guessing at things it cannot know.</h3>
              <CheckList
                marker="dash"
                tone="muted"
                items={[
                  'No invented review counts, ratings or research statistics',
                  "No claims about ZOOP's real architecture, vendors or SLAs",
                  'No fake precision — targets are stated as targets',
                  'Proposed diagrams are always labelled "not internal architecture"',
                ]}
              />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* ---------- Sources ---------- */}
      <section className={s.sources}>
        <Container size="wide">
          <ScrollReveal>
            <Eyebrow>Built from</Eyebrow>
            <h2 className={s.bandTitle}>Public sources only.</h2>
          </ScrollReveal>
          <ul className={s.sourceList}>
            {SOURCES.map((source) => (
              <li key={source.id}>
                <a href={source.url} target="_blank" rel="noreferrer noopener" className={s.sourceLink}>
                  <Icon name="external" size={15} />
                  <span>{source.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={s.sourceNote}>{DISCLAIMER}</p>
        </Container>
      </section>

      {/* ---------- CTA ---------- */}
      <section className={s.cta}>
        <Container size="wide">
          <div className={s.ctaInner}>
            <div>
              <p className={s.ctaKicker}>Start here</p>
              <p className={s.ctaTitle}>
                Customer journey <span aria-hidden="true">→</span> transaction
                reliability <span aria-hidden="true">→</span> control tower
              </p>
            </div>
            <Button to={SECTIONS[0].path} size="lg" iconRight="arrow-right">
              Section 01 · Context
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}
