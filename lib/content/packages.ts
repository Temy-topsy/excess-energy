import type { LucideIcon } from "lucide-react";
import { Award, Leaf, ShieldCheck, Wallet } from "lucide-react";
import type { StaticImageData } from "next/image";

import package1kva from "@/public/images/services/excess-energy-services-1kva.jpg";
import package2_5kva from "@/public/images/services/excess-energy-services-2.5kva.jpg";
import package3kva from "@/public/images/services/excess-energy-services-3kva.jpeg";
import package4kva from "@/public/images/services/excess-energy-services-4kva.jpg";
import package5kva from "@/public/images/services/excess-energy-services-5kva.jpg";
import package8kva from "@/public/images/services/excess-energy-services-8kva.jpg";
import inverter1kva from "@/public/images/services/excess-energy-services-1kva-inverter.jpg";
import inverter4kva from "@/public/images/services/excess-energy-services-4kva-inverter.jpg";
import inverter5kva from "@/public/images/services/excess-energy-services-5kva-inverter.jpg";
import inverter8kva from "@/public/images/services/excess-energy-services-8kva-inverter.jpg";
import panel1kva from "@/public/images/services/excess-energy-services-1kva-panel.jpg";
import panel2_5kva from "@/public/images/services/excess-energy-services-2.5kva-panel.jpg";
import panel3kva from "@/public/images/services/excess-energy-services-3kva-panel.jpg";
import panel4_5kva from "@/public/images/services/excess-energy-services-4kva-5kva-panel.jpg";
import panel8kva from "@/public/images/services/excess-energy-services-8kva-panel.jpg";
import { serviceDetails } from "./service-details";

export interface PackageBenefit {
  icon: LucideIcon;
  title: string;
}

export interface SolarPackage {
  slug: string;
  name: string;
  href: string;
  packageImage: StaticImageData;
  packageAlt: string;
  inverterImage: StaticImageData | string;
  panelImage: StaticImageData | string;
  benefits: PackageBenefit[];
  faq: typeof serviceDetails["excess-solar"]["faq"];
  seo: { title: string; description: string };
}

const packageBenefits: PackageBenefit[] = [
  { icon: Wallet, title: "Lower energy bills" },
  { icon: ShieldCheck, title: "Power through outages" },
  { icon: Leaf, title: "Clean and quiet" },
  { icon: Award, title: "Built to last" },
];

const packageFaq = serviceDetails["excess-solar"].faq;

export const solarPackages: SolarPackage[] = [
  {
    slug: "1kva",
    name: "1kVA",
    href: "/services/excess-solar/1kva",
    packageImage: package1kva,
    packageAlt: "Excess Solar 1kVA package design",
    inverterImage: inverter1kva,
    panelImage: panel1kva,
    benefits: packageBenefits,
    faq: packageFaq,
    seo: {
      title: "1kVA Excess Solar Package",
      description: "Explore the Excess Energy 1kVA solar package and installation.",
    },
  },
  {
    slug: "2.5kva",
    name: "2.5kVA",
    href: "/services/excess-solar/2.5kva",
    packageImage: package2_5kva,
    packageAlt: "Excess Solar 2.5kVA package design",
    inverterImage: "/images/services/excess-energy-services-2.5kva-inverter.jpg",
    panelImage: panel2_5kva,
    benefits: packageBenefits,
    faq: packageFaq,
    seo: {
      title: "2.5kVA Excess Solar Package",
      description: "Explore the Excess Energy 2.5kVA solar package and installation.",
    },
  },
  {
    slug: "3kva",
    name: "3kVA",
    href: "/services/excess-solar/3kva",
    packageImage: package3kva,
    packageAlt: "Excess Solar 3kVA package design",
    inverterImage: "/images/services/excess-energy-services-3kva-inverter.jpg",
    panelImage: panel3kva,
    benefits: packageBenefits,
    faq: packageFaq,
    seo: {
      title: "3kVA Excess Solar Package",
      description: "Explore the Excess Energy 3kVA solar package and installation.",
    },
  },
  {
    slug: "4kva",
    name: "4kVA",
    href: "/services/excess-solar/4kva",
    packageImage: package4kva,
    packageAlt: "Excess Solar 4kVA package design",
    inverterImage: inverter4kva,
    panelImage: panel4_5kva,
    benefits: packageBenefits,
    faq: packageFaq,
    seo: {
      title: "4kVA Excess Solar Package",
      description: "Explore the Excess Energy 4kVA solar package and installation.",
    },
  },
  {
    slug: "5kva",
    name: "5kVA",
    href: "/services/excess-solar/5kva",
    packageImage: package5kva,
    packageAlt: "Excess Solar 5kVA package design",
    inverterImage: inverter5kva,
    panelImage: panel4_5kva,
    benefits: packageBenefits,
    faq: packageFaq,
    seo: {
      title: "5kVA Excess Solar Package",
      description: "Explore the Excess Energy 5kVA solar package and installation.",
    },
  },
  {
    slug: "8kva",
    name: "8kVA",
    href: "/services/excess-solar/8kva",
    packageImage: package8kva,
    packageAlt: "Excess Solar 8kVA package design",
    inverterImage: inverter8kva,
    panelImage: panel8kva,
    benefits: packageBenefits,
    faq: packageFaq,
    seo: {
      title: "8kVA Excess Solar Package",
      description: "Explore the Excess Energy 8kVA solar package and installation.",
    },
  },
];

export function getSolarPackage(slug: string): SolarPackage | undefined {
  return solarPackages.find((solarPackage) => solarPackage.slug === slug);
}

export function getSolarPackageSlugs(): string[] {
  return solarPackages.map((solarPackage) => solarPackage.slug);
}
