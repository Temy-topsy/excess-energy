import solarTeam from "@/public/images/hero/solar-install-team.jpg";
import type { StaticImageData } from "next/image";
import {
  Target,
  Eye,
  Scale,
  Award,
  Lightbulb,
  ShieldCheck,
  HeartHandshake,
  Leaf,
  HardHat,
  BadgeCheck,
  Headset,
  Gauge,
  MapPin,
  Globe,
  type LucideIcon,
} from "lucide-react";

/**
 * All About page content as data, the same pattern the rest of the site uses.
 * Copy lives here so each section stays a layout over content, and the page
 * grows or changes voice without touching markup. Every claim is qualitative or
 * already approved elsewhere (the one year warranty, 24/7 support, current
 * coverage). No figures, savings, or testimonials are invented.
 */

/** An icon, a short title, and one supporting line. Shared by the values grid
 * and the strengths list so both read from one shape. */
export interface AboutFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface AboutStatement {
  icon: LucideIcon;
  label: string;
  statement: string;
}

export const aboutHero = {
  overline: "About Excess Energy",
  heading: "Power your home and business can count on.",
  description:
    "Excess Energy is a Nigerian clean energy company. We design, install, and maintain solar and battery systems that free homes and businesses from unreliable grid power and the cost of running generators.",
  media: {
    src: solarTeam as StaticImageData,
    alt: "Excess Energy technicians installing a rooftop solar array",
  },
} as const;

export const companyStory = {
  overline: "Our story",
  heading: "Built to make reliable power the standard.",
  paragraphs: [
    "Excess Energy exists for a simple reason: power should be something you can depend on. Too many homes and businesses still plan their day around outages and the cost and noise of a generator.",
    "We design, install, and maintain clean energy systems that change that. Every system is sized to real needs, built with premium components, and installed by trained technicians who stand behind their work.",
    "The result is dependable, affordable power and far less reliance on the grid or the generator. That is the standard we hold on every project, residential or commercial.",
  ],
} as const;

export const missionVision: AboutStatement[] = [
  {
    icon: Target,
    label: "Mission",
    statement:
      "Deliver reliable, affordable and sustainable energy solutions backed by professional installation and long-term support.",
  },
  {
    icon: Eye,
    label: "Vision",
    statement:
      "Become one of Africa's leading clean energy companies through innovation, quality and customer trust.",
  },
];

export const coreValues: AboutFeature[] = [
  {
    icon: Scale,
    title: "Integrity",
    description:
      "We quote honestly and recommend only what your situation genuinely needs.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We choose durable panels, inverters, and batteries, and install them to last.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We keep improving our systems and methods as clean energy technology advances.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description:
      "We build for uptime, so your power holds steady long after installation day.",
  },
  {
    icon: HeartHandshake,
    title: "Customer first",
    description:
      "We design around your needs and budget, and stay reachable after handover.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "We help you lean less on the grid and on generators, cleanly and quietly.",
  },
];

export const whyExcess: AboutFeature[] = [
  {
    icon: HardHat,
    title: "Professional installation",
    description:
      "Trained technicians install every system safely and to standard.",
  },
  {
    icon: Award,
    title: "Premium components",
    description:
      "Durable panels, inverters, and batteries chosen to last for years.",
  },
  {
    icon: BadgeCheck,
    title: "1 year warranty",
    description:
      "Every installation is backed by a full one year warranty on our work.",
  },
  {
    icon: Headset,
    title: "Ongoing support",
    description:
      "Support and maintenance stay available 24/7 after your system is live.",
  },
  {
    icon: Gauge,
    title: "Energy efficiency",
    description:
      "Systems sized to your real usage, so nothing is oversold or wasted.",
  },
  {
    icon: MapPin,
    title: "Serving Ogun, Lagos & Ibadan",
    description: "Local teams across the regions we currently cover.",
  },
  {
    icon: Globe,
    title: "Nationwide expansion",
    description: "Projects available beyond our core regions, on request.",
  },
];
