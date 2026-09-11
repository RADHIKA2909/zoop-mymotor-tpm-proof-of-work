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
- **Dark-theme token system** (rebuilt 2026-09-08 — see §21 audit):
  - `:root` holds a **fixed dark palette**: `--dark-bg` `--dark-surface`
    `--dark-surface-elevated` `--dark-text-primary` `--dark-text-secondary`
    `--dark-text-muted` `--dark-border` `--dark-border-strong` `--dark-accent`
    `--dark-accent-strong` `--dark-accent-surface`. **Always-dark surfaces**
    (the Section 1 ecosystem band, `DiagramFrame tone="dark"`, `NodeFlow tone="dark"`,
    future Control Tower) reference these **directly** so they are correct
    regardless of the active theme.
  - `[data-theme="dark"]` **maps the generic tokens onto that same palette** (for
    the global toggle + shared primitives).
  - `--brand-green-deep` = "deep green **as text** on a green tint" → flips to a
    light green (`#cfe9b6`) in dark. `--brand-green-ink` = "deep green **as a
    surface**" (logo tile, skip link, phone frame, `IconChip` deep) → stays dark.
  - `--text-inverse` / `--text-inverse-secondary` = "light text on a
    permanently-dark chip" → **light in both themes** (never overridden in the
    dark block). Do NOT use them for "text on a dark section" — use `--dark-text-*`.
  - `npm run contrast` (`scripts/contrast-check.mjs`) resolves the token chain and
    asserts WCAG ratios for every important dark pair. Run it after any dark-token
    change. All pairs currently ≥ 4.5:1 (text) / ≥ 3:1 (accent).
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

### Dark-theme contrast overhaul — 2026-09-08 (post Section 1 review)

Fixed a real bug: `[data-theme="dark"]` was flipping `--text-inverse*` to near-black,
and the Section 1 ecosystem band used those tokens for all its text → black-on-black.

- Added the fixed `--dark-*` palette to `:root` (see §12). Rewrote the
  `[data-theme="dark"]` block to map generics onto it. Split `--brand-green-deep`
  (text) from new `--brand-green-ink` (surface). Stopped overriding `--text-inverse*`
  in dark.
- Migrated the always-dark component CSS to `--dark-*`: `EcosystemSection`,
  `EcosystemDiagram`, `ReliabilityQuestions`, `TpmLens`, `DiagramFrame` `.dark`,
  `NodeFlow` `.dark`, `SectionHeader` `.inverse`. Surface usages of
  `--brand-green-deep` → `--brand-green-ink` in `IconChip`, `CaseStudyShell` (skip),
  `LogoLockup`, `PhoneFrame`. Added a `[data-theme="dark"]` panel override in
  `HeroVisual`.
- Latent bugs also fixed for the global toggle: TopNav `.badgeTitle`, `SectionScaffold`
  pager hover, `HomeSection` `.cta` title, Footer links — all were "deep-green text on
  a tint that also goes dark".
- `scripts/contrast-check.mjs` (`npm run contrast`) — 17 WCAG assertions, all pass
  (text ≥ 4.5:1, accent ≥ 3:1). Light theme untouched.

---

### Section 02 — User Journey — COMPLETED (2026-09-08)

**The journey model is a product-thinking model based on publicly observable MyMotor
capabilities and is NOT claimed to represent ZOOP's internal workflow.**

- **Route / files:** `/journey` → `src/sections/journey/` (folder replaced the flat
  file; `routes.tsx` import updated; `sections.ts` `journey.status = 'done'` → landing
  map + progress now 2/6). Bespoke light-mode page (own hero + own CTA).
- **Components (each + co-located `*.module.css`):** `JourneySection` (orchestrator) ·
  `JourneyHero` + `JourneyHeroVisual` (conceptual charging scene: ZOOP pillar + EV
  silhouette + route arc) · `JourneyFlow` + `JourneyStage` (6-stage timeline + local
  `ModeToggle`) · `AppShowcase` + `JourneyAppScreen` (find / navigate / session) ·
  `MomentThatMatters` · `TpmQuestions` (uses `FeatureCard`) ·
  `JourneyTransition`. Copy in `_data.ts`; image slots in `_assets.ts`
  (`heroScene`, `showcaseFigure` — both conceptual). `BreakMap` + `RiskChip`
  ("Where the journey can break" — the 5-step experience model / 6-row
  dependency model panel) were built then later removed.
- **New shared:** `Icon.tsx` gained `sliders, navigation, bulb, database, eye, quote`.
  No token changes; no Section 1 changes.
- **Journey stages (proposed model):** 01 Discover · 02 Evaluate · 03 Navigate ·
  04 Start session · 05 Charge · 06 Complete & pay. Each has a customer goal +
  potential uncertainty (hover tooltip) and a potential breakpoint (breakpoints mode).
- **Publicly observed (basis, from `PUBLIC_FACTS`):** MyMotor EV Charging Hub —
  finding chargers, real-time availability, live session tracking, connector/speed
  filtering, multi-network charging, single wallet. Rendered as the "One app. Many
  networks." card with a "Publicly observed" pill.
- **Proposed / conceptual / illustrative (labelled in-UI):** the 6-stage journey and
  its mechanics; all per-stage breakpoints — phrased as hypotheticals ("Potential
  availability mismatch", "Potential compatibility issue", "Potential location or
  access issue", "Potential session-state failure", "Potential session-status
  mismatch", "Potential transaction-state mismatch") — carried by the hero pill
  "Publicly observed + proposed journey model", the breakpoints banner
  "Illustrative breakpoint model — not measured failure rates", and
  `Callout kind="source"` on the app screens. (The 5-step proposed experience
  model and the 6-row conceptual dependency model — "Where the journey can
  break" — were removed; see above.)
- **The pull-quote** ("A great EV charging experience feels effortless…") is labelled
  "Working design principle" — no fabricated attribution.
- **Interactions:** `ModeToggle` (Happy path ⇄ Breakpoints) reveals per-stage risk
  markers + issue captions + the disclaimer banner in place (no layout switch —
  confirmed with user); stage hover/focus tooltip; phone hover; `ScrollReveal`
  on blocks; CTA → `/feedback`.
- **Responsive:** hero 2-col → stacked < 940px (right script hidden on mobile);
  timeline horizontal → vertical cards < 720px (tooltips inline on mobile); app
  showcase 3-up → column < 560px; TPM 4 → 2 → 1.
- **Dark mode:** Section 2 uses only generic tokens → maps via the fixed `--dark-*`
  palette. `npm run contrast` still passes; `JourneyHeroVisual` has a
  `[data-theme="dark"]` panel override.
- **To replace / refine later:** real EV-charging hero photo; real MyMotor
  screenshots for the 3 journey screens; the `showcaseFigure` slot (currently the
  side card has no photo).

---

### Section 03 — Customer Feedback Analysis — COMPLETED (2026-09-08)

**Section 3 is a public-research synthesis. Quantitative review percentages are NOT
claimed unless calculated from a defined dataset — none was scored. No claim about
ZOOP's internal architecture, vendors, SLAs, metrics or workflow.**

- **Objective:** public review evidence → recurring themes → reliability signals →
  prioritized problem statements → *why reliability is the focus of Section 4*.
- **Route / files:** `/feedback` → `src/sections/feedback/` (folder replaced the
  flat file; `routes.tsx` + `ssr-smoke.tsx` imports updated; `sections.ts`
  `feedback.status = 'done'` → landing map + progress 3/6). Bespoke page.
- **Components (+ co-located `*.module.css`):** `FeedbackSection` (orchestrator,
  holds the review-filter state) · `FeedbackHero` + `FeedbackHeroVisual` ·
  `ReviewOverview` (4 qualitative evidence cards, no charts) · `ThemesGrid` (6
  theme cards) · `ReviewEvidence` + `ReviewCard` (segmented All/Positive/Negative/
  Reliability filter + theme filter from `ThemesGrid`) · `VoicesAndSignals`
  (representative paraphrased quotes + uniform keyword chips) · `WorksVsBreaks` ·
  `KeyInsights` (dark band: 4 insight cards + the "uncertainty, not an API
  failure" statement + conceptual reliability model) · `ProblemFlow` (NodeFlow +
  4 problem cards) · `PrioritizationMatrix` (2×2, no scores, 2 highlighted) ·
  `FeedbackTpmLens` (before/after only — the Detect/Diagnose/Assign/Recover
  card grid was later removed) · `FeedbackTransition` → `/reliability`. All copy
  + the local review dataset in
  `_data.ts`; hero slot in `_assets.ts`.
- **New shared:** `Icon.tsx` gained `star, filter, thumb-up, thumb-down, message,
  grid`. No token changes; no Section 1/2 changes.
- **Public review sources:** Google Play + Apple App Store (public listings). The
  only number shown = MyMotor's own stated "4.7 / 25K+ reviews" (from
  `PUBLIC_FACTS`, `mymotor-site`), in the hero, captioned as their marketing
  figure — not this analysis.
- **Review evidence used (OBSERVED, paraphrased — `_data.ts` `REVIEWS`, ~19
  entries, labelled "representative, not verbatim"):**
  - *Positive:* fast + easy, all-in-one convenience, accurate/detailed vehicle &
    RTO info, ad-free, clean UI, real-time challan status, responsive support.
  - *Problem:* delayed updates; missing tax/permit info; blank-screen on the
    recent-history vehicle tab; limited map usability; charger coverage/integration
    requests; charger shown available but not matching on arrival; eChallan payment
    stuck "in progress"; money deducted while transaction unresolved; government
    server issue blocking completion → eventual refund; stale previous-owner data
    after RC/VAHAN update; insurance wrongly "pending"; documents not downloading;
    wanting clearer contact options; support resolving stuck payments but slowly.
- **Theme taxonomy (6):** Charger availability & coverage · Payments & transactions
  · Data accuracy & freshness · Navigation & location · Customer support &
  resolution · App experience & usability. Each carries a *qualitative* signal
  ("Reliability-sensitive" / "Recurring" / "Mixed" / "Mostly positive") — no %.
- **Problem statements (INFERRED / PROPOSED, `_data.ts` `PROBLEMS`):** Charger
  availability mismatch · Transaction state uncertainty · Data freshness & accuracy
  · Slow exception resolution. Each = user signal / potential underlying signal /
  product implication.
- **Prioritization:** 2×2 (customer/operational impact × reliability signal),
  problems placed **conceptually with no numeric scores**, *Transaction state
  uncertainty* + *Charger availability mismatch* highlighted as the Section-4 focus.
  Labelled "Illustrative — not internal ZOOP data".
- **Observed vs Inferred vs Proposed:** OBSERVED = public product facts + the
  paraphrased review signals; INFERRED = the "potential underlying signal" lines +
  problem framing; PROPOSED/CONCEPTUAL/ILLUSTRATIVE = the reliability model, the
  matrix, the TPM questions. Labels used selectively (`Callout` / `Pill`), not on
  every element.
- **Why reliability becomes the bridge to Section 4:** the review signals cluster
  on *not being able to tell what state a real-world transaction or service is in*
  — availability, session, payment, data freshness — and on slow recovery. That is
  a reliability-visibility problem, which Section 4 models and Section 5 (Control
  Tower) addresses.
- **METHODOLOGY RULE:** *Quantitative review percentages are not claimed unless
  calculated from a defined dataset.* The `_data.ts` `REVIEWS` array stays
  swap-ready if verbatim quotes are collected later.
- **Open questions — cannot be answered from public information:** actual
  transaction failure rate · actual vendor SLAs / performance · actual API
  architecture · actual charger-state synchronisation mechanism · actual incident
  ownership / escalation matrix · actual operational TAT.
- **Dark mode:** the `KeyInsights` band is `data-theme="dark"` + `--dark-*`;
  everything else generic tokens. `npm run contrast` passes.
- **To refine later:** verbatim review quotes (currently paraphrased); real hero
  imagery.

---

### Section 04 — Reliability Analysis — COMPLETED (2026-09-08)

**Public-research based. No ZOOP-internal data. Risk levels are qualitative and
illustrative — never measured failure rates. Root causes are INFERRED; every
framework / model / diagram is PROPOSED / CONCEPTUAL. Nothing here is ZOOP's
internal system.**

- **Objective:** convert Section 3's feedback signals into a structured reliability
  analysis — where reliability can break down, why (potential causes), the customer
  impact, which problems to focus on, and why transaction reliability deserves the
  deepest look — ending with the question Section 5 (Control Tower) answers.
- **Route / files:** `/reliability` → `src/sections/reliability/` (folder replaced
  the flat file; `routes.tsx` + `ssr-smoke.tsx` imports updated). Bespoke page.
- **IA change:** the `sections.ts` `reliability` entry was retitled
  **"Reliability Analysis"** and rescoped — brief §5 / §8 / §9 / §10 (proposed
  solution / PRD / RCA / metrics) **moved to §5 Control Tower / §6 Prototype**.
  `status: 'done'` → landing map + progress 4/6.
- **Components (+ co-located `*.module.css`):** `ReliabilitySection` (orchestrator) ·
  `ReliabilityHero` + `ReliabilityHeroVisual` · `ThreeWayAnalysis` (signals /
  inferred causes / impact — 3 col) ·
  `ExceptionModel` (7-step Event→Detect→Classify→Assign→Escalate→Resolve→Communicate
  with the payment worked example) · `TransactionFocus`
  (Customer intent → … → Trust impact chain) · `TpmTakeaways` (dark band + 4 cards
  + the central "visible, understandable, recoverable" insight + Prevent→Detect→
  Diagnose→Resolve→Recover) · `ReliabilityTransition` → `/control-tower`. All copy in
  `_data.ts`; hero slot in `_assets.ts`.
- **Shared extraction:** `src/components/diagrams/PriorityPlot.tsx` (+ `.module.css`)
  — data-agnostic 2×2 scatter, lifted from Section 3's matrix. Section 3's
  `feedback/PrioritizationMatrix` refactored to use it (visual output preserved).
  (§4 had a second `PriorityPlot` visual — `ReliabilityPrioritization` — which was
  later removed; the shared component still backs the §3 matrix.)
- **New icons:** `target, link, flag, gauge`. No token changes; no Section 1/2 changes.
- **OBSERVED:** the journey stages + the 5 reliability signals + the 4 customer
  impacts, all grounded in Section 3's public review evidence and the public MyMotor
  product facts.
- **INFERRED:** the 5 potential root causes (external dependencies, data sync,
  transaction complexity, limited real-time visibility, support/escalation flow) —
  `Callout kind="inferred"` "not internal ZOOP data".
- **PROPOSED / CONCEPTUAL:** the exception-management model; the
  transaction-reliability product hypothesis; the 4 TPM takeaways + central
  insight. Each carries a `proposed` / `assumption` `Pill` or `Callout`.
  (The `JourneyRisk`, `ReliabilityGap`, `OpportunityAreas` and
  `ReliabilityPrioritization` blocks were built then removed in later trims.)
- **Prioritization outcome (still referenced narratively in §5):** the two
  problems carried forward = **transaction state uncertainty** and **charger
  availability mismatch**.
- **Open questions — cannot be answered from public information:** actual
  transaction / charger failure rates · which external vendors are in each journey ·
  actual vendor SLAs / performance · how transaction states are reconciled · how
  charger availability is updated · which team owns each exception · the actual
  escalation matrix · existing monitoring infrastructure · actual operational TATs.
- **Dark mode:** `TpmTakeaways` band = `data-theme="dark"` + `--dark-*`. Everything
  else generic tokens. `npm run contrast` passes.

---

### Section 05 — Reliability Control Tower — COMPLETED (2026-09-08)

**⚠️ Illustrative operational data — NOT internal ZOOP data.** This is the ONE
section where realistic placeholder values are sanctioned (section guide §8, §34)
— used ONLY to make the proposed interface legible. Every data view carries a
visible "not internal ZOOP data" label. Transaction / incident IDs (`TX-…`,
`INC-…`), provider names (`Provider A/B/C`), owners, timestamps and audit events
are all fictional. No real customer data. The Control Tower itself, its
architecture, severity model, escalation logic, metrics framework and
vendor-governance framework are all a **PROPOSED / CONCEPTUAL** design for this
proof of work — not an existing ZOOP system.

- **Objective:** take Section 4's reliability failure points and design a proposed
  operational model — how a TPM gives ops / product / support / partner teams the
  visibility to **detect → understand → act → learn** on reliability issues in a
  transaction-heavy B2C EV ecosystem. After later trims the section keeps its
  strongest signals: the dashboard concept, transaction + exception monitoring,
  the severity + escalation model, incident diagnosis, vendor scorecards, a
  conceptual architecture flow, and a metrics framework — ending with a CTA into
  Section 6 (the interactive prototype).
- **Route / files:** `/control-tower` → `src/sections/control-tower/` (folder
  replaced the flat placeholder; `routes.tsx` + `ssr-smoke.tsx` imports updated;
  flat `src/sections/ControlTowerSection.tsx` deleted). Bespoke page.
- **IA change:** `sections.ts` `control-tower` entry retitled **"Reliability
  Control Tower"**, refreshed tagline / phase / planned / absorbs (now also
  absorbs brief §5 proposed solution + §10 metrics), `status: 'done'` → landing
  map + progress **5/6**.
- **Orchestrator state:** `ControlTowerSection` holds `category`
  (`All / Charging / Payments / Vehicle data / Support`), `timeWindow`
  (`1h / 24h / 7d / 30d`) and the open detail entity
  (`{kind: 'transaction'|'incident'|'vendor', id} | null`) → one shared
  `DetailDrawer`. The exception-severity filter is local to `ExceptionQueue`.
- **Components (+ co-located `*.module.css`):** `ControlTowerSection` ·
  `ControlTowerHero` + `ControlTowerHeroVisual` (dark laptop-framed conceptual
  dashboard mockup) · `ControlTowerJob` (Detect/Understand/Act/Learn `FeatureCard`s
  + proposed 4-persona user model) · `Dashboard` (KPI row = 6 `KpiCard` + tiny
  `Sparkline`; `LineChart` reliability trend current vs previous; `Donut` issues by
  category; `HBars` issues by region; persistent illustrative-data `Callout`;
  category tabs + time-window control) · `TransactionMonitoring` (`DataTable` →
  `DetailDrawer`) · `ExceptionQueue` (P0–P3 filter; `DataTable` → `DetailDrawer`;
  one compact sub-block "How is severity determined?" — the 7 severity factors
  framed as "inputs to issue severity", then the escalation formula
  `Time elapsed + Customer impact + Issue severity = Escalation priority` with
  the "Issue severity" term visually tied back to the factors above) ·
  `VendorHealth` (`DataTable` → `DetailDrawer`;
  4 metric `KpiCard`s; proposed vendor-governance framework) · `Architecture`
  (`DiagramFrame` conceptual flow only) · `ControlTowerMetrics` (5 metric
  categories, no values + primary outcome / candidate north star) ·
  `ControlTowerTransition` → `/prototype`. All copy + mock data in `_data.ts`;
  hero slot in `_assets.ts`. `ControlTowerTakeaways` was trimmed (not removed):
  the "What this means for a TPM" eyebrow/title/lead and the 4 Visibility /
  Ownership / Customer impact / Learning cards are gone (`TAKEAWAYS_HEADER` /
  `TAKEAWAYS` removed), but the dark band itself stays as a compact **"Key
  Takeaway"** block — just `CENTRAL_INSIGHT` ("A control tower should not just
  tell us that something failed. It should tell us: what happened, who is
  affected, who owns it, what happens next, and whether the customer has
  recovered."), directly before the transition to §6.
  **Structural trims removed:** `ValidationQuestions`, the `Architecture`
  "system components" + "data model" panels, the `TransactionMonitoring`
  transaction-state-model sub-block, `CustomerImpact`, the `IncidentWorkflow`
  8-step workflow, `OperatorActions` (+ its audit-log / control-considerations —
  `AUDIT_LOG` is still used by the incident `DetailDrawer`), `Alerting`,
  `BeforeAfter`, the P0–P3 severity cards (`SEVERITY_META.desc` removed — the
  table still uses `.label`/`.tone`), the "When should we escalate?"
  issue-type/SLA/owner/state table (`EscalationRow` / `ESCALATION_ROWS` /
  `ESCALATION_LABEL` removed — only `ESCALATION_FORMULA` remains), and the
  standalone `DiagnosisSection` ("Turning an exception into a diagnosis" —
  `DiagnosisCard` + `DIAGNOSIS_LABEL` stay, still used inside `DetailDrawer`).
  `DetailDrawer` itself is otherwise unchanged (transaction timeline +
  diagnosis; incident diagnosis + audit log; vendor reliability + recent
  incidents). §5 keeps one forced-dark band (`ControlTowerTakeaways`, now just
  the Key Takeaway statement) plus `ControlTowerHeroVisual`'s laptop mockup.
- **New chart primitives (additive to `src/components/charts/Charts.tsx`):**
  - `LineChart` — small multi-series line chart (`series: {label, data, color?,
    dashed?}[]`, optional `min` / `max`), used for the reliability trend.
  - `HBars` — horizontal labelled bars with a trailing value (`rows: {label,
    value, display?, color?}[]`), used for issues-by-region.
  - `.module.css` additions for both; existing `Sparkline` / `MiniBars` /
    `GaugeArc` / `Donut` untouched.
- **New icons:** `bell, lock, server`. No token changes; no Section 1–4 changes;
  light theme unchanged.
- **OBSERVED:** the consumer journeys, transaction-heavy nature of the product,
  reliance on external charging / payment / data partners, and the specific
  failure points (payment pending, charger availability mismatch, stale vehicle
  data, document errors) — all carried forward from Section 3's public review
  evidence and public MyMotor product facts.
- **INFERRED:** the potential signals / causes in every diagnosis card (provider
  delay, missing callback, reconciliation lag, stale availability feed, upstream
  latency) — `Callout kind="inferred"` + `DIAGNOSIS_LABEL`.
- **PROPOSED / CONCEPTUAL:** the entire Control Tower — the detect/understand/
  act/learn job, the user model, the dashboard, the P0–P3 severity model +
  dimensions, the SLA / escalation logic + formula, the vendor scorecards +
  governance framework, the incident-diagnosis frame, the conceptual
  architecture flow, and the metrics framework + candidate north star
  ("customer-impacting transaction exception rate"). Each carries a `proposed` /
  `assumption` `Pill` or `Callout`. (A later trim removed the transaction state
  model, customer-impact section, the 8-step incident workflow, the operator
  action set + control considerations, the alerting rules and the
  reactive→proactive before/after — see the component list above.)
- **ILLUSTRATIVE-DATA POLICY:** realistic placeholder values (KPIs, trend series,
  category / region splits, ~8 transactions, ~6 incidents, 3 vendors, audit
  timestamps) are used only to make the interface legible. `_data.ts` header +
  every data view in the UI carry a "not internal ZOOP data" label; IDs, provider
  names, owners and timestamps are fictional; drawer actions are disabled and
  labelled "permission-controlled".
- **Must NOT claim:** "ZOOP's Control Tower has / monitors / uses…"; any real
  ZOOP success or failure rate; real vendor names, APIs or SLAs; a real incident
  log; real operational TATs; real customer data.
- **Open / validation questions:** §5's `ValidationQuestions` panel and §6's
  `ProductionValidation` panel were both built then later removed — the case
  study no longer surfaces a "what I'd validate first" list in-UI.
- **Dark mode:** `ControlTowerHeroVisual` (laptop mockup) + `ControlTowerTakeaways`
  (now just the "Key Takeaway" statement) = `data-theme="dark"` + `--dark-*`.
  Everything else generic tokens. `npm run contrast` passes (unchanged).

---

### Section 06 — Interactive Prototype — COMPLETED (2026-09-08)

**⚠️ PROPOSED / CONCEPTUAL prototype — the prototype is illustrative and does not
represent ZOOP's internal software, architecture, workflow, vendor integration,
SLA, metrics or transaction data.** Every incident ID (`INC-104xx`), transaction
ID (`TX-104xx`), provider name (`Provider A/B/C`), team, timestamp and
customer-facing message is fictional and exists only to make the proposed
operator workflow tangible. No real customer data, no financial values.

- **Objective:** turn the conceptual Reliability Control Tower (§5) into a
  working, clickable operator workflow — **detect → investigate → act → resolve →
  learn** — the case study's move from "here is what should be built" to "here is
  how the experience could work". Strongest proof-of-work section.
- **Route / files:** `/prototype` → `src/sections/prototype/` (folder replaced the
  flat `SectionScaffold` + `Placeholder`; `routes.tsx` + `ssr-smoke.tsx` imports
  updated; flat `src/sections/PrototypeSection.tsx` deleted). Bespoke page.
- **IA:** `sections.ts` `prototype` entry keeps the title "Interactive Prototype",
  refreshed `tagline` / `phase` / `planned` / `absorbs` (Brief §11 + "demonstrates
  §5 solution / §8 PRD-as-flow / §9 RCA in practice"), `status: 'done'` → landing
  map + progress **6/6 (case study complete)**.
- **Prototype scenario:** conceptual **payment status mismatch** (`INC-10482`,
  payment pending despite the transaction being initiated) — chosen because
  payment / transaction uncertainty was a recurring reliability signal in the
  §3 public review analysis. Plus 4 lighter scenarios: charger availability
  mismatch (`INC-10479`), vehicle data delay (`INC-10471`), high-impact payments
  degradation (`INC-10488`), regional vendor errors (`INC-10465`). All 5 are
  selectable in the stepper; each carries its own overview / timeline /
  diagnostics / customer-impact / related-transaction data; the shared action
  mechanics run against the selected scenario.
- **User flow / stepper:** 01 Detect (incident list + severity/status filters) →
  02 Investigate (incident detail: `Overview` / `Timeline` / `Customer impact` /
  `Diagnostics` / `Related` tabs) → 03 Take action (owner assignment, contact
  provider, escalate, update customer status, retry, mark resolved) → 04 Resolve
  (large success state + resolution summary) → 05 Learn (RCA fields + closure
  card `Detected → … → RCA captured`).
- **Interaction model:** one `useReducer` in `PrototypeSection`; `_state.ts` holds
  `PrototypeState` / `PrototypeAction` / `reducer` / `initialState(scenario)` /
  `stepDone()`. State is in-memory only — resets on unmount and via the explicit
  **"Reset scenario"** control. No backend, no persistence.
- **Conceptual incident state model:** `Open → Assigned → Investigating →
  Escalated → Resolved → Closed` (Escalated optional). Labelled conceptual; not
  ZOOP's real transaction states.
- **Proposed role / permission model (`ROLES`):** Control Tower Operator · Team
  Lead · Support · Product. A **request → approve** flow for financially
  sensitive actions: clicking "Retry transaction" as the Operator sets an
  "Approval requested" state + audit event; switching the role selector to
  **Team Lead** reveals **Approve / Reject**. Demonstrates safe-action design
  (§37) actively, not just a disabled tag.
- **Action model + audit trail:** direct actions (assign / note / contact
  provider / escalate / update customer status / mark resolved) run immediately;
  each mutating action appends to a live **illustrative audit log**
  (`AUDIT_TIMES` fixed ascending fictional timestamps). Escalation, provider
  contact and customer-status updates open `Modal` dialogs (simulated — nothing
  is sent).
- **Customer communication:** the customer-status modal shows a live preview of
  the customer-facing message before it is applied; the Customer-impact tab then
  reflects the operator's update.
- **RCA workflow:** the Learn step surfaces root-cause category / what happened /
  prevention / related improvement per scenario; "Add to RCA" / "Create product
  improvement" / "Link related incident" fire `CAPTURE_RCA` (idempotent) → status
  `Closed` + the closure card.
- **Mock-data conventions:** incident IDs `INC-104xx`, transaction IDs `TX-104xx`,
  providers `Provider A/B/C`, teams = {Payments Ops, Charging Ops, Data Ops,
  Partner Operations, Customer Support}, fictional `HH:MM` timestamps. No real
  names, identifiers, financial values or customer data. Every data view carries
  an "illustrative / conceptual — not internal ZOOP" `Callout` or `Pill`.
- **What is interactive vs simulated vs needs-a-backend** (context, no longer a
  UI panel): interactive = scenario selection, stepper, incident detail, tabs,
  owner assignment, escalation, provider contact, customer status, resolution,
  RCA, audit log, role selector, reset; simulated = all data, timestamps,
  provider responses and state transitions (local state only); a real build
  would need event ingestion, transaction-state reconciliation, vendor APIs /
  webhooks, SLA timers, RBAC and a durable audit store.
- **OBSERVED:** the consumer journeys, transaction-heavy product, reliance on
  external charging / payment / data partners, and the specific failure points —
  all carried from §3 public review evidence + public MyMotor product facts.
- **INFERRED:** the possible diagnostic signals in each scenario
  (`Callout kind="inferred"` "not confirmed ZOOP architecture").
- **PROPOSED / CONCEPTUAL / ILLUSTRATIVE:** the entire prototype — the workflow,
  the incident state model, the role model + approval flow, the action set, the
  audit log, the severity handling, the RCA / closure flow, every screen and
  every data value.
- **Static blocks (after later structural trims):** `OtherScenarios` — now a
  single merged section "The same workflow, different failures": eyebrow +
  heading + a short lead (`OTHER_SCENARIOS_LEAD`) + the 4 scenario cards
  (select + scroll), then a compact "Design principles" row of 5 outline
  `Pill`s (`DESIGN_PRINCIPLES`, titles only — the longer per-principle
  descriptions were dropped); `PrototypeClosing` ("Building products that work
  when the real world gets messy." + Back to overview / View prototype again).
  **Removed across trims:** `PrototypeHighlights` (the "What this prototype
  demonstrates" heading + 4 highlight cards — `HIGHLIGHTS` data deleted) and the
  standalone `DesignPrinciples`, `ControlTowerMapping` (§5→§6 mapping table),
  `WhatThisShows` ("From analysis to a working experience" + central quote),
  `FinalTakeaways` ("A more reliable EV future" dark band), `CaseStudySummary`
  (01→06 recap), and `ProductionValidation`.
- **Components:** `PrototypeSection` (orchestrator) · `PrototypeHero` +
  `PrototypeHeroVisual` (light laptop + phone conceptual mockup, generic tokens) ·
  `PrototypeIntro` · `PrototypeStage` (`id="prototype-app"`) + `ScenarioBar`
  (scenario `<select>` + role tabs + reset) + `ScenarioStepper` + `DetectPanel` +
  `IncidentDetailPanel` + `ActionPanel` + `ResolvePanel` + `LearnPanel` +
  `AuditLogPanel` (sticky rail) + `StageModals` · `OtherScenarios` (merged, see
  above) · `PrototypeClosing`. Data + copy in `_data.ts`, reducer in
  `_state.ts`, `STATUS_TONE` + `scrollToApp` in `_shared.ts`, hero slot in
  `_assets.ts`.
- **Reused primitives only** — `Tabs` (controlled, `variant="pill"`), `Modal`,
  `DataTable`, `Timeline`, `Callout`, `Pill`, `Button`, `Eyebrow`, `Container`,
  `ScrollReveal`, `Icon`. **No new shared components, no new icons, no new chart
  primitives, no token changes.**
- **Dark mode:** light-primary throughout — hero visual + interactive stage use
  generic tokens (map via the fixed `--dark-*` palette). No forced-dark band any
  more (`FinalTakeaways` was removed). `npm run contrast` passes unchanged.
- **Verification:** `tsc --noEmit` clean · `vite build` clean · `npm run contrast`
  all-pass · route smoke (9 routes; `/prototype` ~53 KB vs the ~10 KB placeholder;
  Sections 1–5 unchanged) · a state-machine smoke (`scripts/proto-smoke.tsx`,
  removed after) rendered ~100 states across all 5 scenarios × every step / modal
  / approval branch — all pass.

---

### Copy + data-consistency pass — 2026-09-08 (post Section 06)

Text-and-illustrative-data-only corrections from a full review of the built case
study. No layout / component / token / interaction changes.

- **Landing:** hero "A worked case study" → "An independent case study"; card
  block-count label "N planned blocks" → "N blocks"; bottom CTA "Section 01 ·
  Context" → "Start with Context".
- **§1 Context:** removed the duplicate section-level "Conceptual ecosystem"
  `Pill` in `EcosystemSection` (the label stays on the `DiagramFrame`);
  "Across 3K+ locations in India" → "3K+ charging stations in India"; consumer
  card point "Easy & secure payments" → "EV wallet & charging payments" (+ the
  matching sample in `/styleguide`); freight-card toggle "Why consumer-only?" →
  "Why this focus?".
- **§2 Journey:** stage 06 "Complete" → "Complete & pay" (+ desc); all 12
  breakpoint / dependency-risk labels reworded to "Potential …" hypotheticals;
  phone-mockup "Statiq · ChargeZone" → "EV charging station" (details kept).
- **§3 Feedback:** `ThemesGrid` title → "Recurring themes from user reviews";
  `VOICES_HEADER` title → "Representative user feedback" (+ lead); per-card
  source label "Google Play + App Store" → "Public app-store review" (no
  per-review platform data exists; aggregate corpus mentions kept). No new
  numbers; paraphrase disclosures + credibility labels unchanged.
- **§4 Reliability:** `TAKEAWAYS_HEADER` 2nd sentence → "…should reduce friction,
  improve user trust and create a more reliable customer experience." (The
  `JourneyRisk` "Where reliability matters across the journey" 6-stage block was
  briefly realigned to match §2, then removed entirely in a later trim — along
  with `JOURNEY_STAGES` / `JOURNEY_HEADER` / `RISK_META`.) Prioritization
  (`PriorityPlot`) unchanged.
- **§5 Control Tower:** dashboard `<h2>` → "Proposed Reliability Control Tower";
  `JOB.lead` "…the right person taking the right action." → "…the right action
  being taken."; single illustrative dataset — `KPIS` already
  12,480 / 96.8% / 401 / 7 / 14 / 86; `ISSUES_BY_CATEGORY` → counts
  157 / 112 / 68 / 44 / 20 (= 401), donut legend shows counts not `%`; hero
  mockup tiles → Active incidents 7 / Customers impacted 86 / Success rate 96.8%
  (MTTR kept), mini-donut → 401 exceptions with matching splits; "N users" →
  "N customers" across transaction / exception / impact / escalation rows (kept
  "1 customer", "7 searches affected"). `ISSUES_BY_REGION`, `TREND`, `VENDOR_*`
  and `IMPACT_ROWS.stage` tags left untouched (not in the stated dataset).
- **§6 Prototype:** highlight "Realistic data" → "Illustrative data";
  "Responsive design" → "Responsive experience" (+ desc). Disclaimers already
  consistent.

---

### Working commands

```
npm install          # deps
npm run dev           # local dev server
npm run build         # tsc --noEmit + vite build -> dist/
npm run preview       # serve the built dist/
npm run contrast      # WCAG audit of the dark-theme token pairs
npm run typecheck     # tsc --noEmit only
```

Route `/styleguide` renders every primitive in both themes — use it to QA visual
consistency after each section.
