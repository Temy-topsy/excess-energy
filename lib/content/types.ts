import type { LucideIcon } from "lucide-react";

/** One service. Status drives whether the card renders live or Coming Soon. */
export interface Service {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  status: "available" | "coming-soon";
  icon: LucideIcon;
  /** Data slug for the service detail route, reserved for later. */
  href: string;
}
