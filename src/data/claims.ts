/**
 * The honesty system for this case study. Every non-trivial statement in the
 * built sections should be attributable to one of these:
 *
 *   OBSERVED    — something users publicly said, or public product copy / data.
 *   INFERRED    — a reasonable read of the observed evidence (clearly a step
 *                 beyond what was literally said).
 *   PROPOSED    — what Radhika would build / do as the TPM.
 *   ASSUMPTION  — a working assumption made to move forward (e.g. "assume a
 *                 payment gateway sits between the app and the bank rails").
 *   SOURCE      — a citation / link to a public reference.
 *
 * Nothing labelled INFERRED / PROPOSED / ASSUMPTION may be presented as an
 * internal ZOOP fact.
 */
export type ClaimKind =
  | 'observed'
  | 'inferred'
  | 'proposed'
  | 'assumption'
  | 'source'

export interface ClaimMeta {
  label: string
  /** One-line description shown in the landing-page legend. */
  blurb: string
}

export const CLAIM_META: Record<ClaimKind, ClaimMeta> = {
  observed: {
    label: 'Observed',
    blurb: 'What users publicly said, or public product copy and data.',
  },
  inferred: {
    label: 'Inferred',
    blurb: 'A reasonable read of the evidence — a step beyond the literal words.',
  },
  proposed: {
    label: 'Proposed',
    blurb: 'What I would build or do as the Technical Product Manager.',
  },
  assumption: {
    label: 'Assumption',
    blurb: 'A working assumption made to move forward. Not a ZOOP fact.',
  },
  source: {
    label: 'Source',
    blurb: 'A citation or link to a public reference.',
  },
}

export const CLAIM_ORDER: ClaimKind[] = [
  'observed',
  'inferred',
  'proposed',
  'assumption',
]
