"use client";

import { useEffect } from "react";

import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * The route error boundary. It catches unexpected runtime errors in a page and
 * its children and shows a recoverable fallback rather than a blank screen. The
 * retry() prop re-renders the segment, which clears transient failures without a
 * full reload. Error boundaries must be Client Components.
 *
 * The error is logged to the console; wire a reporting service here in the
 * useEffect when one is chosen. The message is not shown to visitors, since
 * server error messages are intentionally opaque in production.
 */

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section aria-labelledby="error-heading">
      <Container className="flex flex-col items-center gap-8 text-center">
        <div className="flex max-w-2xl flex-col items-center gap-4">
          <h1
            id="error-heading"
            className="text-h1 text-foreground text-balance"
          >
            That did not go as planned.
          </h1>
          <p className="max-w-prose text-body-lg text-muted-foreground text-pretty">
            An unexpected error interrupted this page. You can try again, or head
            back home and pick up from there.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => retry()}
          >
            Try again
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
