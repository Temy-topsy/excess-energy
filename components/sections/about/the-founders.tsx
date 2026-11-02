import { Mail } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { foundersSection } from "@/lib/content/about";

/**
 * The Founders section: pure editorial typography and structured card layout.
 * No AI stock photos or avatars — crisp, professional, and matching Excess Energy's
 * established brand cadence and palette.
 */
export function TheFounders() {
  return (
    <Section id="founders" tone="muted" aria-labelledby="founders-heading">
      <Container className="flex flex-col gap-12 sm:gap-14">
        <SectionHeading
          overline={foundersSection.overline}
          headingId="founders-heading"
          heading={foundersSection.heading}
          lead={foundersSection.lead}
          className="max-w-3xl"
        />

        {/* Dual Founder Cards */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {foundersSection.founders.map((founder) => (
            <article
              key={founder.name}
              className="flex flex-col justify-between rounded-sm border border-border bg-card p-6 sm:p-8 transition-colors duration-[var(--duration-fast)] hover:border-foreground/20"
            >
              <div className="flex flex-col gap-5">
                <header className="flex flex-col gap-2 border-b border-border pb-5">
                  <span className="text-overline uppercase tracking-wider text-accent font-medium">
                    {founder.role}
                  </span>
                  <h3 className="text-h3 text-foreground font-semibold">
                    {founder.name}
                  </h3>
                  <a
                    href={`mailto:${founder.email}`}
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Email ${founder.name} at ${founder.email}`}
                  >
                    <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{founder.email}</span>
                  </a>
                </header>

                <div className="flex flex-col gap-3.5 text-body text-muted-foreground leading-relaxed">
                  {founder.bio.map((paragraph) => (
                    <p key={paragraph} className="text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Founders' Shared Vision Statement */}
        <div className="rounded-sm border border-border bg-background p-6 sm:p-10 lg:p-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="text-overline uppercase tracking-widest text-accent font-medium">
              Our Vision as Founders
            </span>
            <blockquote className="text-h2 text-foreground font-semibold text-balance sm:text-h1">
              &ldquo;{foundersSection.vision.quote}&rdquo;
            </blockquote>
            <p className="text-body-lg text-muted-foreground text-pretty max-w-2xl">
              {foundersSection.vision.body}
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-body-sm font-semibold tracking-wide text-foreground">
              {foundersSection.vision.motto}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
