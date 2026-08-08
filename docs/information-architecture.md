# Information Architecture

The structure of the site as a product: the sitemap, the navigation, the user journey, the homepage wireframe, and the strategy that keeps all of it scalable. This document is design and UX, not code. The routing and folders that implement it are in [Architecture](./architecture.md); the conversion strategy behind it is in [UX and Conversion](./ux-and-conversion.md).

## Table of Contents

- [Sitemap](#sitemap)
- [Navigation Structure](#navigation-structure)
- [User Journey](#user-journey)
- [Homepage Wireframe](#homepage-wireframe)
- [Page Templates](#page-templates)
- [Future Scalability Strategy](#future-scalability-strategy)
- [Related Documents](#related-documents)

## Sitemap

Built now:

```
/                     Home (the conversion funnel)
/services             Services overview (available + Coming Soon)
/contact              Contact page with the assessment form
```

Reserved now, built later (structure exists, pages not implemented):

```
/services/[slug]      Service detail pages (Excess Solar, Inverter Installation, ...)
/[location]           Location pages (e.g. solar-installation-in-lagos)
/about                Company story and trust (optional, later)
/projects             Completed installations / case studies (uses Project Cards)
/legal/*              Privacy, terms (prose container)
```

The primary conversion target is `/contact` (and the inline assessment form), reachable from every page through the persistent header CTA.

## Navigation Structure

Navigation is data-driven from `nav.ts`, so the menus below change without touching layout.

### Primary Navigation (header)

```
Logo (home)
Services        -> /services
Process         -> / (Process section) or /#process
Coverage        -> / (Coverage section) or /#coverage
Contact         -> /contact
[Primary CTA]   -> Request a Free Energy Assessment -> /contact
```

- The primary CTA is always present in the header at every breakpoint.
- On mobile the links collapse into the Sheet menu; the CTA and contact numbers remain reachable.
- Keep the primary set short (four or five items). As the site grows, secondary destinations live in the footer, not the header.

### Footer Navigation

```
Services            Company            Contact
  Excess Solar        About (later)      09131436391
  Inverter            Projects (later)   07025461898
  Battery Storage     Process            Emergency 09058360452
  Commercial Solar    Coverage           info.xsenergy1@gmail.com
  CCTV Systems                           Available 24/7
  Solar Street Lights
                    Coverage
                      Ogun  Lagos  Ibadan
```

The footer is the wide, comprehensive map; the header is the short, focused one.

### Utility and Contextual Navigation

- Emergency line is surfaced distinctly (badge or highlighted link) because 24/7 availability is a trust and conversion asset.
- Breadcrumbs appear on future detail and location pages, not on the top-level pages.

## User Journey

The site serves one primary journey with several entry points.

### Primary Journey: Prospect to Lead

```
1. ARRIVE
   Entry: homepage, a service page, or a future location page (from search or referral).
   Goal: understand what Excess Energy does in seconds.

2. LEARN
   The hero states the value in one line. The services grid shows the range.
   Goal: recognize the relevant service.

3. TRUST
   Why Excess Energy, the Process, Coverage, and real figures build confidence.
   Goal: believe this company is capable, local, and reliable.

4. DECIDE
   A CTA band at the end of the rhythm presents the assessment request.
   Goal: choose to act.

5. REQUEST
   The assessment form asks for only Name, Phone, Service, Message.
   Goal: submit with minimal friction.

6. CONFIRM
   A clear success state confirms the request and sets the next expectation.
   Goal: reassure that the company will respond.
```

### Journey Principles

- The primary CTA is never more than one or two taps away at any point.
- Each step reduces friction toward the next; nothing sends the visitor backward or to a dead end.
- Secondary journeys (browse a single service, check coverage, call directly) all reconverge on the same assessment request.
- A visitor who wants to call instead of fill a form can: phone numbers are tappable everywhere.

### Audience Variations

The audiences (homeowners, businesses, schools, churches, hospitals, factories, developers) share this journey. The copy and imagery acknowledge the range, but the funnel and the ask stay the same. Segment-specific landing pages are a future addition, not a launch requirement.

## Homepage Wireframe

Text-only structure, top to bottom. Layout follows the grid and section rhythm in [Design System](./design-system.md). This describes structure and intent, not final copy.

```
=========================================================
HEADER (sticky, z-header)
  Logo            Services  Process  Coverage  Contact   [Request a Free Energy Assessment]
---------------------------------------------------------

1. HERO  (full-bleed, dark or image background, generous top and bottom space)
   Overline:   Clean energy for homes, businesses, and institutions
   Headline:   Power Beyond Limits.            (text-display, one line idea)
   Subcopy:    One line on reliable, affordable, professionally installed clean energy.
   Actions:    [Request a Free Energy Assessment]  [Request a Quote]
   Media:      Large industrial installation image (priority).
   Trust strip (optional): coverage areas or a one-line credibility marker.

2. SERVICES GRID
   SectionHeading: overline + "What we do" heading + one line.
   Grid: 3-up desktop / 2-up tablet / 1-up mobile of Service Cards.
     Available: Excess Solar, Inverter Installation, Battery Storage,
                Commercial Solar, CCTV Systems, Solar Street Lights.
     Coming Soon: Excess CCTV, Smart Homes, EV, Energy Monitoring, Industrial
                (clearly badged, lower emphasis).

3. WHY EXCESS ENERGY  (trust)
   SectionHeading + a grid of trust points:
     Professional installation, Reliable systems, Local coverage,
     Quality equipment, 24/7 availability.
   Each: Lucide icon + short title + one line.

4. STATISTICS BAND  (optional dark band)
   Stat Group (2 to 4): e.g. installations completed, areas served,
   response time, warranty. Real figures, tabular, plain voice.

5. PROCESS
   SectionHeading + numbered steps:
     1 Request a free assessment
     2 Site survey and design
     3 Professional installation
     4 Support and maintenance
   Reinforces trust by making the path concrete.

6. COVERAGE
   SectionHeading + Ogun, Lagos, Ibadan now, nationwide framing for later.
   Optional simple map or region list. Structured so new regions are additive.

7. CTA BAND  (dark surface, closes the rhythm)
   Heading: a direct invitation.
   Actions: [Request a Free Energy Assessment]  [Request a Quote]

8. FAQ (optional at launch)
   Accordion of common questions (cost, timeline, areas, service types).

---------------------------------------------------------
FOOTER (dark surface, z-base)
  Company + tagline | Services | Company | Contact (phones, emergency, email, 24/7) | Coverage
  Bottom: copyright, legal links.
=========================================================
```

Rhythm notes:

- One idea per section; generous space between sections; alternating light and dark bands for cadence.
- The assessment CTA appears in the header, at least once mid-page, and in the closing band.
- The hero carries a single headline and a single primary action; the secondary action supports, it does not compete.

## Page Templates

To keep the system consistent, most pages are composed from a small set of templates:

- Home template: the funnel above.
- Overview template (Services): SectionHeading, a grid of cards, a CTA band. Reused later for Projects.
- Detail template (reserved): hero, content sections, related items, CTA band. Used by future service and location pages.
- Form template (Contact): short intro, the form, contact details and map, emergency line.
- Prose template (reserved): narrow `container-prose` for legal and long-form.

New pages pick a template and supply data, rather than inventing layout.

## Future Scalability Strategy

The information architecture is built so growth is additive, never a redesign. This is the structural promise of the brief.

### New Services

- Add an entry to `services.ts` with a `status` flag. The services grid and overview render it automatically; "Coming Soon" services become "Available" by flipping the flag.
- The five named future services (Excess CCTV, Smart Homes, EV, Energy Monitoring, Industrial Solutions) already have a home in the data model and the grid.
- Service detail pages arrive via the reserved `/services/[slug]` route, populated from the same data.

### New Locations (SEO growth)

- The reserved `/[location]` route plus location data generate pages like "Solar Installation in Lagos" without new layout work.
- Coverage content is data-driven, so adding a region updates the coverage section and enables its page together.
- SEO metadata for these pages comes from the centralized builder in `lib/content/seo.ts` (structure reserved, SEO implemented later).

### New Page Types

- A new audience or content type (Projects, About, resources) uses an existing template and, if it needs a different shell, a new route group beside `(marketing)`.
- Legal and prose pages use the prose template.

### Design System Growth

- New components extend the existing vocabulary and tokens; they do not introduce parallel systems.
- Because components reference semantic tokens only, a rebrand or theme change is a token change in [app/globals.css](../app/globals.css), not a component rewrite.

### What Stays Fixed

- The conversion funnel and the single primary CTA.
- The token system, grid, and rhythm.
- The industrial, premium, trustworthy design language.

Growth changes content and data. It does not change the architecture or the design language.

## Related Documents

- [Architecture](./architecture.md)
- [UX and Conversion](./ux-and-conversion.md)
- [Design System](./design-system.md)
- [Components](./components.md)
- [Project Overview](./project-overview.md)
