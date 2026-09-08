import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import {
  Button,
  Callout,
  Card,
  CheckList,
  DataTable,
  DiagramFrame,
  DisclosureRow,
  Drawer,
  FeatureCard,
  FilterBar,
  FilterSelect,
  Icon,
  IconChip,
  KpiCard,
  Modal,
  Pill,
  SearchInput,
  SectionHeader,
  Stat,
  StatGrid,
  StatusDot,
  Tabs,
  Timeline,
} from '@/components/ui'
import { NodeFlow } from '@/components/diagrams/NodeFlow'
import { PhoneFrame } from '@/components/diagrams/PhoneFrame'
import { Donut, GaugeArc, MiniBars, Sparkline } from '@/components/charts/Charts'
import { useTheme } from '@/hooks/useTheme'
import s from './StyleGuideSection.module.css'

function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={s.row}>
      <h2 className={s.rowTitle}>{title}</h2>
      <div className={s.rowBody}>{children}</div>
    </section>
  )
}

const TOKEN_SWATCHES = [
  ['--brand-green', 'Brand green'],
  ['--brand-green-deep', 'Deep green'],
  ['--brand-green-surface', 'Green surface'],
  ['--text-primary', 'Text primary'],
  ['--text-secondary', 'Text secondary'],
  ['--bg', 'Background'],
  ['--surface', 'Surface'],
  ['--border', 'Border'],
  ['--status-success', 'Success'],
  ['--status-warning', 'Warning'],
  ['--status-error', 'Error'],
  ['--status-info', 'Info'],
]

export function StyleGuideSection() {
  const { theme, toggleTheme } = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  return (
    <div className={s.page}>
      <Container size="wide">
        <header className={s.head}>
          <Eyebrow>Internal</Eyebrow>
          <h1 className={s.title}>Design system reference</h1>
          <p className={s.lede}>
            Every reusable primitive rendered once, so the visual language stays
            consistent as sections are built. Not part of the case-study
            navigation.
          </p>
          <Button variant="secondary" size="sm" onClick={toggleTheme} iconLeft={theme === 'dark' ? 'sun' : 'moon'}>
            Preview {theme === 'dark' ? 'light' : 'dark'} theme
          </Button>
        </header>

        <Row title="Colour tokens">
          <div className={s.swatches}>
            {TOKEN_SWATCHES.map(([token, label]) => (
              <div key={token} className={s.swatch}>
                <span className={s.swatchChip} style={{ background: `var(${token})` }} />
                <span className={s.swatchLabel}>
                  {label}
                  <code>{token}</code>
                </span>
              </div>
            ))}
          </div>
        </Row>

        <Row title="Typography">
          <div className={s.typeStack}>
            <p className={s.typeDisplay}>Display — Inter Bold, tight tracking</p>
            <h3 className={s.typeH3}>Section heading level</h3>
            <p className={s.typeBody}>
              Body copy is Inter Regular at 16–17px with a generous line height so
              longer explanations stay readable.
            </p>
            <p className={s.typeMono}>TXN-4F9A2C · mono for identifiers and figures</p>
            <p className={s.typeScript}>Caveat — the handwritten accent</p>
          </div>
        </Row>

        <Row title="Buttons">
          <div className={s.cluster}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link" iconRight="arrow-right">
              Link action
            </Button>
            <Button iconRight="arrow-right">With icon</Button>
            <Button disabled>Disabled</Button>
          </div>
        </Row>

        <Row title="Pills & status">
          <div className={s.cluster}>
            <Pill tone="brand" caps>Brand</Pill>
            <Pill tone="success" dot>Success</Pill>
            <Pill tone="warning" dot>Warning</Pill>
            <Pill tone="error" dot>Error</Pill>
            <Pill tone="pending" dot>Pending</Pill>
            <Pill tone="observed" caps>Observed</Pill>
            <Pill tone="inferred" caps>Inferred</Pill>
            <Pill tone="proposed" caps>Proposed</Pill>
            <Pill tone="assumption" caps>Assumption</Pill>
          </div>
          <div className={s.cluster}>
            <StatusDot tone="success" label="Vendor healthy" />
            <StatusDot tone="warning" label="Degraded" />
            <StatusDot tone="error" label="Down" pulse />
            <StatusDot tone="pending" label="Reconciling" />
          </div>
        </Row>

        <Row title="Icon chips">
          <div className={s.cluster}>
            <IconChip icon="bolt" />
            <IconChip icon="car" tone="neutral" />
            <IconChip icon="wallet" tone="deep" />
            <IconChip icon="map-pin" size="lg" />
            <IconChip icon="shield" size="sm" />
          </div>
        </Row>

        <Row title="Callouts (claim labels)">
          <div className={s.stack}>
            <Callout kind="observed">Users repeatedly mention payments that appear stuck.</Callout>
            <Callout kind="inferred">This points to weak status feedback after a transaction leaves the app.</Callout>
            <Callout kind="proposed">Introduce a transaction state machine with explicit customer-facing states.</Callout>
            <Callout kind="assumption">Assume a payment gateway sits between MyMotor and the underlying rails.</Callout>
          </div>
        </Row>

        <Row title="Cards & feature cards">
          <div className={s.grid3}>
            <Card>Default card</Card>
            <Card variant="muted">Muted card</Card>
            <Card variant="brand">Brand card</Card>
          </div>
          <div className={s.grid3}>
            <FeatureCard icon="car" title="Vehicle">
              RC, insurance, documents and garage — all vehicle information in one place.
            </FeatureCard>
            <FeatureCard icon="plug" title="Charging">
              Live availability and session tracking. Find, navigate and charge with confidence.
            </FeatureCard>
            <FeatureCard icon="wallet" title="Transactions">
              EV wallet and charging history. Secure, seamless payments.
            </FeatureCard>
          </div>
        </Row>

        <Row title="Check lists">
          <div className={s.grid2}>
            <CheckList
              items={['Find & navigate to chargers', 'Check RC, insurance & challan', 'EV wallet & charging payments']}
            />
            <CheckList
              marker="dash"
              tone="muted"
              items={['No invented statistics', 'No claims about internal architecture', 'No fake precision']}
            />
          </div>
        </Row>

        <Row title="KPI cards & stats">
          <StatGrid>
            <KpiCard
              label="Transaction success"
              value="—"
              unit="%"
              delta="target > 98%"
              tone="success"
              chart={<Sparkline data={[7, 6, 8, 7, 9, 8, 9]} />}
            />
            <KpiCard label="Pending" value="—" delta="illustrative" tone="warning" />
            <KpiCard label="SLA breaches" value="—" delta="illustrative" deltaDirection="down" deltaGood="down" tone="error" />
            <KpiCard label="Vendor health" value="—" tone="info" />
          </StatGrid>
          <div className={s.cluster} style={{ marginTop: 'var(--space-5)' }}>
            <Stat label="Sections" value="6" hint="in this walkthrough" />
            <Stat label="Claim labels" value="4" hint="observed / inferred / proposed / assumption" />
          </div>
        </Row>

        <Row title="Charts (hand-built SVG)">
          <div className={s.grid3}>
            <Card>
              <p className={s.miniLabel}>Sparkline</p>
              <Sparkline data={[3, 5, 4, 6, 5, 7, 6, 8]} width={220} height={56} />
            </Card>
            <Card>
              <p className={s.miniLabel}>Gauge</p>
              <GaugeArc value={0.82} label="SLA" sublabel="illustrative" />
            </Card>
            <Card>
              <p className={s.miniLabel}>Donut</p>
              <Donut
                segments={[
                  { label: 'Success', value: 82, color: 'var(--viz-1)' },
                  { label: 'Pending', value: 12, color: 'var(--viz-4)' },
                  { label: 'Failed', value: 6, color: 'var(--viz-3)' },
                ]}
                centerValue="82%"
                centerLabel="success"
              />
            </Card>
          </div>
          <Card>
            <p className={s.miniLabel}>Mini bars</p>
            <MiniBars
              data={[
                { label: 'Mon', value: 4 },
                { label: 'Tue', value: 7 },
                { label: 'Wed', value: 5 },
                { label: 'Thu', value: 9 },
                { label: 'Fri', value: 6 },
              ]}
            />
          </Card>
        </Row>

        <Row title="Tabs">
          <Tabs
            items={[
              { id: 'a', label: 'Overview', content: <p>Overview panel content.</p> },
              { id: 'b', label: 'Requirements', content: <p>Requirements panel content.</p> },
              { id: 'c', label: 'Metrics', content: <p>Metrics panel content.</p> },
            ]}
          />
        </Row>

        <Row title="Data table + filters">
          <FilterBar
            trailing={<span>3 rows</span>}
          >
            <SearchInput value={query} onChange={setQuery} placeholder="Search transactions…" />
            <FilterSelect
              label="Status"
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: 'All' },
                { value: 'pending', label: 'Pending' },
                { value: 'failed', label: 'Failed' },
              ]}
            />
          </FilterBar>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <DataTable
              columns={[
                { key: 'id', header: 'Txn', render: (r) => <code>{r.id}</code> },
                { key: 'type', header: 'Type' },
                { key: 'status', header: 'Status', render: (r) => <Pill tone={r.tone} dot size="sm">{r.status}</Pill> },
                { key: 'age', header: 'Age', align: 'right', hideOnMobile: true },
              ]}
              rows={[
                { id: 'TXN-4F9A2C', type: 'Challan payment', status: 'Pending', tone: 'pending' as const, age: '4m' },
                { id: 'TXN-77B10E', type: 'Charging session', status: 'Failed', tone: 'error' as const, age: '11m' },
                { id: 'TXN-1C0D55', type: 'FASTag recharge', status: 'Success', tone: 'success' as const, age: '18m' },
              ]}
              getRowId={(r) => r.id}
              onRowClick={() => setDrawerOpen(true)}
            />
          </div>
        </Row>

        <Row title="Timeline">
          <Timeline
            items={[
              { marker: 'T+00:00', title: 'Detection', description: 'Failure-rate alert fires for a vendor.', tone: 'warning' },
              { marker: 'T+00:06', title: 'Triage', description: 'On-call confirms a single vendor is timing out.', tone: 'info' },
              { marker: 'T+00:20', title: 'Mitigation', description: 'Traffic routed to the fallback path.', tone: 'success', meta: 'Owner: Ops' },
              { marker: 'T+24:00', title: 'RCA published', description: 'Preventive actions assigned.', tone: 'neutral' },
            ]}
          />
        </Row>

        <Row title="Disclosure rows">
          <DisclosureRow summary="Exception case — vendor timeout" meta={<Pill tone="warning" size="sm">P2</Pill>} defaultOpen>
            <p>If the vendor does not respond within the timeout, the transaction moves to PENDING_VENDOR and a reconciliation job is scheduled.</p>
          </DisclosureRow>
          <DisclosureRow summary="Exception case — duplicate callback">
            <p>Idempotency keys ensure a repeated webhook does not double-apply a state transition.</p>
          </DisclosureRow>
        </Row>

        <Row title="Diagram frame + node flow">
          <DiagramFrame
            title="Illustrative request path"
            disclaimer="Proposed — not internal architecture"
            caption="A linear view; the real design would branch on vendor and failure type."
            legend={[
              { label: 'Happy path', color: 'var(--brand-green)' },
              { label: 'Async callback', dashed: true },
            ]}
          >
            <NodeFlow
              nodes={[
                { id: 'app', label: 'MyMotor', icon: 'car', tone: 'brand' },
                { id: 'api', label: 'API layer', icon: 'layers' },
                { id: 'orch', label: 'Orchestration', icon: 'refresh' },
                { id: 'vendor', label: 'Vendor / API', icon: 'plug', tone: 'alert' },
                { id: 'state', label: 'Txn state', icon: 'activity' },
              ]}
            />
          </DiagramFrame>
        </Row>

        <Row title="Phone frame">
          <PhoneFrame caption="MyMotor screen mockup">
            <div className={s.phoneDemo}>
              <p className={s.phoneDemoTitle}>Payment status</p>
              <Pill tone="pending" dot>In progress</Pill>
              <p className={s.phoneDemoText}>We'll update this as soon as the payment is confirmed.</p>
            </div>
          </PhoneFrame>
        </Row>

        <Row title="Section header (split)">
          <SectionHeader
            eyebrow="Example"
            eyebrowNumber="00"
            title="Different needs. A shared future."
            align="split"
            lead={<p>Whether it's a fleet on the highway or a family in the city, both journeys run on the same network.</p>}
          />
        </Row>

        <Row title="Overlays">
          <div className={s.cluster}>
            <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>
          </div>
        </Row>
      </Container>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        eyebrow="TXN-4F9A2C"
        title="Transaction detail"
        footer={<Button size="sm">Retry</Button>}
      >
        <p>Drawer body — a transaction detail view would live here (state history, vendor calls, customer messaging, actions).</p>
      </Drawer>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm retry"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setModalOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>Modal body — a focused confirmation dialog.</p>
      </Modal>
    </div>
  )
}
