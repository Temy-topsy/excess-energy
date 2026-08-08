import type { MouseEventHandler } from "react";
import Link from "next/link";
import type { Route } from "next";

import { cn } from "@/lib/utils";

/**
 * A single navigation link, shared by the desktop and mobile menus so the
 * active state, focus ring, and accessible current marker are defined once.
 * It is presentational: the parent resolves `active` (both menus already run
 * usePathname), which keeps this component free of hooks.
 *
 * The `desktop` variant is an inline item with an animated underline that grows
 * from the left on hover or when active. The `mobile` variant is a full width,
 * touch friendly row for the slide out menu.
 */

interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
  variant?: "desktop" | "mobile";
  className?: string;
  /** Lets the mobile menu close itself when a link is tapped. */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

function NavLink({
  href,
  label,
  active = false,
  variant = "desktop",
  className,
  onClick,
}: NavLinkProps) {
  const isDesktop = variant === "desktop";

  return (
    <Link
      href={href as Route}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDesktop
          ? [
              "relative inline-flex items-center rounded-xs px-1 py-2 text-sm font-medium",
              "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-foreground",
              "after:transition-transform after:duration-[var(--duration-base)] after:ease-[var(--ease-standard)]",
              "hover:after:scale-x-100 focus-visible:after:scale-x-100",
              active
                ? "text-foreground after:scale-x-100"
                : "text-muted-foreground hover:text-foreground",
            ]
          : [
              "flex items-center rounded-sm px-3 py-3 text-base font-medium",
              active
                ? "bg-muted text-foreground"
                : "text-foreground/80 hover:bg-muted hover:text-foreground",
            ],
        className,
      )}
    >
      {label}
    </Link>
  );
}

export { NavLink };
export type { NavLinkProps };
