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
      <div className={cn("flex flex-col items-start gap-2 p-4 sm:p-5 rounded-md border border-border/50 bg-muted/30 opacity-60", className)} aria-disabled="true">
        <h3 className="text-body font-medium text-muted-foreground">{service.name}</h3>
      </div>
    );
  }

  return (
    <Card interactive className={cn("group relative gap-3 p-4 sm:p-5", className)}>
      <div className="flex flex-col items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-xs bg-primary/15 text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <h3 className="text-body-lg font-medium text-foreground">
          <Link
            href={service.href}
            className="rounded-xs outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] after:absolute after:inset-0 after:rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-hover:text-accent"
          >
            {service.name}
          </Link>
        </h3>
      </div>
      
      <span className="mt-auto pt-2 flex items-center gap-1.5 text-body-sm font-semibold text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:text-accent">
        Explore
        <ArrowRight
          className="size-3.5 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Card>
  );
}

export { ServiceCard };
