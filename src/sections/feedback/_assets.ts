/**
 * Asset-slot registry for Section 3 (same pattern as Sections 1–2).
 * `src: null` -> the component renders its conceptual CSS/SVG fallback.
 */
export interface AssetSlot {
  src: string | null
  alt: string
  conceptualCaption: string
}

export const ASSETS: Record<'heroPhone', AssetSlot> = {
  heroPhone: {
    src: null,
    alt: 'The MyMotor app on a phone next to an EV',
    conceptualCaption: 'Conceptual — MyMotor app',
  },
}
