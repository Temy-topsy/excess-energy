import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Small, non interactive status marker. Uppercase overline styling for the
 * industrial voice, radius-xs corners. Variants never rely on color alone; each
 * carries a border or fill and is normally paired with a text label or icon.
 */
const badgeVariants = cva(
  [
    "inline-flex w-fit items-center gap-1 whitespace-nowrap",
    "rounded-xs px-2 py-0.5 text-overline uppercase",
    "[&_svg]:pointer-events-none [&_svg]:size-3.5",
  ].join(" "),
  {
    variants: {
      variant: {
        // Available: subtle, quiet confirmation.
        available: "bg-muted text-foreground",
        // Coming soon: neutral, low emphasis.
        "coming-soon": "border border-border bg-muted text-muted-foreground",
        // Emergency: attention, orange fill with dark text.
        emergency: "bg-accent text-accent-foreground",
        outline: "border border-border text-foreground",
        solid: "bg-secondary text-secondary-foreground",
      },
    },
    defaultVariants: {
      variant: "available",
    },
  },
);

interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
