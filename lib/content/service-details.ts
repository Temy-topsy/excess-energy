import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import {
  Award,
  Gauge,
  Layers,
  Leaf,
  Moon,
  Server,
  ShieldCheck,
  Smartphone,
  Sun,
  TrendingDown,
  Video,
  Wallet,
  Zap,
} from "lucide-react";

import solarResidential from "@/public/images/hero/solar-install-residential.jpg";
import solarTeam from "@/public/images/hero/solar-install-team.jpg";
import { getServiceBySlug } from "./services";
import type { Service } from "./types";

/**
 * The long form content for each service, keyed by the same slug as the base
 * Service in services.ts. That file stays the single source for a service's
 * name, icon, and short description; this file adds only the detail a service
 * page needs. Adding a future service page is a matter of adding one entry
 * here once its base Service is marked available.
 *
 * Copy stays factual and qualitative. No performance figures, savings
 * percentages, or testimonials are invented; the one year warranty is the only
 * hard claim and it is already approved across the site.
 */

export interface ServiceBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: string;
  /**
   * Optional hero photograph. A static import supplies its own blur
   * placeholder. Omit it to render the branded icon placeholder instead, which
   * is how services without fitting photography ship today.
   */
  coverImage?: StaticImageData;
  coverAlt?: string;
  /** Long form overview, one entry per paragraph. */
  overview: string[];
  benefits: ServiceBenefit[];
  /** What the service includes, as concrete deliverables. */
  included: string[];
  /** Who the service is a fit for. */
  idealFor: string[];
  faq: ServiceFaq[];
  /** Slugs of related available services, resolved to cards. */
  related: string[];
  seo: { title: string; description: string };
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "excess-solar": {
    slug: "excess-solar",
    coverImage: solarResidential,
    coverAlt: "A residential rooftop solar installation",
    overview: [
      "Excess Solar is a complete rooftop solar service for homes and businesses. We assess how you use energy, design a system sized to that demand, then install the panels, inverter, and mounting that bring it to life.",
      "The result is clean power through the day, lower energy bills, and far less dependence on the grid and the generator. Paired with battery storage, that power carries into the evening and through outages.",
    ],
    benefits: [
      {
        icon: Wallet,
        title: "Lower energy bills",
        description:
          "Generate your own power through the day and cut what you spend on the grid and on fuel.",
      },
      {
        icon: ShieldCheck,
        title: "Power through outages",
        description:
          "Keep essential appliances running when the grid goes down, especially with storage added.",
      },
      {
        icon: Leaf,
        title: "Clean and quiet",
        description:
          "Silent operation with no fumes, unlike a generator running for hours at a time.",
      },
      {
        icon: Award,
        title: "Built to last",
        description:
          "Durable panels and inverters, installed to a standard that holds up for years.",
      },
    ],
    included: [
      "Site assessment and energy needs analysis",
      "Custom system design and sizing",
      "Supply of solar panels, inverter, and mounting",
      "Professional installation and commissioning",
      "System walkthrough and handover",
      "One year warranty on our workmanship",
    ],
    idealFor: [
      "Homeowners tired of outages and rising generator costs",
      "Businesses with steady daytime energy use",
      "Schools, clinics, and places of worship",
      "New builds planning for clean power from the start",
    ],
    faq: [
      {
        question: "How long does a solar installation take?",
        answer:
          "Most homes are completed within a few days once the assessment and design are approved. Larger systems take longer, and we share a clear schedule before any work begins.",
      },
      {
        question: "Will solar power my whole building?",
        answer:
          "We size each system around your priorities and budget. Many customers cover their essential loads first and expand later. With enough panels and storage, solar can carry you through outages.",
      },
      {
        question: "Do I still need the grid or a generator?",
        answer:
          "Solar reduces how much you lean on both. With sufficient panels and storage, some customers rarely run a generator, though we design around your specific needs rather than promise a fixed result.",
      },
      {
        question: "What maintenance does a solar system need?",
        answer:
          "Very little. Occasional panel cleaning and periodic checks keep it performing, and we stay available for support long after handover.",
      },
    ],
    related: ["battery-storage", "inverter-installation", "commercial-solar"],
    seo: {
      title: "Excess Solar | Solar Design and Installation",
      description:
        "Reliable solar systems for homes and businesses, sized to your real energy needs. Clean daytime power and less reliance on the grid across Ogun, Lagos, and Ibadan.",
    },
  },

  "inverter-installation": {
    slug: "inverter-installation",
    overview: [
      "Our inverter installation service gives your home or business dependable backup power. We supply the right inverter for your load, wire it cleanly, and set it to switch over the moment the grid fails.",
      "The changeover is seamless, so lights, fans, and essential appliances stay on without interruption. Every system is built to expand later with solar panels and extra batteries as your needs grow.",
    ],
    benefits: [
      {
        icon: Zap,
        title: "Seamless backup",
        description:
          "Keep essential appliances running the moment the grid drops, with no manual switching.",
      },
      {
        icon: Gauge,
        title: "Sized to your load",
        description:
          "We match the inverter to what you actually run, so nothing is undersized or wasted.",
      },
      {
        icon: ShieldCheck,
        title: "Clean, safe wiring",
        description:
          "Tidy, standards-based installation that protects your appliances and your home.",
      },
      {
        icon: Layers,
        title: "Ready to expand",
        description:
          "Start with backup today and add solar and storage later without replacing the core.",
      },
    ],
    included: [
      "Load assessment and inverter sizing",
      "Supply of the inverter and compatible batteries",
      "Professional installation and changeover setup",
      "Safety checks and full system testing",
      "Usage walkthrough and handover",
      "One year warranty on our workmanship",
    ],
    idealFor: [
      "Homes that need reliable backup during outages",
      "Small businesses protecting essential equipment",
      "Anyone reducing how often they run a generator",
    ],
    faq: [
      {
        question: "What size inverter do I need?",
        answer:
          "It depends on the appliances you want to run and for how long. We assess your load during the site visit and recommend a size that fits both your needs and your budget.",
      },
      {
        question: "Can I add solar to my inverter later?",
        answer:
          "Yes. We install systems that expand with solar panels and extra batteries, so you can begin with backup and grow into full solar over time.",
      },
      {
        question: "How long will the batteries last in an outage?",
        answer:
          "Runtime depends on your battery capacity and how much you draw. We size the system around the loads you tell us matter most.",
      },
    ],
    related: ["battery-storage", "excess-solar", "commercial-solar"],
    seo: {
      title: "Inverter Installation | Reliable Backup Power",
      description:
        "Professional inverter supply and installation for uninterrupted power through outages, sized to your load and built to expand across Ogun, Lagos, and Ibadan.",
    },
  },

  "battery-storage": {
    slug: "battery-storage",
    overview: [
      "Battery storage banks the energy your system produces or draws from the grid, then releases it when you need it most. We supply and install quality batteries matched to your inverter and your usage.",
      "That means power stays on through outages, and the solar you generate by day is there to use after dark. Capacity is modular, so you can start with what you need and add more as your usage grows.",
    ],
    benefits: [
      {
        icon: ShieldCheck,
        title: "Power through outages",
        description:
          "Store energy and keep essential loads running when the grid goes down.",
      },
      {
        icon: Sun,
        title: "More from your solar",
        description:
          "Capture daytime solar you would otherwise lose and use it in the evening.",
      },
      {
        icon: Zap,
        title: "Quiet and instant",
        description:
          "Silent, immediate backup with no start-up delay and none of a generator's fumes.",
      },
      {
        icon: Layers,
        title: "Scalable capacity",
        description:
          "Begin with the capacity you need and add more as your demand increases.",
      },
    ],
    included: [
      "Usage assessment and capacity sizing",
      "Supply of quality batteries matched to your system",
      "Professional installation and integration",
      "Testing and safety checks",
      "Handover and usage guidance",
      "One year warranty on our workmanship",
    ],
    idealFor: [
      "Solar owners who want power after dark",
      "Homes and businesses in outage-prone areas",
      "Anyone cutting down on generator run time",
    ],
    faq: [
      {
        question: "Which batteries do you install?",
        answer:
          "We select from quality batteries suited to your inverter and usage. During the assessment we recommend the type and capacity that fit your needs and budget.",
      },
      {
        question: "Can I add storage to an existing system?",
        answer:
          "In many cases yes. We review your current inverter and setup, then advise on compatible batteries and any changes needed to integrate them.",
      },
      {
        question: "How much backup will I get?",
        answer:
          "That depends on your battery capacity and the loads you run. We size storage around the appliances you tell us are essential.",
      },
    ],
    related: ["excess-solar", "inverter-installation", "commercial-solar"],
    seo: {
      title: "Battery Storage | Store Energy, Stay Powered",
      description:
        "Quality battery storage that banks your energy so power stays on when the grid does not. Matched to your system and installed across Ogun, Lagos, and Ibadan.",
    },
  },

  "commercial-solar": {
    slug: "commercial-solar",
    coverImage: solarTeam,
    coverAlt: "An Excess Energy team installing a solar system",
    overview: [
      "Commercial Solar is our end to end service for businesses and institutions that cannot afford unreliable power. We handle the engineering from first assessment through design, installation, and commissioning.",
      "The aim is dependable energy that lowers running costs and reduces the hours spent on diesel. Systems are built to scale with your operation and to keep critical loads online when the grid cannot.",
    ],
    benefits: [
      {
        icon: TrendingDown,
        title: "Lower running costs",
        description:
          "Cut energy spend and reduce the hours spent running on expensive diesel.",
      },
      {
        icon: ShieldCheck,
        title: "Dependable uptime",
        description:
          "Keep critical operations powered so outages cost you less in lost work.",
      },
      {
        icon: Layers,
        title: "Scales with you",
        description:
          "Designed to grow alongside your operation, from a single site to many.",
      },
      {
        icon: Leaf,
        title: "Cleaner operations",
        description:
          "Move toward quieter, cleaner energy and away from constant generator use.",
      },
    ],
    included: [
      "Energy audit and load profiling",
      "Engineered system design and sizing",
      "Supply of commercial grade panels, inverters, and storage",
      "Project managed installation and commissioning",
      "Testing, handover, and staff walkthrough",
      "One year warranty on our workmanship",
    ],
    idealFor: [
      "Offices, retail, and hospitality businesses",
      "Schools, clinics, and institutions",
      "Factories and workshops with steady demand",
      "Estates and facilities managing shared power",
    ],
    faq: [
      {
        question: "Can solar meet our business demand?",
        answer:
          "We profile your load and design around it. Many businesses cover core daytime demand with solar and add storage for critical loads, and we scope each project to your specific operation.",
      },
      {
        question: "Will installation disrupt our operations?",
        answer:
          "We plan the work around your schedule and stage it to limit disruption. You get a clear timeline and scope before we begin.",
      },
      {
        question: "Can the system expand across multiple sites?",
        answer:
          "Yes. We design commercial systems to scale, whether that means growing capacity at one location or extending to additional sites over time.",
      },
    ],
    related: ["excess-solar", "battery-storage", "solar-street-lights"],
    seo: {
      title: "Commercial Solar | Energy for Business at Scale",
      description:
        "End to end commercial solar for businesses and institutions that need dependable, cost cutting power. Engineered, installed, and supported across Ogun, Lagos, and Ibadan.",
    },
  },

  "cctv-systems": {
    slug: "cctv-systems",
    overview: [
      "Our CCTV service keeps your home or business watched around the clock. We survey the site, supply professional cameras and recording equipment, and position everything for full coverage with no blind spots.",
      "You get clear footage, reliable recording, and remote viewing from your phone, so you can check in whether you are in the next room or another city.",
    ],
    benefits: [
      {
        icon: Video,
        title: "Around the clock coverage",
        description:
          "Keep eyes on your property day and night, indoors and out.",
      },
      {
        icon: Smartphone,
        title: "View from anywhere",
        description:
          "Watch live and recorded footage from your phone or computer, wherever you are.",
      },
      {
        icon: ShieldCheck,
        title: "Deterrence and evidence",
        description:
          "Visible cameras discourage intruders and capture clear footage when it matters.",
      },
      {
        icon: Server,
        title: "Reliable recording",
        description:
          "Continuous recording so events are captured and stored for later review.",
      },
    ],
    included: [
      "Site survey and camera placement plan",
      "Supply of cameras and recording equipment",
      "Professional installation and cabling",
      "Remote viewing setup on your devices",
      "Testing and walkthrough",
      "One year warranty on our workmanship",
    ],
    idealFor: [
      "Homes and residential estates",
      "Shops, offices, and warehouses",
      "Sites that need monitoring around the clock",
    ],
    faq: [
      {
        question: "Can I view the cameras from my phone?",
        answer:
          "Yes. We set up remote viewing so you can watch live and recorded footage from your phone or computer.",
      },
      {
        question: "How long is footage stored?",
        answer:
          "Storage depends on the recorder and drive capacity you choose. We recommend a setup that keeps enough footage for your needs.",
      },
      {
        question: "Do the cameras work at night?",
        answer:
          "We install cameras suited to your site, including night vision where it is needed for clear footage in low light.",
      },
    ],
    related: ["solar-street-lights", "excess-solar", "battery-storage"],
    seo: {
      title: "CCTV Systems | Monitored Around the Clock",
      description:
        "Professional CCTV supply and installation with full coverage and remote viewing, keeping your home or business monitored around the clock.",
    },
  },

  "solar-street-lights": {
    slug: "solar-street-lights",
    overview: [
      "Solar street lighting brings reliable light to estates, roads, and compounds without a grid connection. Each unit generates and stores its own power by day and lights automatically at night.",
      "There is no trenching, no wiring back to the grid, and no running cost. We survey the site, plan the layout, and install the units for even, dependable coverage after dark.",
    ],
    benefits: [
      {
        icon: Wallet,
        title: "No running cost",
        description:
          "Each light runs on its own solar power, with nothing owed to the grid.",
      },
      {
        icon: Sun,
        title: "Grid-free install",
        description:
          "Standalone units mean no trenching or grid connection to arrange.",
      },
      {
        icon: Moon,
        title: "Automatic lighting",
        description:
          "Lights come on at dusk and switch off at dawn on their own, every night.",
      },
      {
        icon: ShieldCheck,
        title: "Safer spaces",
        description:
          "Well lit roads, estates, and compounds that feel safer after dark.",
      },
    ],
    included: [
      "Site survey and lighting layout",
      "Supply of solar street light units",
      "Professional installation and positioning",
      "Testing and handover",
      "One year warranty on our workmanship",
    ],
    idealFor: [
      "Estates and residential compounds",
      "Roads, streets, and walkways",
      "Schools, factories, and institutions",
    ],
    faq: [
      {
        question: "Do solar street lights work in the rainy season?",
        answer:
          "Yes. Each unit stores energy through the day, including cloudy conditions, and we size them to keep lighting reliable across seasons.",
      },
      {
        question: "Is there really no running cost?",
        answer:
          "Correct. Each light runs entirely on its own solar power, so there is no grid connection and no electricity bill for them.",
      },
      {
        question: "How are they maintained?",
        answer:
          "They need very little upkeep. Occasional cleaning keeps the panels efficient, and we stay available for support after installation.",
      },
    ],
    related: ["excess-solar", "cctv-systems", "commercial-solar"],
    seo: {
      title: "Solar Street Lights | Light Streets Without the Grid",
      description:
        "Standalone solar street lighting for estates, roads, and compounds, with automatic dusk to dawn operation and zero running cost.",
    },
  },
};

/** The detail content for a slug, or undefined if the service has no page yet. */
export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}

/** Every slug that has a detail page, for generateStaticParams. */
export function getServiceDetailSlugs(): string[] {
  return Object.keys(serviceDetails);
}

/** Resolve related slugs to their base Service records, skipping any unknown. */
export function getRelatedServices(slugs: string[]): Service[] {
  return slugs
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is Service => Boolean(service));
}
