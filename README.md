# ZOOP × MyMotor — Technical Product Manager Proof of Work

An interactive product case study:
**"Understanding MyMotor's Consumer Journey and Designing for Reliable Transactions."**

Built for a ZOOP Energy TPM interview from **public product information and the role
description only**. Not affiliated with, endorsed by, or based on internal
information from ZOOP Energy or MyMotor.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other commands:

```bash
npm run build      # tsc --noEmit + vite build  ->  dist/
npm run preview     # serve the production build
npm run typecheck   # types only
```

## Stack

- Vite + React 18 + TypeScript
- React Router v7 (SPA)
- CSS Modules + a single design-token file (`src/styles/tokens.css`)
- Hand-built SVG charts (no charting library)
- Self-hosted Inter + Caveat (`@fontsource`)

## Structure

| Path | What |
|---|---|
| `src/data/` | IA / nav model (`sections.ts`), public facts + sources (`company.ts`), claim labels (`claims.ts`) |
| `src/components/ui/` | Reusable primitives (barrel: `index.ts`) |
| `src/components/layout/` | Shell, top nav, footer, section scaffold |
| `src/components/charts/` | SVG chart primitives |
| `src/components/diagrams/` | `PhoneFrame`, `NodeFlow` (bespoke diagrams added per section) |
| `src/sections/` | One file per route |
| `/styleguide` | Internal design-system reference (every primitive, both themes) |

## The six sections

`01 Context · 02 Journey · 03 Feedback · 04 Reliability · 05 Control Tower · 06 Prototype`

Each currently shows its **planned contents** — sections are built one at a time
from their own detailed brief. See [`CLAUDE.md`](./CLAUDE.md) for the full project
memory, content rules, and the workflow for adding a section.

## Deploy

`vercel.json` is included (SPA rewrite). `vercel deploy` — or point any static host
at `dist/` with an SPA fallback to `index.html`.

## Honesty model

Every non-trivial claim in the built sections is labelled: **Observed** (public
evidence) · **Inferred** (a read of that evidence) · **Proposed** (what the TPM would
build) · **Assumption** (a working assumption — never a ZOOP fact). Proposed
architecture diagrams always carry a "not internal architecture" disclaimer.
