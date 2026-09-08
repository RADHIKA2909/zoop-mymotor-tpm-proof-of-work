/**
 * Asset-slot registry for Section 6. `src: null` -> conceptual CSS/SVG fallback.
 */
export interface AssetSlot {
  src: string | null
  alt: string
  conceptualCaption: string
}

export const ASSETS: Record<'heroMock', AssetSlot> = {
  heroMock: {
    src: null,
    alt: 'A conceptual interactive prototype of the reliability control tower',
    conceptualCaption: 'Conceptual prototype — not internal ZOOP software.',
  },
}
