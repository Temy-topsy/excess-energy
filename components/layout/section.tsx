import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Applies the vertical section rhythm and an optional surface tone, so cadence
 * is identical across the site. Dark sections opt into the brand dark tokens by
 * carrying the `dark` class, which also enables dark: variants for anything
 * inside. Pair with Container to set the horizontal width.
 */

type SectionTone = "default" | "muted" | "dark";
type SectionSpacing = "none" | "compact" | "default" | "spacious";

const toneClass: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  muted: "bg-muted text-foreground",
  // The `dark` class flips the semantic tokens to the dark brand surface.
  dark: "dark bg-background text-foreground",
};

const spacingClass: Record<SectionSpacing, string> = {
  none: "",
  compact: "py-14 md:py-20",
  default: "py-20 md:py-24 lg:py-28",
  spacious: "py-24 md:py-32 lg:py-40",
};

interface SectionProps extends React.ComponentProps<"section"> {
  tone?: SectionTone;
  spacing?: SectionSpacing;
}

function Section({
  tone = "default",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      data-tone={tone}
      className={cn(
        "relative w-full",
        toneClass[tone],
        spacingClass[spacing],
        className,
      )}
      {...props}
    />
  );
}

export { Section };
export type { SectionTone, SectionSpacing };
