# Coding Standards

How code is written and maintained on the Excess Energy project. These are enduring rules, not task notes. They cover engineering conventions, performance goals, implementation rules for images, fonts, and motion, and the working rules for changing this repository.

## Table of Contents

- [Engineering Principles](#engineering-principles)
- [Working Rules for This Repository](#working-rules-for-this-repository)
- [Performance Goals](#performance-goals)
- [Images](#images)
- [Fonts](#fonts)
- [Animation](#animation)
- [Accessibility](#accessibility)
- [Verification](#verification)
- [Prose and Comment Style](#prose-and-comment-style)
- [Related Documents](#related-documents)

## Engineering Principles

- Clean architecture with reusable components. No duplicate code.
- Semantic HTML throughout.
- Accessibility best practices by default, not as an afterthought.
- Optimize every image and every font.
- Lazy load where it helps.
- Maintainable, readable code.
- Modern React and Next.js best practices for this version (App Router, Server Components, Server Actions).
- Match the existing project style, conventions, and libraries. Do not introduce a parallel library where one is already chosen.

## Working Rules for This Repository

These govern how changes are made. They hold for the life of the project.

- Inspect the existing project structure before making changes.
- Never create duplicate folders, files, components, utilities, hooks, types, or configuration when a suitable one already exists.
- Read through the `docs/` folder before executing work.
- Reuse and extend the existing architecture where possible.
- Create a new file or folder only when genuinely required and no suitable location exists.
- Before creating any new top-level folder, configuration file, or dependency, or making a significant architectural change, ask for approval first.
- Never rename, move, or delete existing files unless explicitly requested.
- Follow the current structure and conventions consistently.
- Make the smallest correct change needed to complete the task.

Per AGENTS.md, this Next.js version may differ from common knowledge; read the relevant guide in `node_modules/next/dist/docs/` before writing code and heed deprecation notices.

## Performance Goals

The target device is a mid-range or low-end Android phone. Performance is a feature.

- Keep pages as Server Components; push `"use client"` to the smallest interactive leaves.
- Watch the client JavaScript budget. Radix primitives and GSAP are the main weights, so they stay lazy and scoped.
- Mobile first: design and test at 360, 375, 390, and 414px before scaling up.
- Prefer CSS over JavaScript for anything that can be done in CSS.

## Images

- Use `next/image` everywhere, through a single `Media` wrapper component, so format, sizing, lazy loading, and blur-up stay consistent.
- Local static imports auto-provide dimensions and a blur placeholder. Remote images require `images.remotePatterns` in `next.config` plus explicit dimensions.
- Only the hero image is marked `priority`. Everything else lazy loads.
- Placeholders now, swappable for real professional industrial photography in one place later.
- Prefer WebP. No generic AI imagery.

## Fonts

- Serve fonts through `next/font/google` so they self-host: no layout shift, no third-party request.
- `display: swap`, Latin subsetting.
- Maximum three families; see [Design System](./design-system.md).
- Apply fonts through the root layout via CSS variables mapped to the theme tokens.

## Animation

- CSS transitions for the vast majority of motion.
- GSAP only for a few deliberate moments, loaded lazily and client-side, never in the critical path.
- No scroll-reveal animations. No heavy timelines.
- Gate all motion behind `prefers-reduced-motion`.

See the motion section in [Design System](./design-system.md) for the design intent behind these rules.

## Accessibility

- Semantic landmarks, a skip link, and visible focus states.
- Labeled form fields with announced errors.
- Alt text on all imagery.
- Meet WCAG AA contrast; the brand contrast rule is in [Design System](./design-system.md).
- Full WCAG conformance requires manual assistive-technology testing and expert review; state this rather than claiming conformance.

## Verification

- No test framework is configured. Treat `tsc` and the production build as the gates.
- After a code change, run the build or compile step before presenting results; run relevant tests when they exist.
- Fix errors surfaced by verification before calling work done.
- Clean up any temporary files created during verification.

## Prose and Comment Style

Follow [Cursor_Rule.md](./Cursor_Rule.md) for dash usage in all prose, code comments, commit messages, and documentation. In short: do not use em or en dashes as a substitute for commas, parentheses, colons, or periods; rewrite with standard punctuation instead. En dashes only for numeric ranges. Em dashes only sparingly for a genuine interruption.

## Related Documents

- [Project Overview](./project-overview.md)
- [Architecture](./architecture.md)
- [Design System](./design-system.md)
- [UX and Conversion](./ux-and-conversion.md)
- [Cursor_Rule.md](./Cursor_Rule.md)
