import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * A single value or capability: an icon in a soft chip, a short title, and one
 * supporting line. Static by design, so it carries no hover treatment; the
 * design system reserves card hover for cards that are themselves links. Shared
 * by the About page's core values grid and any future feature grid, so the
 * treatment stays in one place.
 */
function ValueCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card className={cn("gap-4 p-6", className)}>
      <span className="flex size-12 items-center justify-center rounded-xs bg-primary/15 text-foreground">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-h4 text-foreground">{title}</h3>
        <p className="text-body-sm text-muted-foreground text-pretty">
          {description}
        </p>
      </div>
    </Card>
  );
}

export { ValueCard };
