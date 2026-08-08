import { trustIndicators } from "@/lib/content/trust";
import { cn } from "@/lib/utils";

/**
 * The hero trust row: four restrained proof points rendered from data. These
 * are the approved, non fabricated claims (installs completed, warranty, the
 * professional install promise, and current coverage), so the figures live in
 * lib/content/trust and this component only lays them out.
 *
 * A server component with no interactivity. The layout is a two by two grid on
 * phones, opening to a single row from sm up, so it reads cleanly inside the
 * hero's narrower text column and never crowds the long coverage value.
 */

interface HeroTrustProps {
  className?: string;
}

function HeroTrust({ className }: HeroTrustProps) {
  return (
    <ul
      className={cn(
        // A bordered spec grid: gap-px over bg-border draws hairline dividers
        // between bg-card cells, the industrial, instrument-panel look. Two up
        // on phones, four across from sm.
        "grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4",
        className,
      )}
    >
      {trustIndicators.map(({ icon: Icon, value, label }) => (
        <li
          key={label}
          className="group/stat flex flex-col gap-2.5 bg-card p-4 transition-colors duration-[var(--duration-base)] ease-[var(--ease-standard)] hover:bg-muted sm:p-5"
        >
          <span
            className="inline-flex size-9 items-center justify-center rounded-sm border border-border bg-background text-accent transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover/stat:-translate-y-0.5"
            aria-hidden="true"
          >
            <Icon className="size-[1.125rem]" />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-foreground text-balance">
              {value}
            </span>
            <span className="text-xs text-muted-foreground text-pretty">
              {label}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export { HeroTrust };
