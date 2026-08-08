import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The standard section header: a heading and an optional lead paragraph, with
 * consistent spacing. Used at the top of most sections so their headers share
 * one rhythm. The heading level is selectable so document structure stays
 * correct without changing the visual size.
 *
 * The small accent eyebrow that once sat above every heading was removed in the
 * global visual pass: it read as a template tell and added noise. The `overline`
 * prop is kept as a deprecated no-op so the many existing call sites keep
 * compiling this session; the dead props are pruned in the page-level pass.
 */

type HeadingLevel = "h1" | "h2" | "h3";
type HeadingAlign = "start" | "center";

interface SectionHeadingProps extends React.ComponentProps<"div"> {
  /**
   * @deprecated No longer rendered. The section eyebrow was removed from the
   * visual system; this prop is retained only so existing call sites compile and
   * will be removed once they are cleaned up.
   */
  overline?: string;
  heading: React.ReactNode;
  /** Optional id set on the heading element, for aria-labelledby on a parent. */
  headingId?: string;
  lead?: React.ReactNode;
  as?: HeadingLevel;
  align?: HeadingAlign;
  /** Visual size of the heading, independent of its semantic level. */
  size?: "h1" | "h2" | "h3";
}

const sizeClass = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

function SectionHeading({
  // Deprecated no-op: the eyebrow is no longer rendered (see the prop's note),
  // but it is destructured out here so its value never leaks onto the DOM via
  // ...props. Retained until the call sites are cleaned up.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  overline,
  heading,
  headingId,
  lead,
  as = "h2",
  align = "start",
  size = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <div
      data-slot="section-heading"
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
      {...props}
    >
      <Heading id={headingId} className={cn(sizeClass[size], "text-balance")}>
        {heading}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "text-body-lg text-muted-foreground",
            align === "center" ? "max-w-2xl" : "max-w-prose",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export { SectionHeading };
export type { HeadingLevel, HeadingAlign };
