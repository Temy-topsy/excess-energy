import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { ValueCard } from "@/components/common/value-card";
import { coreValues } from "@/lib/content/about";

/**
 * Core values as a grid of reusable ValueCards, three across on desktop and
 * stacking down to one on phones. Values are data, so adding or reordering one
 * is a content change and never touches this layout.
 */
function CoreValues() {
  return (
    <Section tone="muted" aria-labelledby="values-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Core values"
          headingId="values-heading"
          heading="The principles behind the work."
          lead="The principles that shape how we design, install, and support every system."
          className="max-w-2xl"
        />

        <Grid cols={3} gap="lg">
          {coreValues.map((value) => (
            <ValueCard
              key={value.title}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export { CoreValues };
