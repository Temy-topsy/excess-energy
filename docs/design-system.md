# Design System

The complete token-level design system for the Excess Energy website. This is the single source of truth for color, typography, spacing, grid, containers, radius, shadow, motion, and the responsive system. The "why" behind these choices lives in [Design Philosophy](./design-philosophy.md); the components built from these tokens live in [Components](./components.md).

All tokens are implemented in [app/globals.css](../app/globals.css) using the Tailwind v4 CSS-first approach (`:root`, `.dark`, and `@theme inline`). There is no `tailwind.config.js`. Values below are the design contract; implementation maps them to CSS variables and Tailwind utilities.

## Table of Contents

- [Token Philosophy](#token-philosophy)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing Scale](#spacing-scale)
- [Grid System](#grid-system)
- [Containers and Section Padding](#containers-and-section-padding)
- [Border Radius](#border-radius)
- [Shadow and Elevation](#shadow-and-elevation)
- [Breakpoints and Responsive System](#breakpoints-and-responsive-system)
- [Z-Index Scale](#z-index-scale)
- [Iconography](#iconography)
- [Motion Tokens](#motion-tokens)
- [Imagery Tokens](#imagery-tokens)
- [Dark and Light Modes](#dark-and-light-modes)
- [Related Documents](#related-documents)

## Token Philosophy

- Two-layer tokens. A primitive layer (raw brand values) feeds a semantic layer (`--background`, `--foreground`, `--primary`, and so on). Components only ever reference semantic tokens, never raw hex. This keeps the shadcn contract intact and makes reskinning a one-file change.
- Sharp, solid, industrial. Elevation comes from borders and background steps first, shadow second. Corners are near-square.
- Accessible by construction. The contrast rule is baked into the tokens so misuse is hard, not just discouraged.
- Aligned to Tailwind's defaults where sensible. Spacing and breakpoints follow Tailwind's 4px base and standard breakpoints, so utilities and tokens never disagree.

## Color System

### Brand Primitives

The approved palette. Do not invent additional brand colors unless a genuine UI state requires it.

| Token | Hex | Description |
| --- | --- | --- |
| `--brand-yellow` | `#FFC107` | Primary brand accent. The industrial signal color. |
| `--brand-orange` | `#FF8C00` | Secondary accent. Hover and gradient partner for yellow. |
| `--brand-dark` | `#111111` | Primary dark. Near-black engineering surface. |
| `--brand-dark-2` | `#111111` | Secondary dark. Elevated surface on dark sections. |
| `--brand-white` | `#FFFFFF` | Base light surface and text on dark. |

### Neutral Ramp

A single cool-gray ramp for text, borders, and light-mode surfaces. Values are placeholders in the professional gray family and are finalized in implementation. Kept deliberately small.

| Token | Role |
| --- | --- |
| `--neutral-50` | Lightest background wash |
| `--neutral-100` | Subtle surface, muted background |
| `--neutral-200` | Hairline borders, dividers |
| `--neutral-300` | Strong borders, disabled surfaces |
| `--neutral-500` | Muted text, captions, placeholders |
| `--neutral-700` | Secondary text |
| `--neutral-900` | Primary text (close to `--brand-dark`) |

### Semantic Tokens (the shadcn contract)

Components reference these only. They are defined for both light and dark. This preserves compatibility with the existing [button](../components/ui/button.tsx) and every future shadcn primitive.

| Semantic token | Light value | Purpose |
| --- | --- | --- |
| `--background` | white | Page background |
| `--foreground` | near-black | Default text |
| `--card` | white | Card surface |
| `--card-foreground` | near-black | Text on cards |
| `--popover` / `--popover-foreground` | white / near-black | Menus, popovers |
| `--primary` | `--brand-yellow` | Primary action fill |
| `--primary-foreground` | `--brand-dark` | Text on primary (never white on yellow) |
| `--secondary` | `--brand-dark` | Dark UI surfaces, secondary emphasis |
| `--secondary-foreground` | white | Text on dark surfaces |
| `--accent` | `--brand-orange` | Accents, secondary hover |
| `--accent-foreground` | `--brand-dark` | Text on accent |
| `--muted` | `--neutral-100` | Muted background |
| `--muted-foreground` | `--neutral-500` | Muted text |
| `--border` | `--neutral-200` | Default border |
| `--input` | `--neutral-300` | Input border |
| `--ring` | `--brand-yellow` | Focus ring |
| `--destructive` | red family | Error state |
| `--success` | green family | Success state (new) |
| `--warning` | `--brand-orange` | Warning state |

Dark sections invert to `--brand-dark` and `--brand-dark-2` backgrounds with white text, orange and yellow retained as accents.

### The Contrast Rule (mandatory, WCAG AA)

`#FFC107` on white is roughly 1.6:1, which fails AA for text. Therefore:

- Yellow and orange are for fills, accents, and large non-text elements only.
- Text on a yellow or orange surface is always near-black (`--brand-dark`).
- Yellow or orange text on white is forbidden.
- Body text meets AA (4.5:1); large text (24px or 18.66px bold and up) meets 3:1.
- Focus rings and borders that carry meaning meet 3:1 against their background.

This rule is encoded in `--primary-foreground` and `--accent-foreground` so the tokens themselves prevent the low-contrast combination.

### Functional Colors

State colors for forms and feedback. Kept muted and professional, never candy-bright: `--success`, `--warning` (maps to brand orange), `--destructive`. Each has a paired foreground that meets AA.

## Typography

### Font Families (maximum three)

Chosen to communicate engineering, reliability, power, and professionalism, with excellent readability on mid-range Android. Final pairing is pending approval (roadmap decision 4).

| Role | Proposed family | Fallback stack | Why |
| --- | --- | --- | --- |
| Heading / display | Archivo | system-ui, sans-serif | Industrial grotesque with a strong, slightly technical character. Variable, with tight display performance. |
| Body / UI | Inter | system-ui, sans-serif | Exceptional legibility at small sizes and on low-end screens. Neutral, professional, hardware-friendly hinting. |
| Mono (optional) | IBM Plex Mono | ui-monospace, monospace | For technical figures and statistics (kW, kWh, uptime). Reinforces the engineering voice. Used sparingly. |

Documented alternative pairing if the primary is not approved: Saira for headings, IBM Plex Sans for body.

All families are served through `next/font/google` so they self-host: no layout shift, no third-party request, Latin subset, `display: swap`. This also fixes the current `--font-sans` token, which is mapped to itself but never defined by the layout.

### Type Scale

Base is 16px (`1rem`). The scale is a disciplined step system with fluid `clamp()` on the largest display sizes so the hero scales smoothly from 360px to 1920px without media-query jumps. Line heights tighten as size grows; body stays open for reading.

| Token | Size (mobile to desktop) | Line height | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `text-display` | `clamp(2.75rem, 7vw, 5rem)` (44 to 80px) | 1.05 | 800 | -0.02em | Hero headline only |
| `text-h1` | `clamp(2.25rem, 5vw, 3rem)` (36 to 48px) | 1.1 | 700 | -0.02em | Page titles |
| `text-h2` | `clamp(1.875rem, 4vw, 2.25rem)` (30 to 36px) | 1.15 | 700 | -0.01em | Section headings |
| `text-h3` | `1.5rem` (24px) | 1.2 | 600 | -0.01em | Subsection headings |
| `text-h4` | `1.25rem` (20px) | 1.3 | 600 | normal | Card titles |
| `text-body-lg` | `1.125rem` (18px) | 1.6 | 400 | normal | Lead paragraphs, hero subcopy |
| `text-body` | `1rem` (16px) | 1.6 | 400 | normal | Default body |
| `text-body-sm` | `0.875rem` (14px) | 1.5 | 400 | normal | Secondary text, form help |
| `text-caption` | `0.8125rem` (13px) | 1.4 | 500 | normal | Captions, meta |
| `text-overline` | `0.75rem` (12px) | 1.3 | 600 | 0.08em, uppercase | Section eyebrows, tags |

### Type Rules

- One idea per screen. Never more than one `text-display` or `text-h1` per view.
- Headings use the heading family; body and UI use the body family; mono is for figures only.
- Body copy measure is capped near 65 to 75 characters for readability.
- Weights are limited to 400, 500, 600, 700, and 800 to keep the font payload small.
- Numeric figures in statistics use tabular figures so they align in columns.

## Spacing Scale

A single 4px-based scale, aligned to Tailwind defaults. Every margin, padding, and gap uses a token from this scale. Nothing uses arbitrary pixel values.

| Token | rem | px | Typical use |
| --- | --- | --- | --- |
| `space-1` | 0.25 | 4 | Icon-to-text gaps, hairline offsets |
| `space-2` | 0.5 | 8 | Tight internal padding |
| `space-3` | 0.75 | 12 | Compact control padding |
| `space-4` | 1 | 16 | Base unit, default gap, mobile gutter |
| `space-5` | 1.25 | 20 | Control padding |
| `space-6` | 1.5 | 24 | Card padding, tablet gutter |
| `space-8` | 2 | 32 | Card padding (large), inter-element |
| `space-10` | 2.5 | 40 | Desktop gutter, group spacing |
| `space-12` | 3 | 48 | Sub-section spacing |
| `space-16` | 4 | 64 | Section padding (mobile) |
| `space-20` | 5 | 80 | Section padding (tablet) |
| `space-24` | 6 | 96 | Section padding (desktop) |
| `space-32` | 8 | 128 | Major section breaks (desktop) |
| `space-40` | 10 | 160 | Hero and landmark spacing |

Rule: whitespace is generous and consistent. Sections breathe. Components are never stacked tightly. When in doubt, use the larger step.

## Grid System

Modern CSS Grid and Flexbox. Columns change by breakpoint; everything snaps cleanly to the grid.

| Context | Columns | Gutter | Margin (min) |
| --- | --- | --- | --- |
| Mobile (< 768px) | 4 | 16px (`space-4`) | 16px |
| Tablet (768 to 1023px) | 8 | 24px (`space-6`) | 24px |
| Desktop (>= 1024px) | 12 | 24 to 32px (`space-6` to `space-8`) | 32 to 40px |

Rules:

- Content is placed on the grid, never floated arbitrarily.
- Common desktop layouts: 12 of 12 (full), 8 of 12 (text column), 6 of 12 (split), 4 of 12 (card triple), 3 of 12 (card quad).
- Card grids collapse predictably: 3 or 4 up on desktop, 2 up on tablet, 1 up on mobile.
- Vertical alignment is preserved so the eye can trace grid lines down the page (an Apple principle from [Design Philosophy](./design-philosophy.md)).

## Containers and Section Padding

### Container Widths

| Token | Max width | Use |
| --- | --- | --- |
| `container-prose` | 720px | Long-form reading, legal, single-column text |
| `container-base` | 1280px | Default page content width |
| `container-wide` | 1440px | Wide feature sections |
| `container-full` | 100% | Full-bleed imagery and dark bands |

Containers are centered with responsive horizontal padding: 16px mobile, 24px tablet, 32 to 40px desktop. Content max width and gutters together guarantee the grid margins above.

### Section Padding (vertical rhythm)

Consistent vertical spacing gives the page its calm cadence.

| Breakpoint | Vertical padding | Token |
| --- | --- | --- |
| Mobile | 64px | `space-16` |
| Tablet | 80 to 96px | `space-20` to `space-24` |
| Desktop | 96 to 128px | `space-24` to `space-32` |

The hero and major landmark sections may use the larger end of the scale. Adjacent sections never collide; there is always a clear rest between them.

## Border Radius

Sharp, industrial corners. The starter's `0.625rem` scale is reduced. Base radius drops to 4px, and most surfaces use 2px.

| Token | Value | Use |
| --- | --- | --- |
| `radius-none` | 0 | Full-bleed images, dark bands, dividers |
| `radius-xs` | 2px | Cards, badges, tags, inputs (default surfaces) |
| `radius-sm` | 4px | Buttons, interactive controls |
| `radius-md` | 6px | Maximum radius, rare, only where a control needs it |

There is no large radius token. Giant rounded cards are forbidden. Anything above 6px is out of system.

## Shadow and Elevation

Elevation is expressed through borders and background steps first, shadow second. Shadows are subtle and used only where an element genuinely floats above the page.

| Token | Use | Character |
| --- | --- | --- |
| `shadow-none` | Default for cards and sections | Flat, bordered |
| `shadow-xs` | Resting cards that need separation | Barely perceptible, 1px depth |
| `shadow-sm` | Card hover, subtle lift | Soft, tight |
| `shadow-md` | Dropdowns, popovers, mobile nav sheet | Contained, clearly floating |
| `shadow-lg` | Modals and dialogs only | Strong, focus-stealing, used rarely |

Rules:

- No oversized or glowing shadows.
- A card at rest uses a border, not a shadow. Hover may add `shadow-sm`.
- Never use shadow to fake depth on a flat industrial surface.

## Breakpoints and Responsive System

Mobile first. The base design is authored at 360px and scales up. Layout decisions are validated at every target device width.

| Target width | Device class | Tailwind breakpoint |
| --- | --- | --- |
| 360, 375, 390, 414 | Small to large phones | base (no prefix) |
| 768 | Tablet portrait | `md` |
| 1024 | Tablet landscape, small laptop | `lg` |
| 1280 | Desktop | `xl` |
| 1440 | Large desktop | `2xl` (custom, or `xl` cap) |
| 1920 | Very large desktop | content stays capped at `container-wide`; margins grow |

Rules:

- Design and build at 360 first, then enhance upward. Never design desktop-down.
- Content stops widening at `container-wide`; beyond 1440px the margins grow, not the text measure.
- Touch targets are at least 44 by 44px on all interactive elements at phone sizes.
- Test explicitly at 360, 375, 390, 414, 768, 1024, 1280, 1440, and 1920.

## Z-Index Scale

A small, named layering scale to prevent stacking conflicts.

| Token | Value | Use |
| --- | --- | --- |
| `z-base` | 0 | Normal flow |
| `z-raised` | 10 | Sticky in-flow elements |
| `z-header` | 50 | Sticky site header |
| `z-overlay` | 60 | Backdrops, scrims |
| `z-sheet` | 70 | Mobile nav sheet, drawers |
| `z-modal` | 80 | Dialogs |
| `z-toast` | 90 | Tosplevel notifications |

## Iconography

- Lucide React only.
- Stroke width 2 by default; 1.5 for large decorative icons above 32px.
- Sizes: 16px (inline, small controls), 20px (default UI), 24px (feature and section icons). Feature illustrations may use 32 to 40px.
- Icons align optically with text; the icon-to-text gap is `space-1` or `space-2`.
- Icons are decorative unless they carry meaning; meaningful icons get accessible labels, decorative ones are hidden from assistive tech.

## Motion Tokens

Motion communicates quality and is subtle. CSS transitions everywhere; GSAP only for a few deliberate moments. See [Coding Standards](./coding-standards.md) for implementation rules and [Design Philosophy](./design-philosophy.md) for intent.

| Token | Value | Use |
| --- | --- | --- |
| `duration-fast` | 150ms | Hover, focus, small state changes |
| `duration-base` | 200 to 250ms | Standard transitions, dropdowns |
| `duration-slow` | 300 to 400ms | Larger surfaces, sheet open |
| `ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default easing |
| `ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |

Rules:

- No scroll-reveal animation.
- Not every component animates. Motion is reserved for meaning and quality.
- All motion is disabled or reduced under `prefers-reduced-motion`.
- Animations never block interaction or delay content on low-end devices.

## Imagery Tokens

- Standard aspect ratios: 16:9 (wide feature), 4:3 (service and card imagery), 1:1 (avatars, logos), 3:2 (editorial). Ratios are tokens so containers stay consistent.
- Images sit in fixed-ratio containers to prevent layout shift.
- Corner radius on images is `radius-none` or `radius-xs`.
- Full-bleed images are allowed in hero and dark bands; contained images snap to the grid.
- See [Coding Standards](./coding-standards.md) for the `next/image` and `Media` wrapper implementation and the placeholder strategy.

## Dark and Light Modes

`next-themes` is installed, and tokens carry both a `:root` light set and a `.dark` set. The final decision is pending (roadmap decision 6):

- Option A: a real light and dark toggle for the whole site.
- Option B: a single fixed premium theme that uses the dark brand surfaces for designated sections (hero, CTA bands, footer) while the rest stays light.

Either way, dark sections use `--brand-dark` and `--brand-dark-2` backgrounds with white text and yellow or orange accents. This choice changes how the token structure is finalized and needs confirmation before implementation.

## Related Documents

- [Design Philosophy](./design-philosophy.md)
- [Components](./components.md)
- [Information Architecture](./information-architecture.md)
- [UX and Conversion](./ux-and-conversion.md)
- [Coding Standards](./coding-standards.md)
