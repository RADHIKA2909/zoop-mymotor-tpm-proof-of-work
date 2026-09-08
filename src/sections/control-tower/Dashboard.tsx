import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Callout } from '@/components/ui/Callout'
import { KpiCard } from '@/components/ui/KpiCard'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { LineChart, Donut, HBars, Sparkline } from '@/components/charts/Charts'
import {
  CATEGORY_FILTERS,
  ILLUSTRATIVE,
  ISSUES_BY_CATEGORY,
  ISSUES_BY_REGION,
  KPIS,
  TIME_WINDOWS,
  TREND,
  type Category,
  type TimeWindow,
} from './_data'
import s from './Dashboard.module.css'

interface DashboardProps {
  category: Category
  onCategory: (c: Category) => void
  window: TimeWindow
  onWindow: (w: TimeWindow) => void
}

export function Dashboard({ category, onCategory, window, onWindow }: DashboardProps) {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Real-time issue monitoring</Eyebrow>
        <div className={s.head}>
          <div>
            <h2 className={s.title}>Reliability Control Tower</h2>
            <p className={s.sub}>Monitor. Resolve. Improve. — a live view of reliability across the ecosystem.</p>
          </div>
          <div className={s.windows} role="tablist" aria-label="Time window">
            {TIME_WINDOWS.map((w) => (
              <button
                key={w}
                role="tab"
                aria-selected={window === w}
                className={cn(s.windowBtn, window === w && s.windowBtnActive)}
                onClick={() => onWindow(w)}
              >
                {w.replace('Last ', '')}
              </button>
            ))}
          </div>
        </div>

        <div className={s.cats} role="tablist" aria-label="Category">
          {CATEGORY_FILTERS.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              className={cn(s.catBtn, category === c && s.catBtnActive)}
              onClick={() => onCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <Callout kind="assumption" className={s.banner}>
          {ILLUSTRATIVE} The figures below and the filters exist only to demonstrate the interface.
        </Callout>

        <ScrollReveal>
          <div className={s.kpis}>
            {KPIS.map((k) => (
              <KpiCard
                key={k.label}
                label={k.label}
                value={k.value}
                unit={k.unit}
                delta={k.delta}
                deltaDirection={k.deltaDirection}
                deltaGood={k.deltaGood}
                tone={k.tone}
                chart={<Sparkline data={k.series} height={28} />}
              />
            ))}
          </div>
        </ScrollReveal>

        <div className={s.grid}>
          <div className={s.trendCard}>
            <div className={s.cardHead}>
              <span className={s.cardTitle}>Reliability trend</span>
              <span className={s.legend}>
                <span className={s.legendItem}><i className={s.dotCur} /> Current</span>
                <span className={s.legendItem}><i className={s.dotPrev} /> Previous</span>
              </span>
            </div>
            <LineChart
              series={[
                { label: 'Current', data: [...TREND.current], color: 'var(--viz-1)' },
                { label: 'Previous', data: [...TREND.previous], color: 'var(--viz-2)', dashed: true },
              ]}
              min={95}
              max={98}
              height={150}
            />
            <div className={s.insight}>
              <Pill tone="warning" dot size="sm">Illustrative signal</Pill>
              <p>{TREND.insight}</p>
            </div>
          </div>

          <div className={s.donutCard}>
            <span className={s.cardTitle}>Issues by category</span>
            <div className={s.donutRow}>
              <Donut
                size={130}
                thickness={16}
                centerValue="401"
                centerLabel="exceptions"
                segments={ISSUES_BY_CATEGORY.map((c) => ({ label: c.label, value: c.value, color: c.color }))}
              />
              <ul className={s.donutLegend}>
                {ISSUES_BY_CATEGORY.map((c) => (
                  <li key={c.label}>
                    <i style={{ background: c.color }} />
                    {c.label}
                    <span>{c.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={s.regionCard}>
            <span className={s.cardTitle}>Issues by region</span>
            <HBars
              rows={ISSUES_BY_REGION.map((r) => ({ label: r.label, value: r.value, display: String(r.value) }))}
            />
            <p className={s.regionNote}>Illustrative — replaces a geographic heatmap in this build.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
