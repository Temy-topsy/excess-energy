import {
  BadgeCheck,
  HardHat,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * Trust indicators shown in the hero. Kept as data so the figures live in one
 * place and real numbers can be updated without touching layout. These are the
 * approved, non fabricated claims: installs completed, the standard warranty,
 * the professional install promise, and current coverage.
 *
 * `value` carries the figure or short claim, `label` the supporting words.
 * Update `value` here as the business grows; nothing downstream changes.
 */

export interface TrustIndicator {
  icon: LucideIcon;
  value: string;
  label: string;
}

export const trustIndicators: TrustIndicator[] = [
  {
    icon: BadgeCheck,
    value: "5+",
    label: "Installations completed",
  },
  {
    icon: ShieldCheck,
    value: "1 Year",
    label: "Warranty on installations",
  },
  {
    icon: HardHat,
    value: "Professional",
    label: "Installation, done right",
  },
  {
    icon: MapPin,
    value: "Ogun, Lagos & Ibadan",
    label: "Serving these areas",
  },
];
