"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { Menu } from "lucide-react";

import { mainNav, primaryCta, secondaryCta, isNavItemActive } from "@/lib/content/nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { NavLink } from "./nav-link";

/**
 * The slide out menu for phones and small tablets. Radix Dialog under the hood
 * (via the Sheet primitive) provides the focus trap, Escape to close, focus
 * return to the trigger, and body scroll lock, so this component only owns the
 * open state and the content. Open state is controlled so a tap on any link or
 * CTA closes the panel as the App Router navigates without unmounting it.
 *
 * Hidden at lg and up, where the horizontal DesktopNav takes over.
 */

function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[min(22rem,88vw)]">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <SheetDescription className="sr-only">
          Site links and ways to get in touch with {""}
          Excess Energy.
        </SheetDescription>

        <Logo />

        <nav aria-label="Mobile" className="mt-2">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  active={isNavItemActive(item.href, pathname)}
                  variant="mobile"
                  onClick={close}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
          <Button asChild size="lg" className="w-full">
            <Link href={primaryCta.href as Route} onClick={close}>
              {primaryCta.label}
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full">
            <Link href={secondaryCta.href as Route} onClick={close}>
              {secondaryCta.label}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
