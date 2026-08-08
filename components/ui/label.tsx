"use client";

import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Form label, always visible and above its control. Built on the Radix Label
 * primitive so clicking it focuses the associated field. Fades with a disabled
 * control via the group data attribute.
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-body-sm font-medium text-foreground select-none",
        "group-data-[disabled=true]:opacity-60 peer-disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
