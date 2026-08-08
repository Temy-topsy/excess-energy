import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A thin helper over CSS Grid that expresses the card layouts the system uses:
 * they collapse predictably to 2 up on tablet and 1 up on mobile. For bespoke
 * layouts, use grid utilities directly; this covers the common card grids.
 */

type GridCols = 2 | 3 | 4;
type GridGap = "sm" | "md" | "lg";

const colsClass: Record<GridCols, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const gapClass: Record<GridGap, string> = {
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-6 lg:gap-8",
};

interface GridProps extends React.ComponentProps<"div"> {
  cols?: GridCols;
  gap?: GridGap;
}

function Grid({ cols = 3, gap = "md", className, ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn("grid", colsClass[cols], gapClass[gap], className)}
      {...props}
    />
  );
}

export { Grid };
export type { GridCols, GridGap };
