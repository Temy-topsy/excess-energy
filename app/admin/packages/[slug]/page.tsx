import { notFound } from "next/navigation";
import { getSolarPackage, type SolarPackage } from "@/lib/content/packages";
import { EditPackageForm } from "./edit-package-form";

export default async function AdminEditPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getSolarPackage(slug);

  if (!pkg) {
    notFound();
  }

  const safePkg: SolarPackage = {
    ...pkg,
    benefits: [],
    faq: [],
  };

  return <EditPackageForm pkg={safePkg} />;
}
