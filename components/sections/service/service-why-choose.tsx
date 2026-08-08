import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { ValueCard } from "@/components/common/value-card";
import { whyUsReasons } from "@/lib/content/why-us";

/**
 * Why choose Excess Energy: the company-wide reasons to trust the work, shared
 * by every service page so the promise stays identical everywhere. The reasons
 * come from the same why-us data the homepage uses, so there is one source for
 * this message across the site.
 */
function ServiceWhyChoose() {
  return (
    <Section tone="muted" aria-labelledby="why-choose-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Why choose us"
          headingId="why-choose-heading"
          heading="Why work with Excess Energy."
          lead="The same standard stands behind every service we install and support."
          className="max-w-2xl"
        />

        <Grid cols={3} gap="lg">
          {whyUsReasons.map((reason) => (
            <ValueCard
              key={reason.title}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export { ServiceWhyChoose };
