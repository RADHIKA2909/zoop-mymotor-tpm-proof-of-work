# CLAUDE.md — ZOOP × MyMotor · Technical Product Manager Proof of Work

Persistent source of truth for this project. Update it whenever a product, UX,
architecture or implementation decision is made.

---

## 1. Project objective

Build a polished, interactive **web-based product case study** that demonstrates
Technical Product Manager capability for a ZOOP Energy interview. It must show
that the candidate:

1. researched ZOOP Energy and its consumer product MyMotor,
2. understands B2C operational, transaction-heavy problems relevant to the TPM role,
3. can analyze real user feedback,
4. can identify and prioritize product / operational problems,
5. can think in APIs, third-party integrations, vendors, transaction workflows,
   monitoring, exception management and reliability,
6. can translate problems into PRDs, workflows, system designs and measurable outcomes,
7. proposes a realistic solution **without** pretending to know ZOOP's internal architecture.

It should feel like something a strong TPM would actually present and walk an
interviewer through — product strategy + UX + technical + operations + prototype.

## 2. Interview context

- Role: **Technical Product Manager, ZOOP Energy**.
- JD themes to demonstrate: B2C operational journeys; Tower Control / control tower;
  real-time transaction monitoring; exception management; escalation & resolution;
  end-to-end vendor management (onboarding, integrations, SLAs, KPIs, TAT, quality,
  failure rates); API-based products & third-party integrations; system workflows &
  business rules; PRDs, user stories, acceptance criteria; dashboards; RCA and
  production/operational incidents (API failures, vendor downtime, customer-impacting
  issues); cross-functional work with Engineering, Operations, Support, Finance,
  Compliance and external vendors; automation of manual ops; UAT, release validation,
  post-release monitoring; customer journey metrics.
- Candidate / author: **Radhika Maheshwari** (see `src/data/company.ts` `AUTHOR`).

## 3. ZOOP public-product context

- **Zoop Energy Private Limited** (India) publishes the **MyMotor** consumer app.
  Do **not** confuse with unrelated "ZOOP" entities (a UK "ZOOP ENERGY LTD", a
  Turkish solar micro-car, a beverage brand, etc.).
- ZOOP Energy has two broad sides per the interview brief:
  - **Business / Freight** — fleet-focused charging infrastructure, heavy-duty
    electric prime movers, coordination of electric freight across industrial
    corridors.
  - **Consumer / MyMotor** — the B2C mobility app (this case study's focus).
- The public site `https://zoop.energy/` did **not** render extractable content
  during research (JS-only). Everything about the freight side is therefore
  **ASSUMPTION / brief-derived** until the candidate confirms with the interviewer.
  Captured in `src/data/company.ts` as `ZOOP_B2B_NOTE`.

## 4. MyMotor context (public, verifiable — see `src/data/company.ts`)

Sourced from `mymotor.in`, `mymotor.in/mymotor-app`, and the app-store listings:

- Positioning: "Your vehicle details and more now in one place"; "RTO-verified data,
  Instant results, Ad-free experience"; app page says "TRUSTED BY 1M+ VEHICLE OWNERS".
- Public marketing numbers: **4.7/5 from 25K+ reviews**, **50L+ vehicles searched**,
  **15L+ vehicles added**, **2Cr+ worth of policies insured**, EV Charging Hub with
  **4,500+ chargers** and "a single wallet for all networks".
- Features: RC / owner / RTO / PUC lookup; **challan search + payment** ("lowest fees
  in 30 seconds"); insurance status + renewal comparison; **FASTag** balance + recharge;
  **EV Charging Hub** (real-time availability, live session tracking, connector/speed
  filters, single multi-network wallet); **MyGarage** (deadline alerts, dues);
  **Glovebox** (DigiLocker-verified documents); **MyVerse** (AI-summarised mobility
  news); fuel/energy prices; vehicle valuation/resale; transaction history + receipt
  downloads; nearby fuel pumps / service centres / car wash.
- Store ids: Android `info.vehicle.rto.car`; iOS `id6752399714`. Support `help@mymotor.in`.

**Numbers above are public marketing claims, not verified operational metrics.**
Never invent additional review counts, ratings or statistics.

## 5. Case-study thesis

> "Understanding MyMotor's Consumer Journey and Designing for Reliable Transactions"

Likely core problem area: **transaction reliability & exception management** — a
customer starts a payment/transaction → it goes pending/fails → an external
vendor/API may be unavailable → the customer doesn't know what happened → support
intervenes → refund / retry / reconciliation. **The final problem is NOT decided
yet** — it is chosen after the Section 3 review analysis and Section 4 prioritization.

## 6. Information architecture

Reference design uses a **6-item top nav**. The brief's ~11 areas fold into these
six (see `src/data/sections.ts` — `planned` and `absorbs` per section):

| # | Route | Section | Absorbs (brief §) |
|---|---|---|---|
| 01 | `/context` | ZOOP × MyMotor — Ecosystem Context | §1 |
| 02 | `/journey` | The Consumer Journey | §2 |
| 03 | `/feedback` | Customer Feedback Analysis | §3 |
| 04 | `/reliability` | Transaction Reliability & Exception Management | §4, §5, §8, §9, §10 |
| 05 | `/control-tower` | The Control Tower | §6, §6/§7 technical, §7 |
| 06 | `/prototype` | Interactive Prototype | §11 |

Plus: `/` overview (landing), `/styleguide` (internal design-system reference, not
in nav), `*` not-found.

Narrative spine (landing page): public user evidence → problem discovery →
prioritization → product proposal → operational workflow → technical design →
metrics → prototype → rollout / UAT / monitoring.

> **OPEN QUESTION for the candidate:** confirm the 6-section consolidation is
> acceptable, or whether any absorbed area (PRD, RCA, metrics, vendor mgmt) should
> be promoted to its own route.

## 7. Confirmed facts

Only what is in `src/data/company.ts` (`PUBLIC_FACTS`, `SOURCES`). Everything there
carries a source id. Nothing else is a "fact".

## 8. Proposed assumptions (labelled, never stated as ZOOP fact)

- ZOOP's freight-side specifics (partners, corridors, prime-mover models).
- Any architecture, vendor, API, queue, payment provider, SLA, KPI, TAT, or ops
  process proposed in Sections 4–6.
- All target metrics ("> 98% success", "P95 TAT < Xs", etc.).
Use the `<Callout kind="assumption">` / `<Callout kind="proposed">` components and
the `DiagramFrame` `disclaimer` prop ("Proposed — not internal architecture").

## 9. Review-analysis findings

**Empty — awaiting the review corpus from the candidate** (Section 3 prompt). When
added, store as typed data in `src/data/` and label every entry `OBSERVED` vs
`INFERRED`. Do **not** fabricate counts; use only evidence provided.

## 10. Product decisions

- 6-section IA (above), matching the reference nav.
- Landing page is the only page with finalized copy in the scaffold pass.
- Each section route currently renders `SectionScaffold` + `Placeholder` (planned
  contents only).

## 11. Technical architecture decisions (the app itself)

- **Vite + React 18 + TypeScript**, **React Router v7** (`createBrowserRouter` +
  `RouterProvider`, declarative). SPA, no backend.
- **CSS Modules + centralized design tokens** (`src/styles/tokens.css`). No utility
  framework.
- **Hand-built SVG chart primitives** (`src/components/charts/Charts.tsx`) —
  Sparkline, MiniBars, GaugeArc, Donut. No charting library.
- **Motion**: no library. `ScrollReveal` uses `IntersectionObserver`
  (`src/hooks/useInView.ts`); overlays use CSS transitions. Respects
  `prefers-reduced-motion`. (Deviation from the approved plan, which listed
  Framer Motion — dropped to remove a dependency; revisit only if a section needs
  complex choreography.)
- **Fonts**: `@fontsource/inter` (400/500/600/700) + `@fontsource/caveat` (400/700)
  for the handwritten accent, self-hosted. System mono stack for IDs/figures.
- **Deploy**: `vercel.json` present (SPA rewrite). `npm run build` → `dist/`.
- Path alias `@/*` → `src/*` (both `tsconfig.json` and `vite.config.ts`).

## 12. Design-system decisions

- Palette = **MyMotor-derived working tokens** (green `#72C42B` system). These are
  *derived from the public MyMotor site/app — NOT claimed official brand values.*
  Full list in `src/styles/tokens.css` and the plan file. Change that one file to
  re-theme everything.
- Light-first. A scoped **dark "console"** theme (`[data-theme="dark"]` on a wrapper)
  for the Control Tower + prototype, reusing the same green + Inter system. Optional
  global `ThemeToggle` exists (light-first default, persisted to `localStorage`).
- Type: Inter only for UI; Caveat only for occasional accent phrases; mono only for
  identifiers/metrics. Large confident headings, readable (non-condensed) body.
- 4px spacing base; rounded cards (radius 8–16px); 1–2 shadow levels; content max
  ~1120px (`--content-wide` 1280 for nav/dashboards); generous whitespace.
- No neon gradients, no glassmorphism, no generic AI-dashboard aesthetic.

## 13. Component structure

```
src/components/
  layout/    CaseStudyShell · TopNav · MobileNav · Footer · LogoLockup ·
             ThemeToggle · SectionProgress · SectionScaffold
  ui/        (barrel: src/components/ui/index.ts)
             Button · Pill · StatusDot · IconChip · Card · FeatureCard · CheckList ·
             Eyebrow · Callout · SectionHeader · Placeholder · DiagramFrame ·
             KpiCard · StatGrid/Stat · DataTable · Timeline · Tabs · Drawer · Modal ·
             FilterBar/FilterSelect/SearchInput · DisclosureRow · ScrollReveal ·
             Container · Icon · Portal(+useScrollLock/useEscapeKey)
  charts/    Charts.tsx → Sparkline · MiniBars · GaugeArc · Donut
  diagrams/  PhoneFrame · NodeFlow   (bespoke section diagrams added later)
  prototype/ (added in Section 06)
```

`src/data/` — `sections.ts` (IA + nav model + progress), `company.ts` (public facts +
sources + author), `claims.ts` (OBSERVED/INFERRED/PROPOSED/ASSUMPTION/SOURCE meta).
`src/hooks/` — `useInView`, `useMediaQuery`, `useTheme`.
`src/lib/` — `cn`, `format`.
`src/sections/` — one file per route (`HomeSection`, `ContextSection`, …,
`StyleGuideSection`, `NotFoundSection`).

## 14. Routes / pages

See §6. Routing defined in `src/routes.tsx`. Nav model in `src/data/sections.ts`
(single source — the top nav, mobile nav, landing map, prev/next and progress all
read from it). To mark a section built: set its `status` to `'done'` there.

## 15. Important terminology

- **Control Tower / Tower Control** — the proposed ops console for real-time
  transaction monitoring, exception handling, escalation and vendor oversight.
- **Transaction** — any customer money/state action: challan payment, FASTag
  recharge, insurance purchase, EV charging session settlement, document fetch.
- **Exception** — a transaction not on the happy path (pending, failed, timed out,
  awaiting vendor, needs reconciliation/refund).
- **Vendor / third party** — external system MyMotor depends on (payment rails,
  charging networks, government/RTO data, DigiLocker, FASTag, insurers). **Specific
  vendors are assumptions unless the candidate confirms.**
- **TAT** — turnaround time. **RCA** — root cause analysis. **SLA** — service level
  agreement. **MTTR** — mean time to resolution. **Reconciliation** — matching our
  record of a transaction against the vendor's.
- **Claim labels** — OBSERVED / INFERRED / PROPOSED / ASSUMPTION / SOURCE.

## 16. Metrics (ALL PROPOSED — never presented as ZOOP's actual KPIs)

Candidate north star (draft): **successful completed transactions / successful
customer journeys**. Supporting (draft): transaction success rate, failure rate,
pending rate, avg TAT, P95 TAT, SLA breach rate, MTTR, vendor failure rate, retry
recovery rate, support contact rate, refund rate, repeat usage. Finalize in
Section 04. Always render via `Callout kind="proposed"` or a clearly-labelled block.

## 17. Open questions

1. Confirm 6-section consolidation (§6).
2. ZOOP freight-side specifics — need candidate input or a working public source.
3. Review corpus for Section 3 — which stores, what window, how many, provided how.
4. Final name of the primary problem / Section 5 solution (decided after §3–4).
5. Deploy target if not Vercel.
6. Is a global dark-mode toggle wanted in the top nav, or keep dark section-scoped only?

## 18. Things that must NOT be claimed as ZOOP facts

- Any internal architecture, tech choice ("uses Kafka", "uses Razorpay", …),
  database, queue, or event system.
- Any specific vendor, integration, SLA, contract term or commercial detail.
- Any operational process (how onboarding/UAT/incident response actually works).
- Any real KPI value, success rate, failure rate, TAT, volume or MTTR.
- Any review count/rating beyond the public marketing numbers in `PUBLIC_FACTS`.
- Any user-research finding not present in the review evidence the candidate provides.
When in doubt: label it PROPOSED / ASSUMPTION / ILLUSTRATIVE.

## 19. Instructions for implementing future sections

1. The candidate provides a per-section prompt, usually **with a reference image**.
   Treat that image as the **visual source of truth** for that section: replicate
   structure, hierarchy, layout and interaction pattern; adapt to our tokens; use
   the real content from the prompt (not the image's placeholder text).
2. Implement exactly what the prompt specifies. Do **not** rewrite the product
   strategy, invent company facts, invent research, or invent statistics.
3. Build section content into `src/sections/<Name>Section.tsx` (split into a folder
   with sub-components + a `_data.ts` once it grows). Keep using `SectionScaffold`.
4. Reuse `src/components/ui` primitives first; add new reusable primitives only when
   genuinely shared. Section-specific diagrams go in `src/components/diagrams/` or a
   local `components/` folder next to the section.
5. Every non-trivial claim gets a label (`Callout` / `Pill` tone / `DiagramFrame`
   disclaimer). Distinguish OBSERVED vs INFERRED vs PROPOSED explicitly.
6. Put section data in typed modules; no magic numbers inline.
7. When a section is done: set `status: 'done'` in `src/data/sections.ts`, update
   §9–§16 here as needed, and note new decisions in §10–§12.
8. Run `npm run build` (runs `tsc --noEmit` first) before considering it complete.

## 20. Visual / design consistency rules

- Colour only via `var(--…)` tokens. Never hardcode hex in a component.
- Eyebrow (green tracked caps) + big headline + supporting copy opens every section
  (`SectionHeader` / `SectionScaffold`).
- Cards: rounded, 1px `--border`, `--shadow-sm`. Primary actions: green pill
  `Button`. Text actions: `Button variant="link"` (tracked caps + arrow).
- Status semantics fixed: success = green `--status-success`, warning = amber,
  error = red, pending = violet, info = blue.
- Diagrams always wrapped in `DiagramFrame` with a caption and, when proposed, the
  "not internal architecture" disclaimer.
- Respect `prefers-reduced-motion`; keep animation subtle (fades, 8–10px lifts).
- Every interactive element needs a visible `:focus-visible` state (global default
  provided) and an accessible name.
- Mobile: no horizontal body scroll; wide tables/diagrams scroll inside their own
  container.

---

## 21. Section build log

### Section 01 — Context — COMPLETED (2026-09-08)

**Section 1 is based on publicly observable ZOOP / MyMotor information. No internal
ZOOP architecture is claimed.**

- **Route / files:** `/context` → `src/sections/context/` (folder replaced the flat
  file; `src/routes.tsx` import updated; `src/data/sections.ts` `context.status` =
  `'done'`). Bespoke page — does **not** use `SectionScaffold` (own hero + own
  forward CTA).
- **Components (all with co-located `*.module.css`):** `ContextSection` (orchestrator)
  · `ContextHero` + `HeroVisual` + `ConceptualAppScreen` · `TwoPaths` + `PathCard` ·
  `CapabilityMap` · `EcosystemSection` + `EcosystemDiagram` + `ReliabilityQuestions`
  + `TpmLens` · `SectionTransition`. Data in `_data.ts`; image slots in `_assets.ts`.
- **Reused primitives:** `Container`, `Eyebrow`, `SectionHeader` (`split` / `center`),
  `Pill` (`assumption` outline caps), `Button` (`primary` / `link`), `IconChip`,
  `CheckList`, `Callout` (`source`), `ScrollReveal`, `Icon`, `DiagramFrame`
  (`tone="dark"`, `disclaimer`), `PhoneFrame`, `NodeFlow` (`tone="dark"`).
- **New shared additions:** `src/components/ui/Icon.tsx` gained `leaf, users, trend,
  wifi, cog, card, truck, user, route, network, search, compass`. `tokens.css` gained
  `--ecosystem-bg: #0D2418` and `--connector: #72C42B`.
- **Copy:** eyebrow `01 — ECOSYSTEM CONTEXT`; H1 `ZOOP × MyMotor` (MyMotor in
  `--brand-green`); subhead "From electric infrastructure to the everyday EV
  journey."; supporting "Before designing for reliability, I first mapped the
  ecosystem MyMotor operates within."; meta pill "Public product research · Sep
  2026"; hero stat chips "Cleaner cities / Happier drivers / A more connected EV
  future" (aspirational, **not metrics**); script accent "Same roads, greener
  tomorrows." All block copy lives in `src/sections/context/_data.ts`.
- **Factual claims used (all from `PUBLIC_FACTS`):** ZOOP builds charging
  infrastructure for fleet/logistics; MyMotor = consumer app for charger discovery
  across networks, RC/insurance/challan, unified payments, route planning. Freight
  bullet points are **brief-derived, generic** (no partners/corridors/models).
- **Assumptions / illustrative (labelled in-UI):** the whole ecosystem diagram —
  `Provider A/B/C`, `+30 networks`, "Across 3K+ locations in India" — carried by the
  section-level `Pill` "CONCEPTUAL ECOSYSTEM — NOT INTERNAL ARCHITECTURE" + the
  `DiagramFrame` disclaimer + caption "Provider names and counts are illustrative
  placeholders." Capability map carries `Callout kind="source"` "Based on publicly
  observed MyMotor product capabilities". App screens are conceptual mockups
  (`ConceptualAppScreen`), captioned "Conceptual app mockup".
- **Interactions:** sticky nav + active state (existing) · Consumer CTA smooth-scrolls
  to `#capabilities` · path-card + capability-node + reliability-card hover states ·
  Freight card "Why consumer-only?" toggle · capability connector-line highlight on
  node hover · `ScrollReveal` on entry · final CTA → `/journey`. All motion respects
  `prefers-reduced-motion` (global rule).
- **Responsive:** hero 45/55 → stacked < 940px; path cards 2-col → 1-col < 860px;
  capability map 3-col (cards / phone / cards) → phone-first single column < 860px
  (connector SVG hidden); ecosystem flow horizontal → vertical < 720px; reliability
  4 → 2 → 1 col.
- **Asset slots (all conceptual now — `_assets.ts`):** `hero`, `freight`, `consumer`,
  `capabilityPhone`. Drop rights-cleared files in `src/assets/` and set `src`.
- **To replace / refine later:** real EV-charging hero photo; real MyMotor
  screenshots; real charging-network names + counts (only if publicly confirmed);
  freight visuals on the Freight card (currently icon-only).
- **Open item:** `PathCard` freight card has no image (icon-only) — the reference
  shows a truck photo. Left as an asset slot.

---

### Working commands

```
npm install          # deps
npm run dev           # local dev server
npm run build         # tsc --noEmit + vite build -> dist/
npm run preview       # serve the built dist/
npm run typecheck     # tsc --noEmit only
```

Route `/styleguide` renders every primitive in both themes — use it to QA visual
consistency after each section.
