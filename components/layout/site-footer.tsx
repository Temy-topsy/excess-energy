import Link from "next/link";
import type { Route } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import type { SocialLink } from "@/lib/content/company";
import { company } from "@/lib/content/company";
import { footerLinks, legalNav } from "@/lib/content/nav";
import { availableServices } from "@/lib/content/services";
import { buildWhatsappUrl } from "@/lib/lead/whatsapp";

/**
 * The global site footer. A calm, spacious light surface (muted, not the dark
 * brand band) so the real logo mark reads correctly and a page that closes on
 * the dark CTA still has a clear final boundary. Everything is data driven:
 * links from nav, the service column from the canonical service list, and every
 * contact fact from company data, so nothing here drifts from the rest of the
 * site.
 *
 * A server component. The only interactive parts are self contained client
 * leaves: the reduced-motion aware BackToTop control, and the external social
 * links. Rendered once in the root layout, below <main>, on every page.
 */

const linkClass =
  "inline-flex rounded-xs text-body-sm text-muted-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const contactLinkClass =
  "group inline-flex items-start gap-2.5 rounded-xs text-body-sm text-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const iconClass = "mt-0.5 size-4 shrink-0 text-muted-foreground";

function SiteFooter() {
  const year = new Date().getFullYear();

  const socialItems: SocialLink[] = [
    ...company.socials,
    {
      platform: "whatsapp",
      label: "WhatsApp",
      href: buildWhatsappUrl(
        `Hello ${company.name}, I would like to make an enquiry.`,
      ),
    },
  ];

  return (
    <footer className="border-t border-border bg-surface-footer text-foreground">
      <Container className="flex flex-col gap-12 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-body-sm text-pretty text-muted-foreground">
              {company.mission}
            </p>
            <SocialLinks items={socialItems} className="mt-1" />
          </div>

          {/* Primary links */}
          <nav
            aria-label="Footer"
            className="flex flex-col gap-4 lg:col-span-2"
          >
            <h2 className="text-overline uppercase text-foreground">Company</h2>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href as Route} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav
            aria-label="Services"
            className="flex flex-col gap-4 lg:col-span-3"
          >
            <h2 className="text-overline uppercase text-foreground">Services</h2>
            <ul className="flex flex-col gap-3">
              {availableServices.map((service) => (
                <li key={service.slug}>
                  <Link href={service.href as Route} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <h2 className="text-overline uppercase text-foreground">Contact</h2>
            <ul className="flex flex-col gap-3">
              {company.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={`tel:${phone.href}`} className={contactLinkClass}>
                    <Phone className={iconClass} aria-hidden="true" />
                    <span>
                      {phone.display}
                      <span className="text-muted-foreground">
                        {" · "}
                        {phone.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className={contactLinkClass}
                >
                  <Mail className={iconClass} aria-hidden="true" />
                  <span className="break-all">{company.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-body-sm text-muted-foreground">
                <MapPin className={iconClass} aria-hidden="true" />
                <span>{company.coverageAreas.join(", ")}</span>
              </li>
              <li className="flex items-start gap-2.5 text-body-sm text-muted-foreground">
                <Clock className={iconClass} aria-hidden="true" />
                <span>Open {company.availability}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted-foreground">
            © {year} {company.name}. All rights reserved.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as Route}
                    className="rounded-xs text-caption text-muted-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };
