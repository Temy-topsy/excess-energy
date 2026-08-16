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
    name: "Residential Solar",
    shortName: "Solar",
    tagline: "Clean power for every roof",
    description:
      "",
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
      "",
    status: "available",
    icon: Plug,
    href: "/services/inverter-installation",
  },
  {
    slug: "battery-storage",
    name: "Inverter Batterties",
    shortName: "Storage",
    tagline: "Store energy, stay powered",
    description:
      "",
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
      "",
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
      "",
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
      "",
    status: "available",
    icon: LampCeiling,
    href: "/services/solar-street-lights",
  },

  // Future services. Architected now, shown as Coming Soon, built later.
  {
    slug: "excess-ev",
    name: "Excess EV",
    shortName: "EV",
    tagline: "Charge the future",
    description:
      "",
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
      "",
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
      "",
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
