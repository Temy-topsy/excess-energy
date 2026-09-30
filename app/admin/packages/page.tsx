import Link from "next/link";
import Image from "next/image";
import { getSolarPackages } from "@/lib/content/packages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeletePackageButton } from "./delete-button";
import { AdminHeader } from "@/components/admin/admin-header";

export default async function AdminPackagesPage() {
  const packages = await getSolarPackages();

  return (
    <div className="space-y-6">
      <AdminHeader />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Solar Packages</h1>
          <p className="text-muted-foreground mt-1">Manage your website&apos;s solar packages.</p>
        </div>
        <div>
          <Button asChild>
            <Link href="/admin/packages/new">Create Package</Link>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold text-foreground">Package</th>
                <th className="p-4 font-semibold text-foreground">Image</th>
                <th className="p-4 font-semibold text-foreground">SEO Title</th>
                <th className="p-4 font-semibold text-foreground text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {packages.map((pkg) => (
                <tr key={pkg.slug} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 align-middle">
                    <p className="font-medium text-foreground">{pkg.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{pkg.slug}</p>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="relative h-12 w-16 overflow-hidden rounded border border-border bg-muted">
                      <Image
                        src={pkg.packageImage}
                        alt={pkg.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </td>
                  <td className="p-4 align-middle max-w-[200px] truncate text-muted-foreground">
                    {pkg.seo.title}
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/packages/${pkg.slug}`}>
                          Edit
                        </Link>
                      </Button>
                      <DeletePackageButton slug={pkg.slug} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
