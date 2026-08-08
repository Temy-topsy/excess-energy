import { LoaderCircle } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

/**
 * The top-level loading fallback, shown by Suspense during navigations before a
 * route's content is ready. Most pages are statically prerendered so this
 * rarely appears, but it keeps transitions from flashing an empty <main>. The
 * spinner is decorative; the status is announced through role="status" text,
 * and the animation stops under reduced-motion preferences.
 */

export default function Loading() {
  return (
    <Section aria-labelledby="loading-heading">
      <Container className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <LoaderCircle
          className="size-8 animate-spin text-accent motion-reduce:animate-none"
          aria-hidden="true"
        />
        <p
          id="loading-heading"
          role="status"
          className="text-body text-muted-foreground"
        >
          Loading…
        </p>
      </Container>
    </Section>
  );
}
