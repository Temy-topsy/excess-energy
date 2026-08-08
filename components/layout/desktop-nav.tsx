"use client";

import { usePathname } from "next/navigation";

import { mainNav, isNavItemActive } from "@/lib/content/nav";
import { cn } from "@/lib/utils";
import { NavLink } from "./nav-link";

/**
 * The horizontal menu for tablet and desktop. It is a client component only
 * because the active state depends on the current path; the links themselves
 * are the presentational NavLink. Hidden below lg, where the slide out menu
 * takes over.
 */

interface DesktopNavProps {
  className?: string;
}

function DesktopNav({ className }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={cn("hidden lg:block", className)}>
      <ul className="flex items-center gap-6 xl:gap-8">
        {mainNav.map((item) => (
          <li key={item.href}>
            <NavLink
              href={item.href}
              label={item.label}
              active={isNavItemActive(item.href, pathname)}
              variant="desktop"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { DesktopNav };
