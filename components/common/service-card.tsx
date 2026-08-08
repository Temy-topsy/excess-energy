import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComingSoonBadge } from "@/components/common/coming-soon-badge";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/content/types";

/**
 * One service card, driven entirely by the services data. The status flag picks
 * the variant: available cards are whole card links with a hover lift, coming
 * soon cards are inert with reduced emphasis. Coming soon is the single
 * mechanism that lets future services join the grid without a redesign.
 */
function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = service.icon;

  if (service.status === "coming-soon") {
    return (
      <Card className={cn("gap-4 p-6", className)} aria-disabled="true">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 items-center justify-center rounded-xs bg-muted text-muted-foreground">
            <Icon className="size-6" aria-hidden="true" />
          </div>
          <ComingSoonBadge />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-h4 text-foreground">{service.name}</h3>
          <p className="text-body-sm text-muted-foreground">
            {service.description}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card interactive className={cn("group relative gap-4 p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex size-12 items-center justify-center rounded-xs bg-primary/15 text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <Badge variant="available">Available</Badge>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-h4 text-foreground">
          {/* The stretched pseudo element makes the whole card the hit target,
              while the link text stays meaningful for assistive tech. */}
          <Link
            href={service.href}
            className="rounded-xs outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] after:absolute after:inset-0 after:rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-hover:text-accent"
          >
            {service.name}
          </Link>
        </h3>
        <p className="text-body-sm text-muted-foreground">
          {service.description}
        </p>
      </div>

      <span className="mt-auto inline-flex items-center gap-2 text-body-sm font-semibold text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:text-accent">
        Explore service
        <ArrowRight
          className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Card>
  );
}

export { ServiceCard };
