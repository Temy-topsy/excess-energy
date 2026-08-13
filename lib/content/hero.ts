import homeHeroDesktop from "@/public/images/hero/home-hero-desktop.jpg";
import homeHeroMobile from "@/public/images/hero/home-hero-mobile.jpg";
import type { StaticImageData } from "next/image";

export interface HeroMedia {
  desktopSrc: StaticImageData;
  mobileSrc: StaticImageData;
  alt: string;
}

export const hero = {
  headline: "Power Beyond Limits.",
  subheading:
    "Reliable energy solutions for homes, businesses & more",
  subheadingShort:
    "Reliable energy solutions for homes, businesses & more",
  media: {
    desktopSrc: homeHeroDesktop,
    mobileSrc: homeHeroMobile,
    alt: "Professional energy solutions by Excess Energy",
  } satisfies HeroMedia,
} as const;