import {
  Award,
  BadgeCheck,
  HardHat,
  Headset,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * The reasons customers choose Excess Energy, as data so the section stays a
 * layout over content and new reasons never mean new markup. These are the
 * value propositions; coverage (the areas served) is a separate, location fact
 * rendered from company.coverageAreas in the section itself.
 *
 * Every claim here is qualitative or already approved elsewhere (the one year
 * warranty, 24/7 support, current coverage). No figures are invented.
 */

export interface WhyUsReason {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyUsReasons: WhyUsReason[] = [
  {
    icon: HardHat,
    title: "Professional installation",
    description:
      "",
  },
  {
    icon: Award,
    title: "Quality components",
    description:
      "",
  },
  {
    icon: ShieldCheck,
    title: "Long-term reliability",
    description:
      "",
  },
  {
    icon: BadgeCheck,
    title: "1 year warranty",
    description:
      "",
  },
  {
    icon: Headset,
    title: "Ongoing support",
    description:
      "",
  },
  {
    icon: Wallet,
    title: "Energy savings",
    description:
      "",
  },
];
