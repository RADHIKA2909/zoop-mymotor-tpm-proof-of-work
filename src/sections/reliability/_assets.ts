/**
 * Asset-slot registry for Section 4 (same pattern as Sections 1–3).
 * `src: null` -> the component renders its conceptual CSS/SVG fallback.
 */
export interface AssetSlot {
  src: string | null
  alt: string
  conceptualCaption: string
}

export const ASSETS: Record<'heroScene', AssetSlot> = {
  heroScene: {
    src: null,
    alt: 'An EV charging at a ZOOP station with the MyMotor app open',
    conceptualCaption: 'Conceptual — MyMotor + charging context',
  },
}
