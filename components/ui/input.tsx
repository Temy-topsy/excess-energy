import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Text style input. Solid background, input colored border, radius-xs, minimum
 * 44px height for touch. Focus moves the border to the ring color and adds the
 * ring. Error styling is driven by aria-invalid, which the form field wires up.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 rounded-xs border border-input bg-background px-4 py-2 text-body text-foreground",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
        "file:border-0 file:bg-transparent file:text-body-sm file:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
