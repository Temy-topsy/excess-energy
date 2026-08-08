# UX and Conversion

The user experience strategy for the Excess Energy website. The site exists for conversion, not information, so this document defines the funnel, the pages, and the rules that every design decision follows.

## Table of Contents

- [UX Principles](#ux-principles)
- [The Funnel](#the-funnel)
- [Conversion Principles](#conversion-principles)
- [Page Plan](#page-plan)
- [The Assessment Form](#the-assessment-form)
- [Call to Action Rules](#call-to-action-rules)
- [Accessibility and UX](#accessibility-and-ux)
- [Related Documents](#related-documents)

## UX Principles

The experience rules that sit above any single page. They come from the reference study in [Design Philosophy](./design-philosophy.md) and govern how the site behaves.

- Clarity over cleverness. A visitor understands what Excess Energy does within seconds of arriving.
- One idea per screen. Each section makes a single point, then hands off to the next.
- Guide the eye. Layout, rhythm, and CTA placement lead the visitor toward the assessment request; nothing is left to chance.
- Reduce friction at every step. The path from interest to request is short, and the form asks for the minimum.
- Never a dead end. Every screen offers a clear next action; success states set the next expectation.
- The ask is always reachable. The primary CTA is present in the header at every breakpoint and one or two taps away throughout.
- Trust before the ask. Credibility (coverage, process, real figures, real contact details) is established before conversion is requested.
- Speed is UX. On mid-range Android, a fast page is part of the experience, not separate from it. See [Coding Standards](./coding-standards.md).
- Consistency builds confidence. A small, repeated component vocabulary makes the site feel engineered and reliable.

The full journey, sitemap, navigation, and homepage wireframe are defined in [Information Architecture](./information-architecture.md).

## The Funnel

The visitor journey:

Learn, then Trust, then Request a Free Energy Assessment, then Contact, then become a customer.

Every section, heading, and call to action either advances a visitor along this path or it gets cut. The home page is built as this funnel in order.

## Conversion Principles

- The primary conversion action is "Request a Free Energy Assessment". Everything else supports it.
- Secondary conversion is "Request a Quote".
- Trust must be earned before the ask: coverage, real contact details, professional installation, and a clear process all build it.
- The ask is always visible and always one or two taps away.
- Nothing distracts from the funnel: no irrelevant content, no dead ends, no vague CTAs.

## Page Plan

Home page sections, in funnel order:

1. Hero: tagline "Power Beyond Limits", primary CTA "Request a Free Energy Assessment", secondary CTA "Request a Quote".
2. Services grid: the six current services, with future services shown as clearly marked "Coming Soon" cards driven by the data `status` flag.
3. Why Excess Energy / trust signals: reliability, professional installation, coverage.
4. Process: how an assessment to installation works, reinforcing trust.
5. Coverage: Ogun, Lagos, and Ibadan now, with a nationwide framing for later.
6. Strong CTA band into the assessment form.
7. Footer: contact details, phones, emergency line, email, 24/7 availability, navigation.

Additional routes built now:

- Services overview page (available services plus "Coming Soon").
- Contact page containing the form.

Reserved, not built now: service detail pages and location pages. See [Architecture](./architecture.md).

The section-by-section homepage wireframe is in [Information Architecture](./information-architecture.md#homepage-wireframe).

## The Assessment Form

Collects only what is needed, nothing unnecessary:

- Name
- Phone number
- Service needed
- Message

Behavior:

- One zod schema shared between client and server, so validation is consistent.
- Clear labels, obvious focus states, and visible error messages.
- Pending, success, and error states handled through `useActionState`.
- Spam protection via honeypot and server-side rate limiting.
- Submission must never appear to hang on a low-end phone.

See the forms section in [Architecture](./architecture.md) for the mechanics.

## Call to Action Rules

- Primary CTA text: "Request a Free Energy Assessment".
- Secondary CTA text: "Request a Quote".
- Forbidden: "Learn More", "Read More", "Click Here".
- Buttons must look clickable: clear fill, contrast, affordance, adequate touch target.

## Accessibility and UX

- Semantic landmarks: header, main, footer, nav.
- Skip link to main content.
- Visible focus rings on all interactive elements.
- Form fields labeled, errors announced, not just colored.
- Alt text on all imagery; decorative images marked as such.
- Contrast checked against WCAG AA; see the contrast rule in [Design System](./design-system.md).
- Full WCAG conformance requires manual assistive-technology testing; it is called out, not assumed.

## Related Documents

- [Project Overview](./project-overview.md)
- [Design Philosophy](./design-philosophy.md)
- [Design System](./design-system.md)
- [Components](./components.md)
- [Information Architecture](./information-architecture.md)
- [Architecture](./architecture.md)
- [Coding Standards](./coding-standards.md)
