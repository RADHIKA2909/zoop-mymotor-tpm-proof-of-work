/**
 * Asset-slot registry for Section 1.
 *
 * Every image the section *could* use is declared here. `src: null` -> the
 * component renders its built-in conceptual CSS/SVG fallback (clearly captioned
 * as conceptual). To use a real, rights-cleared asset later:
 *   1. drop the file in `src/assets/`
 *   2. set `src` here, e.g.
 *        src: new URL('../../assets/hero-ev-charging.jpg', import.meta.url).href
 * No component changes needed.
 */
export interface AssetSlot {
  src: string | null
  alt: string
  /** Caption shown while the conceptual fallback is in use. */
  conceptualCaption: string
}

export const ASSETS: Record<
  'hero' | 'freight' | 'consumer' | 'capabilityPhone',
  AssetSlot
> = {
  hero: {
    src: null,
    alt: 'An EV charging at a ZOOP station while the driver checks chargers in the MyMotor app',
    conceptualCaption: 'Conceptual — MyMotor EV Charging Hub',
  },
  freight: {
    src: null,
    alt: 'An electric heavy-duty truck at a fleet charging hub',
    conceptualCaption: 'Conceptual illustration',
  },
  consumer: {
    src: null,
    alt: 'An EV owner using the MyMotor app beside their car at a charging point',
    conceptualCaption: 'Conceptual illustration',
  },
  capabilityPhone: {
    src: null,
    alt: 'The MyMotor app home screen',
    conceptualCaption: 'Conceptual app mockup',
  },
}
