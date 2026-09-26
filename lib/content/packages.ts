import type { LucideIcon } from "lucide-react";
import { Award, Leaf, ShieldCheck, Wallet } from "lucide-react";
import { serviceDetails } from "./service-details";
import { supabase } from "@/lib/cms/supabase";

export interface PackageBenefit {
  icon: LucideIcon;
  title: string;
}

export interface SolarPackage {
  slug: string;
  name: string;
  href: string;
  packageImage: string;
  packageAlt: string;
  inverterImage: string;
  panelImage: string;
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

export const defaultBenefits = packageBenefits;
export const defaultFaq = packageFaq;

export async function getSolarPackages(): Promise<SolarPackage[]> {
  const { data, error } = await supabase
    .from("solar_packages")
    .select("*")
    .order("name", { ascending: true });

  if (error || !data) {
    console.error("Error fetching packages from Supabase:", error);
    return [];
  }

  return data.map((row) => ({
    slug: row.slug,
    name: row.name,
    href: row.href,
    packageImage: row.package_image,
    packageAlt: row.package_alt,
    inverterImage: row.inverter_image,
    panelImage: row.panel_image,
    benefits: packageBenefits,
    faq: packageFaq,
    seo: {
      title: row.seo_title,
      description: row.seo_description,
    },
  }));
}

export async function getSolarPackage(slug: string): Promise<SolarPackage | undefined> {
  const packages = await getSolarPackages();
  return packages.find((p) => p.slug === slug);
}

export async function getSolarPackageSlugs(): Promise<string[]> {
  const packages = await getSolarPackages();
  return packages.map((p) => p.slug);
}
