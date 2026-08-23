import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SolarPackage } from "@/lib/content/packages";

function PackageCard({
  solarPackage,
  className,
}: {
  solarPackage: SolarPackage;
  className?: string;
}) {
  return (
    <Card
      interactive
      className={cn("group min-w-0 overflow-hidden p-0", className)}
    >
      <div className="aspect-[4/3] overflow-hidden border-b border-border bg-muted sm:aspect-[5/4]">
        <Image
          src={solarPackage.packageImage}
          alt={solarPackage.packageAlt}
          placeholder="blur"
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-contain transition-transform duration-[var(--duration-slow)] ease-[var(--ease-standard)] group-hover:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex items-center justify-between gap-3 p-4 sm:gap-4 sm:p-5">
        <h3 className="text-h4 min-w-0 text-foreground">{solarPackage.name}</h3>
        <Link
          href={solarPackage.href}
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-input px-3 text-sm font-semibold text-foreground outline-none transition-colors duration-[var(--duration-fast)] hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-4"
        >
          View Package
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

export { PackageCard };
