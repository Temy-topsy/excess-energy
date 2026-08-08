# Architecture

The structural decisions that let the Excess Energy site scale from six services to a nationwide operation without a redesign. This covers the Next.js conventions the project runs on, the folder structure, the data layer, and the reserved future routes.

## Table of Contents

- [Platform and Conventions](#platform-and-conventions)
- [Folder Structure](#folder-structure)
- [Data Layer](#data-layer)
- [Server and Client Boundary](#server-and-client-boundary)
- [Forms and Server Actions](#forms-and-server-actions)
- [SEO-Ready Architecture](#seo-ready-architecture)
- [Scalability](#scalability)
- [Related Documents](#related-documents)

## Platform and Conventions

- Next.js 16.3.0 App Router, React 19.2.8.
- Tailwind CSS v4, CSS-first configuration. There is no `tailwind.config.js`; all design tokens live in `app/globals.css` via `:root`, `.dark`, and `@theme inline`.
- shadcn v4 with style `radix-nova`, base color `neutral`, CSS variables, lucide icon library.
- TypeScript, strict mode, path alias `@/*` mapping to the project root.

Version-specific conventions that must be followed (this Next.js version differs from common knowledge):

- Server Components are the default. Interactive pieces opt in with `"use client"`.
- `params` and `searchParams` are Promises in pages and `generateMetadata`; future dynamic routes must await them.
- Typed routes are live. The root layout uses the global `LayoutProps<"/">` helper; keep using these helpers.
- Middleware is `proxy.ts` at the root. Not needed today; this is where future location-based redirects would live.
- Metadata and SEO are file conventions: `sitemap.ts`, `robots.ts`, `opengraph-image`, plus `generateMetadata` and `next/og` `ImageResponse`.

Before writing any code, consult the relevant guide in `node_modules/next/dist/docs/` (mandated by AGENTS.md) and heed deprecation notices.

## Folder Structure

Root-level structure, consistent with the `@/*` to root alias. `components/` and `lib/` gain subfolders; no new top-level folders except the route group inside `app/`.

```
app/
  (marketing)/            # route group: the public conversion site (no URL segment)
    layout.tsx            # header + footer shell for marketing pages
    page.tsx              # home
    contact/page.tsx      # contact + form
    services/page.tsx     # services overview (available + coming soon)
    # reserved for later, not built now:
    #   services/[slug]/page.tsx
    #   [location]/page.tsx  (e.g. solar-installation-in-lagos)
  layout.tsx              # root: <html>, fonts, theme provider, base metadata
  globals.css             # brand design tokens

components/
  ui/                     # shadcn primitives (button exists; add as needed)
  layout/                 # Header, Footer, MobileNav, Container, Section
  sections/               # Hero, ServicesGrid, WhyUs, Process, Coverage, CTASection, Faq
  common/                 # Media (next/image wrapper), SectionHeading, ComingSoonBadge
  forms/                  # AssessmentForm / ContactForm + fields

lib/
  content/
    company.ts            # name, tagline, phones, emergency, email, availability, areas
    services.ts           # current + future services, each with a status flag
    nav.ts                # header/footer navigation
    seo.ts                # metadata defaults + per-page builder (reserved use)
  schemas/                # zod schemas shared by client form and server action
  actions/                # server actions (contact submission)
  utils.ts                # cn() (exists)
```

Rationale:

- The `(marketing)` route group keeps the conversion site cohesive and leaves room for a future group with a different shell (legal pages, a customer portal) without redesigning routing. It adds no URL segment.
- `lib/content` is the backbone of scalability: services, locations, contact details, and nav are data, not hardcoded JSX.
- The empty `src/` folder stays unused. `@/*` points at the root, so adopting `src/` would split the structure. Do not create parallel folders, files, components, utilities, hooks, types, or configuration where one already exists.

## Data Layer

Single source of truth in `lib/content`:

- `company.ts`: name, tagline, contact details (phones, emergency line, email), 24/7 availability, coverage areas.
- `services.ts`: every service (current and future) with a `status` flag that drives whether a card renders live or as "Coming Soon".
- `nav.ts`: header and footer navigation, so menus update from data.
- `seo.ts`: metadata defaults and a per-page metadata builder. Reserved now, exercised when SEO is implemented.

Pages read from these modules. Adding a service or region is a data change, not a layout change.

## Server and Client Boundary

- Pages stay Server Components by default.
- `"use client"` is pushed down to the smallest interactive leaves: mobile navigation, theme toggle (if used), the form, any GSAP host component.
- Context providers are client components that wrap `{children}`.
- This boundary is the main performance lever for mid-range Android; see [Coding Standards](./coding-standards.md).

## Forms and Server Actions

- One zod schema in `lib/schemas`, shared by the client form (react-hook-form + `@hookform/resolvers`) for instant UX and the Server Action for authoritative validation.
- Submission uses a Server Action with progressive enhancement and `useActionState` for pending, success, and error states.
- Server Actions are reachable via direct POST, so validation always happens server side.
- Spam protection: honeypot field plus basic server-side rate limiting. No secrets on the client.
- A swappable notifier sits behind the action, so the delivery target (email, database, WhatsApp handoff, CRM) can change without touching the form. The mechanism is a pending decision.
- Nigerian phone number validation tuned to local formats.

## SEO-Ready Architecture

SEO is not implemented yet. The architecture is structured so it can be added later without redesign:

- Centralized metadata defaults and a per-page builder in `lib/content/seo.ts`.
- Real `metadata` export on the root layout and on pages.
- Reserved dynamic routes: `services/[slug]` and `[location]`, built when SEO is implemented.
- Future location pages (for example "Solar Installation in Lagos") become a data plus route addition.
- Not built now: `sitemap.ts`, `robots.ts`, JSON-LD, location pages, service detail pages.

## Scalability

- New services: add an entry to `services.ts` with the right status. No new components required unless the service type genuinely differs.
- New regions: add to coverage data; the future `[location]` route then generates pages from the same data.
- New pages with a different shell (legal, portal): new route group alongside `(marketing)`.
- Fonts, tokens, and primitives are centralized, so rebranding or reskinning touches one place.

## Related Documents

- [Project Overview](./project-overview.md)
- [Design System](./design-system.md)
- [Coding Standards](./coding-standards.md)
- [Implementation Roadmap](./implementation-roadmap.md)
