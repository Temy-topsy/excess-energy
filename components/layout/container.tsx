import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Centers content and applies the responsive max width and horizontal padding
 * from the container tokens. Every page and section width goes through here so
 * gutters and the grid margins stay consistent site wide.
 */

type ContainerWidth = "prose" | "base" | "wide" | "full";

const widthClass: Record<ContainerWidth, string> = {
  prose: "max-w-[var(--container-prose)]", // 720px, long form reading
  base: "max-w-[var(--container-base)]", // 1280px, default page content
  wide: "max-w-[var(--container-wide)]", // 1440px, wide feature sections
  full: "max-w-none", // full bleed
};

interface ContainerProps extends React.ComponentProps<"div"> {
  width?: ContainerWidth;
  /** Render as the child element instead of a div. */
  asChild?: boolean;
}

function Container({
  width = "base",
  asChild = false,
  className,
  ...props
}: ContainerProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      data-slot="container"
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        widthClass[width],
        className,
      )}
      {...props}
    />
  );
}

export { Container };
export type { ContainerWidth };
