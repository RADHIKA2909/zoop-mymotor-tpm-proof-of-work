/**
 * Asset-slot registry for Section 5. `src: null` -> conceptual CSS/SVG fallback.
 */
export interface AssetSlot {
  src: string | null
  alt: string
  conceptualCaption: string
}

export const ASSETS: Record<'heroDashboard', AssetSlot> = {
  heroDashboard: {
    src: null,
    alt: 'A conceptual reliability control-tower dashboard',
    conceptualCaption: 'Conceptual dashboard mockup',
  },
}
