# Implementation Roadmap

The ordered plan for building the Excess Energy website, including the decisions that must be confirmed before work starts.

## Table of Contents

- [How to Use This Document](#how-to-use-this-document)
- [Decisions Required Before Implementation](#decisions-required-before-implementation)
- [Phase 0: Approve the Plan](#phase-0-approve-the-plan)
- [Phase 1: Foundation](#phase-1-foundation)
- [Phase 2: Shared Building Blocks](#phase-2-shared-building-blocks)
- [Phase 3: Pages and Sections](#phase-3-pages-and-sections)
- [Phase 4: Forms and Submission](#phase-4-forms-and-submission)
- [Phase 5: Verification and Polish](#phase-5-verification-and-polish)
- [Later, Out of Current Scope](#later-out-of-current-scope)
- [Related Documents](#related-documents)

## How to Use This Document

This is the plan for the current build: the home page, services overview, and contact page. Phases are ordered so later phases build on earlier ones. The plan is a guide; the exact work in each phase is confirmed before starting it, and nothing in the later phases is started without explicit direction.

## Decisions Required Before Implementation

These were surfaced during planning and need confirmation before code is written. New top-level folders, config changes, dependencies, or significant architecture all require approval per the project rules.

1. **`rsc: true` fix**: [components.json](../components.json) currently has `rsc: false`, which would break stateful shadcn primitives (mobile nav sheet, FAQ accordion, theme toggle) when rendered as Server Components. Confirm flipping it to `rsc: true`.
2. **Route group**: approve `app/(marketing)/` as the home of the public site (no URL impact).
3. **Data layer**: approve `lib/content/`, `lib/schemas/`, and `lib/actions/` as subfolders of existing `lib/`.
4. **Font pairing**: the proposed pairing is Archivo (headings) plus Inter (body), with IBM Plex Mono as an optional third for technical figures. See [Design System](./design-system.md#font-families-maximum-three). Any brand fonts already in use override this.
5. **Form delivery**: where submissions go. Email (for example Resend or SMTP), a database, a WhatsApp handoff, or logging until a backend exists. Determines whether a new dependency is needed.
6. **Dark mode**: a real light/dark toggle (`next-themes` is installed) versus a single fixed premium theme using dark brand colors for designated sections. Changes the token structure.
7. **Empty `src/` folder**: leave it unused (recommended) or remove it.
8. **Sticky mobile CTA**: whether to include a persistent bottom CTA bar on mobile so the primary action is always one tap away. Recommended, hidden on the contact page. See [Components](./components.md#cta-components).

## Phase 0: Approve the Plan

- Confirm the decisions above.
- Confirm the plan in this document and the related docs.

## Phase 1: Foundation

- Fix `components.json` (`rsc: true`) if approved.
- Wire brand fonts through the root layout and `next/font/google`; fix the `--font-sans` token mapping in [app/globals.css](../app/globals.css).
- Map brand colors into theme tokens; enforce the contrast rule. Adjust the radius scale for sharp corners.
- Set up the root metadata in [app/layout.tsx](../app/layout.tsx) with the company basics from `lib/content/company.ts`.
- Create the `(marketing)` route group shell (header, footer, skip link) if approved.

## Phase 2: Shared Building Blocks

- Create `lib/content/` data modules: company, services, nav, seo.
- Build the `Media` wrapper around `next/image` for consistent image handling.
- Add shadcn primitives as needed (sheet for mobile nav, accordion for FAQ).
- Build shared layout and common components: `Container`, `Section`, `SectionHeading`, `ComingSoonBadge`.
- Adjust button sizing for touch-friendly CTAs on mobile-first layouts.

## Phase 3: Pages and Sections

Home page sections, in funnel order (see [UX and Conversion](./ux-and-conversion.md)):

- Hero with primary and secondary CTAs.
- Services grid driven by `services.ts`, including "Coming Soon" cards.
- Why Excess Energy trust section.
- Process section.
- Coverage section (Ogun, Lagos, Ibadan).
- CTA band into the assessment form.
- Footer with contact details.

Then:

- Services overview page.
- Contact page with the form.

## Phase 4: Forms and Submission

- Build the zod schema in `lib/schemas` for Name, Phone, Service Needed, Message.
- Build the Server Action in `lib/actions` with server-side validation, honeypot, and rate limiting, backed by the swappable notifier.
- Build the client form with react-hook-form and `useActionState` for pending, success, and error states.

## Phase 5: Verification and Polish

- Run the production build and TypeScript compile as gates; fix all errors.
- Check mobile-first behavior at 360 to 414px widths.
- Verify reduced-motion behavior, focus states, and form error states.
- Performance check: client bundle, lazy loading, images.

## Later, Out of Current Scope

Built later, on direction:

- Service detail pages via `services/[slug]`.
- SEO implementation: `sitemap.ts`, `robots.ts`, JSON-LD, metadata per page, and location pages via `[location]` (for example "Solar Installation in Lagos").
- Real photography swap via the `Media` wrapper.
- New services already architected: Excess CCTV, Excess Smart Homes, Excess EV, Excess Energy Monitoring, Excess Industrial Solutions.
- New regions beyond Ogun, Lagos, and Ibadan.
- Any delivery mechanism decided in the decisions list, if it is a backend.

## Related Documents

- [Project Overview](./project-overview.md)
- [Design Philosophy](./design-philosophy.md)
- [Design System](./design-system.md)
- [Components](./components.md)
- [Information Architecture](./information-architecture.md)
- [Architecture](./architecture.md)
- [UX and Conversion](./ux-and-conversion.md)
- [Coding Standards](./coding-standards.md)
