# Components

Specifications for every component in the Excess Energy design system. Each entry defines purpose, anatomy, variants, states, and the tokens it uses. These are design contracts, not code. Tokens referenced here are defined in [Design System](./design-system.md); the reasoning behind the visual choices is in [Design Philosophy](./design-philosophy.md).

Nothing here is built yet. Components are implemented in the phases defined by the [Implementation Roadmap](./implementation-roadmap.md), reusing the existing shadcn primitives (starting from [button.tsx](../components/ui/button.tsx)) rather than creating parallel ones.

## Table of Contents

- [Component Principles](#component-principles)
- [Buttons](#buttons)
- [Cards](#cards)
- [Service Cards](#service-cards)
- [Project Cards](#project-cards)
- [Inputs and Form Fields](#inputs-and-form-fields)
- [Forms](#forms)
- [Badges and Tags](#badges-and-tags)
- [Navigation](#navigation)
- [Footer](#footer)
- [FAQ Accordion](#faq-accordion)
- [CTA Components](#cta-components)
- [Statistics Components](#statistics-components)
- [Image Containers](#image-containers)
- [Layout Primitives](#layout-primitives)
- [Reusable Component Inventory](#reusable-component-inventory)
- [Related Documents](#related-documents)

## Component Principles

- A small vocabulary, used consistently. Coherence comes from repetition, not novelty.
- Every component is built from semantic tokens only. No raw hex, no arbitrary spacing.
- Sharp corners, solid surfaces, real borders. No glassmorphism, no oversized shadows.
- Every interactive component has defined hover, focus-visible, active, and disabled states, plus loading where it applies.
- Uniform padding within a component type; consistent heights where appropriate.
- Accessible by default: semantic element, label, focus ring, adequate touch target.

## Buttons

Buttons must feel premium and always look clickable. Built by extending the existing [button.tsx](../components/ui/button.tsx) cva variants, not replacing them. Corners use `radius-sm`.

### Variants

| Variant | Use | Resting style | Text |
| --- | --- | --- | --- |
| Primary | The main conversion action | `--primary` (yellow) fill, `--brand-dark` text | "Request a Free Energy Assessment" |
| Secondary | The supporting action | `--brand-dark` fill, white text | "Request a Quote" |
| Ghost | Low-emphasis action | Transparent fill, `--foreground` text, border on hover | "Learn About Our Process" |
| Outline | Neutral action on light | `--border` outline, transparent fill | Contextual |
| Link | Inline text action | No fill, underline on hover | Contextual |
| Destructive | Rare, dangerous actions | `--destructive` fill | Contextual |

Orange (`--accent`) is the hover partner for the primary yellow, not a separate button variant.

### Sizes

Touch-friendly by default for mobile-first. Minimum target 44px at phone sizes.

| Size | Height | Padding X | Use |
| --- | --- | --- | --- |
| `lg` | 52 to 56px | `space-8` | Hero and primary CTAs |
| `md` (default) | 44 to 48px | `space-6` | Standard actions |
| `sm` | 36 to 40px | `space-4` | Compact contexts, cards |
| `icon` | Square, matches row height | Centered | Icon-only, always with an accessible label |

The starter button ships at `h-8` and `h-9`, which is too small for premium touch CTAs. Sizes are increased as above.

### States

| State | Treatment |
| --- | --- |
| Rest | Solid fill, clear affordance |
| Hover | Primary darkens toward orange; secondary lightens one step; transition `duration-fast` |
| Focus-visible | 2px `--ring` focus ring with offset; always visible, never removed |
| Active | Slight compression (translate or brightness step), immediate feedback |
| Loading | Inline spinner replaces or precedes the label; label may change to a progress verb; button disabled; width preserved to avoid layout shift |
| Disabled | Reduced opacity, `--muted` treatment, no pointer events, cursor not-allowed |

Icons in buttons sit at 20px with a `space-2` gap and align optically with the label.

## Cards

The base surface for grouped content. Premium and solid.

- Surface: `--card` background, `--border` hairline border, `radius-xs`, `shadow-none` at rest.
- Padding: uniform, `space-6` on mobile, `space-8` on larger screens.
- Hover (only when the whole card is a link): border strengthens and `shadow-sm` appears, `duration-fast`.
- Consistent heights within a row where the grid calls for it; content aligns to a baseline.
- No glassmorphism, no gradient fills, no large radius.

## Service Cards

Represents one service. Driven entirely by the `services.ts` data, including the `status` flag (see [Architecture](./architecture.md)).

Anatomy:

- Icon (Lucide, 24 to 32px) or a small service image in a fixed-ratio container.
- Title (`text-h4`).
- One-line description (`text-body-sm`, `--muted-foreground`).
- Optional link affordance; the whole card is the target.

Variants:

- Available: fully interactive, links to the service (or the reserved service detail route later).
- Coming Soon: carries a "Coming Soon" badge, reduced emphasis, not a link, clearly not yet available. This is the single component that lets future services appear without a redesign.

States: rest, hover (available only), focus-visible (available only).

## Project Cards

Represents a completed installation for a portfolio or case study. Reserved for later content but specified now so the system is complete.

Anatomy:

- Image container (16:9 or 4:3), real installation photography.
- Overline (`text-overline`): location or service type.
- Title (`text-h4`): the project name or short descriptor.
- Optional meta row: capacity figure (mono), location, client type.

States: rest, hover (image subtly scales within its fixed container, no layout shift), focus-visible.

## Inputs and Form Fields

Used across the assessment and contact forms.

- Field anatomy: label (always visible, above the control), control, help or error text below.
- Control surface: `--background` fill, `--input` border, `radius-xs`, `space-3` to `space-4` padding, `text-body` size, minimum 44px height.
- Placeholder: `--muted-foreground`, never a substitute for a label.

States:

| State | Treatment |
| --- | --- |
| Rest | `--input` border |
| Focus | `--ring` border and focus ring, `duration-fast` |
| Filled | Standard border, `--foreground` text |
| Error | `--destructive` border, error message below, `aria-invalid`, message linked by `aria-describedby` |
| Disabled | `--muted` surface, reduced opacity |

Control types in scope: text input (Name), tel input (Phone, with Nigerian format handling), select (Service Needed), textarea (Message). A honeypot field is present but visually hidden and hidden from assistive tech.

## Forms

The assessment and contact forms collect only Name, Phone, Service Needed, Message. Full behavior is defined in [UX and Conversion](./ux-and-conversion.md) and [Architecture](./architecture.md).

Component-level rules:

- Vertical single-column layout, generous field spacing (`space-6` between fields).
- One primary submit button (`lg`), full width on mobile.
- Inline validation on blur, authoritative validation on submit.
- Pending, success, and error states surfaced clearly through `useActionState`; the submit button uses its loading state.
- Success replaces the form with a confirmation message and a next step, never a dead end.
- Errors are announced to assistive tech, not signaled by color alone.

## Badges and Tags

Small, non-interactive labels.

- Badge: status marker. Variants: "Coming Soon" (neutral, `--muted`), "Available" (subtle), "Emergency 24/7" (attention, uses orange as a fill with dark text). `radius-xs`, `text-overline`, `space-1` to `space-2` padding.
- Tag: categorization label (service type, location). Quiet by default: `--muted` surface or `--border` outline, `text-caption`.

Both use uppercase overline styling for the industrial voice and never rely on color alone to convey meaning.

## Navigation

### Header

- Persistent, sticky, `z-header`. Minimal and predictable; it never competes with content.
- Anatomy: logo (left), primary nav links (center or right), primary CTA button (right, "Request a Free Energy Assessment"), and a phone or emergency affordance where space allows.
- Desktop: horizontal nav, links use `text-body-sm`, clear hover and focus-visible underline or color step.
- Background: solid `--background` with a hairline bottom border; may become opaque on scroll. No blur, no glass.

### Mobile Navigation

- Trigger: hamburger button, minimum 44px target.
- Panel: a Sheet (shadcn primitive, added when needed) sliding from the side, `z-sheet`, `shadow-md`, solid surface.
- Contents: full nav list at large tap sizes, the primary CTA, and contact and emergency numbers.
- Fully keyboard accessible: focus trap while open, Escape to close, focus returns to the trigger.

### Navigation Rules

- Navigation is data-driven from `nav.ts`, so links update without touching layout.
- The primary CTA is always present in the header at every breakpoint.
- Active route is indicated clearly.

## Footer

- Solid dark surface (`--brand-dark`), white text, orange and yellow accents. This anchors the page and reinforces the industrial brand.
- Content: company name and tagline, navigation columns (services, company, contact), full contact block (both phone numbers, emergency line, email, 24/7 availability), and coverage areas (Ogun, Lagos, Ibadan).
- Layout: multi-column on desktop (grid), stacking to a single column on mobile in a sensible order.
- All contact points are real links: `tel:` for phones, `mailto:` for email.
- Bottom row: copyright and any legal links.

## FAQ Accordion

- Built on the shadcn Accordion primitive (added when needed; requires `rsc: true`, see [Implementation Roadmap](./implementation-roadmap.md)).
- Each item: a question trigger (`text-h4` or `text-body-lg`, full-width, left-aligned) and a collapsible answer (`text-body`).
- Trigger shows a Lucide chevron that rotates on open, `duration-base`, respecting reduced motion.
- One or multiple items open is a content decision; default to one at a time for focus.
- Fully keyboard accessible with correct `aria-expanded` and controls wiring (handled by the primitive).
- Corners `radius-none` or `radius-xs`; dividers are hairline borders.

## CTA Components

Reusable conversion blocks that appear at natural rest points in the page rhythm.

- CTA Band: a full-width section, often a dark surface (`--brand-dark`), with a short heading (`text-h2`), one line of support copy, and the primary plus secondary buttons. Used to close a rhythm and route to the assessment.
- Inline CTA: a smaller prompt inside content, primary button plus one line.
- Sticky mobile CTA (optional, pending decision): a persistent bottom bar on mobile with the primary action, so the ask is always one tap away. Must not obscure content or the form; hidden on the contact page.

CTA copy follows the [Call to Action Rules](./ux-and-conversion.md#call-to-action-rules): approved verbs only, never "Learn More" or "Click Here".

## Statistics Components

Communicates capability and scale plainly, in the technical voice.

- Stat: a large figure (`text-h1` or `text-display`, mono or heading family, tabular figures) with a short label below (`text-overline` or `text-body-sm`, `--muted-foreground`).
- Stat Group: a row of 2 to 4 stats on a grid, stacking on mobile. Even spacing, aligned baselines.
- Figures are real and specific (for example installations completed, coverage areas, response time, warranty length). Never invented for decoration.
- Optional subtle count-up on the figure using GSAP, one deliberate moment only, disabled under reduced motion. Not a scroll-reveal.

## Image Containers

- Fixed-ratio wrapper (`Media` component) around `next/image`, so every image reserves its space and never causes layout shift.
- Ratios from the imagery tokens: 16:9, 4:3, 1:1, 3:2.
- Corner radius `radius-none` (full-bleed) or `radius-xs` (contained).
- Consistent handling of format, sizing, lazy loading, and blur-up placeholder; only the hero image is `priority`.
- Placeholders now, swappable for real industrial photography in one place later. See [Coding Standards](./coding-standards.md).

## Layout Primitives

The structural components that enforce the grid and rhythm so pages stay aligned.

- Container: centers content and applies responsive max width and horizontal padding, per the container tokens.
- Section: applies vertical section padding and optional surface (light or dark band), so vertical rhythm is consistent across the site.
- Grid: a helper expressing the 12, 8, and 4 column system with the correct gutters.
- SectionHeading: an overline plus heading plus optional lead, with consistent spacing, used at the top of most sections.

## Reusable Component Inventory

The full set the system provides. Built progressively per the roadmap, reusing existing shadcn primitives.

Primitives (shadcn `components/ui`, extended not replaced):

- Button (exists)
- Input, Textarea, Select, Label
- Badge
- Accordion (FAQ)
- Sheet (mobile nav)
- Separator, Skeleton (as needed)

Layout (`components/layout`):

- Container
- Section
- Grid
- Header
- Footer
- MobileNav

Common (`components/common`):

- Media (image container)
- SectionHeading
- ComingSoonBadge
- Stat, StatGroup
- Tag

Sections (`components/sections`):

- Hero
- ServicesGrid (uses ServiceCard)
- WhyUs (uses trust items)
- Process (uses Stat and step items)
- Coverage
- CTASection (CTA Band)
- Faq (uses Accordion)

Cards (within common or sections):

- ServiceCard
- ProjectCard

Forms (`components/forms`):

- AssessmentForm / ContactForm
- Form field components

This inventory maps directly to the folder structure in [Architecture](./architecture.md).

## Related Documents

- [Design Philosophy](./design-philosophy.md)
- [Design System](./design-system.md)
- [Information Architecture](./information-architecture.md)
- [UX and Conversion](./ux-and-conversion.md)
- [Architecture](./architecture.md)
- [Implementation Roadmap](./implementation-roadmap.md)
