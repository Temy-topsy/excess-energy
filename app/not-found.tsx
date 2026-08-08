import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * The 404 page. A calm, on-brand dead end that never leaves a visitor stranded:
 * it names what happened and offers the two most useful ways back into the
 * site. Next serves this for unmatched routes and unlisted dynamic slugs, and
 * marks it noindex automatically. A server component with no client cost.
 */

export default function NotFound() {
  return (
    <Section aria-labelledby="notfound-heading">
      <Container className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <h1
            id="notfound-heading"
            className="text-h1 text-foreground text-balance"
          >
            We could not find that page.
          </h1>
          <p className="max-w-prose text-body-lg text-muted-foreground text-pretty">
            The page may have moved or never existed. Let us point you back to
            solid ground.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/">Back to home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/services">Browse services</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
