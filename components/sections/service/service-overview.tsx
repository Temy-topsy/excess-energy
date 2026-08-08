import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import type { ServiceDetail } from "@/lib/content/service-details";

/**
 * The service overview: the long form description set as readable prose beside a
 * quiet section header. Two columns on large screens so the header anchors the
 * left while the paragraphs carry the right; a single stacked column on phones.
 * Paragraphs are data, so the copy for each service lives in one place.
 */
function ServiceOverview({ detail }: { detail: ServiceDetail }) {
  return (
    <Section tone="muted" aria-labelledby="overview-heading">
      <Container className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          overline="Overview"
          headingId="overview-heading"
          heading="What this service covers."
        />
        <div className="flex max-w-prose flex-col gap-5">
          {detail.overview.map((paragraph, index) => (
            <p
              key={index}
              className="text-body-lg text-muted-foreground text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { ServiceOverview };
