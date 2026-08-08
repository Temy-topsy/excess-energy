import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Multi line text control for the message field. Shares the input surface and
 * states, with a sensible minimum height and vertical resize only.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-xs border border-input bg-background px-4 py-3 text-body text-foreground",
        "field-sizing-content resize-y",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
        "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/30",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
