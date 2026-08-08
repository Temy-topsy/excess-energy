/**
 * Navigation is data. Header and footer render from these arrays, so menus
 * update without touching layout. The primary CTA is defined once and reused
 * at every breakpoint.
 *
 * Anchor targets point at the section that actually holds them: the FAQ lives
 * on the contact page, coverage on the about page, and the process on the
 * homepage. Each target section carries the matching id, so these links land
 * precisely rather than at the top of a page.
 */

export interface NavLink {
  label: string;
  href: string;
  /** Optional shorter label for tight spaces such as the header CTA. */
  shortLabel?: string;
}

/** Primary header navigation. The fuller set (Home, About, Services, Projects,
 * FAQs, Contact) gives visitors an immediate map of the site. FAQs is an anchor
 * to the contact page's FAQ, the one place answers live today; it resolves by
 * scroll, so it never reads as the active route. */
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "FAQs", href: "/contact#faq" },
  { label: "Contact", href: "/contact" },
];

/** The single conversion action. Present in the header at every breakpoint.
 * The header uses the short label where horizontal space is tight. */
export const primaryCta: NavLink = {
  label: "Request a Free Energy Assessment",
  shortLabel: "Request Assessment",
  href: "/contact",
};

/** The supporting action. Its own dedicated, low friction page. */
export const secondaryCta: NavLink = {
  label: "Request a Quote",
  href: "/request-quote",
};

/**
 * Whether a nav item should read as the current location. Route links match
 * their own path and any nested child, so Services stays lit on
 * /services/excess-solar. Homepage anchors like /#faq resolve by scroll
 * position, which the header does not track, so they never read active here.
 */
export function isNavItemActive(href: string, pathname: string): boolean {
  const [path, hash] = href.split("#");

  if (hash) {
    return false;
  }

  if (path === "/") {
    return pathname === "/";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}

/** Footer primary links. The key destinations in one column. This set differs
 * from the header: it surfaces Request a Quote and drops the FAQ anchor, since
 * the footer is a site map rather than the conversion-focused top bar. The
 * footer's Services column is not defined here; it renders from the canonical
 * `availableServices` data so a new service appears in both places at once. */
export const footerLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Request a Quote", href: "/request-quote" },
];

/** Legal links in the footer's bottom bar. */
export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
