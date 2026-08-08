import solarTeam from "@/public/images/hero/solar-install-team.jpg";
import type { StaticImageData } from "next/image";

/**
 * Hero content lives here as data, the same pattern the rest of the site uses
 * for nav, services, and company facts. Copy and imagery are edited in one
 * place, and the layout never changes when they do.
 *
 * The media is a static import so next/image ships an automatic blur placeholder
 * and correct dimensions with no layout shift. To swap the photograph, drop a
 * file in public/images/hero and change the import above; nothing else moves.
 * `videoSrc` is reserved: when a background video is ready, set it and the media
 * layer prefers it over the still, so this stays a one line change too.
 */

export interface HeroMedia {
  /** Still image. A static import also supplies its own blur placeholder. */
  src: StaticImageData;
  alt: string;
  /** Short, factual caption shown on the overlay card. Not a marketing claim. */
  caption: string;
  /** Reserved for a future hero background video. */
  videoSrc?: string;
}

export const hero = {
  /** Category kicker. Sets what we do in the first glance. */

  headline: "Power that outlasts the grid.",
  subheading:
    "We design, install, and maintain premium solar and battery systems for homes and businesses. Reliable power and lasting savings, professionally delivered.",
  /** Tighter line for the mobile first screen, where vertical space is scarce. */
  subheadingShort:
    "Premium solar and battery systems, professionally installed for reliable power and lasting savings.",
  media: {
    src: solarTeam,
    alt: "Technicians installing rooftop solar panels against a clear sky",
    caption: "Rooftop solar and battery storage",
  } satisfies HeroMedia,
} as const;
