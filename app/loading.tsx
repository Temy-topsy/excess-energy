import Image from "next/image";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

/**
 * Top-level route loading fallback.
 * Shown during page transitions and dynamic data hydration.
 * Matches the dark/amber brand aesthetic with an energy pulse and status.
 */
export default function Loading() {
  return (
    <Section aria-labelledby="loading-heading" className="py-20 md:py-32">
      <Container className="flex min-h-[50vh] flex-col items-center justify-center gap-5 text-center">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute size-20 rounded-full bg-amber-400/15 blur-lg animate-pulse"
            aria-hidden="true"
          />
          <Image
            src="/images/logos/logo.png"
            alt="Excess Energy"
            width={120}
            height={40}
            priority
            className="h-10 w-auto object-contain relative z-10 opacity-90 drop-shadow-[0_0_15px_rgba(255,193,7,0.3)]"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 text-amber-500">
            <span className="size-2 rounded-full bg-amber-400 animate-ping" />
            <p
              id="loading-heading"
              role="status"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              Energizing system…
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
