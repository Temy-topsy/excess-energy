import {
  BatteryCharging,
  Building2,
  Cctv,
  Gauge,
  HousePlug,
  CarFront,
  Factory,
  LampCeiling,
  Plug,
  ShieldCheck,
  Sun,
} from "lucide-react";

import type { Service } from "./types";

/**
 * Every service, current and future, as data. The status flag decides whether
 * a ServiceCard renders live or as Coming Soon, so new services appear without
 * a redesign. Order is intentional: strongest offerings first.
 */
export const services: Service[] = [
  {
    slug: "excess-solar",
    name: "Excess Solar",
    shortName: "Solar",
    tagline: "Clean power for every roof",
    description:
      "Design and installation of reliable residential and commercial solar systems, sized to your real energy needs.",
    status: "available",
    icon: Sun,
    href: "/services/excess-solar",
  },
  {
    slug: "inverter-installation",
    name: "Inverter Installation",
    shortName: "Inverters",
    tagline: "Seamless backup power",
    description:
      "Professional inverter supply and installation for uninterrupted power through outages, built to last.",
    status: "available",
    icon: Plug,
    href: "/services/inverter-installation",
  },
  {
    slug: "battery-storage",
    name: "Battery Storage",
    shortName: "Storage",
    tagline: "Store energy, stay powered",
    description:
      "High quality battery storage that banks your energy so power stays on when the grid does not.",
    status: "available",
    icon: BatteryCharging,
    href: "/services/battery-storage",
  },
  {
    slug: "commercial-solar",
    name: "Commercial Solar",
    shortName: "Commercial",
    tagline: "Energy for business at scale",
    description:
      "End to end commercial solar for businesses and institutions that need dependable, cost cutting power.",
    status: "available",
    icon: Building2,
    href: "/services/commercial-solar",
  },
  {
    slug: "cctv-systems",
    name: "CCTV Systems",
    shortName: "CCTV",
    tagline: "See everything, always",
    description:
      "Professional CCTV supply and installation to keep your home or business monitored around the clock.",
    status: "available",
    icon: Cctv,
    href: "/services/cctv-systems",
  },
  {
    slug: "solar-street-lights",
    name: "Solar Street Lights",
    shortName: "Street Lights",
    tagline: "Light streets without the grid",
    description:
      "Standalone solar street lighting for estates, roads, and compounds, with zero running cost.",
    status: "available",
    icon: LampCeiling,
    href: "/services/solar-street-lights",
  },

  // Future services. Architected now, shown as Coming Soon, built later.
  {
    slug: "excess-cctv",
    name: "Excess CCTV",
    shortName: "Excess CCTV",
    tagline: "Next generation security",
    description:
      "An expanded, integrated security platform building on our CCTV installations.",
    status: "coming-soon",
    icon: ShieldCheck,
    href: "/services/excess-cctv",
  },
  {
    slug: "excess-smart-homes",
    name: "Excess Smart Homes",
    shortName: "Smart Homes",
    tagline: "Intelligent, connected living",
    description:
      "Smart home automation that unifies energy, security, and comfort in one system.",
    status: "coming-soon",
    icon: HousePlug,
    href: "/services/excess-smart-homes",
  },
  {
    slug: "excess-ev",
    name: "Excess EV",
    shortName: "EV",
    tagline: "Charge the future",
    description:
      "Electric vehicle charging solutions powered by clean energy, for homes and businesses.",
    status: "coming-soon",
    icon: CarFront,
    href: "/services/excess-ev",
  },
  {
    slug: "excess-energy-monitoring",
    name: "Excess Energy Monitoring",
    shortName: "Monitoring",
    tagline: "Know every watt",
    description:
      "Real time energy monitoring that turns your system data into clear, actionable insight.",
    status: "coming-soon",
    icon: Gauge,
    href: "/services/excess-energy-monitoring",
  },
  {
    slug: "excess-industrial-solutions",
    name: "Excess Industrial Solutions",
    shortName: "Industrial",
    tagline: "Power at industrial scale",
    description:
      "Large scale clean energy engineering for factories and heavy industry.",
    status: "coming-soon",
    icon: Factory,
    href: "/services/excess-industrial-solutions",
  },
];

/** Services that render as live, interactive cards today. */
export const availableServices = services.filter(
  (service) => service.status === "available",
);

/** Services architected now and shown as Coming Soon. */
export const comingSoonServices = services.filter(
  (service) => service.status === "coming-soon",
);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
