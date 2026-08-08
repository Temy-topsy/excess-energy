import Link from "next/link";
import type { Route } from "next";

import { primaryCta } from "@/lib/content/nav";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { HeaderShell } from "./header-shell";
import { Logo } from "./logo";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

/**
 * The sticky site header. It sits transparently over the hero at the top of the
 * page and gains a restrained surface (a soft translucent background, hairline
 * underline, and slight shadow) once the page scrolls, so text stays legible
 * over content without the bar ever reading as a heavy solid block. It reserves
 * a fixed height (the --header-height token) that the html scroll-padding
 * offsets against, so in-page anchors are never hidden beneath it.
 *
 * A server component: the scroll-driven surface lives in the HeaderShell client
 * leaf, and the only other interactive parts are the DesktopNav (active link)
 * and MobileNav (slide out), which are self contained client leaves. The primary
 * CTA is always present; its short label keeps the bar from crowding on narrow
 * phones, and it hides entirely below sm where the slide out menu surfaces both
 * CTAs prominently.
 */

function SiteHeader() {
  return (
    <HeaderShell>
      <Container className="flex h-header items-center justify-between gap-4">
        <Logo />

        <div className="flex items-center gap-2 lg:gap-6">
          <DesktopNav />

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />

            <Button asChild size="default" className="hidden sm:inline-flex">
              <Link href={primaryCta.href as Route}>
                {primaryCta.shortLabel ?? primaryCta.label}
              </Link>
            </Button>

            <MobileNav />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}

export { SiteHeader };
