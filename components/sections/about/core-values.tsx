import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
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
          className="max-w-2xl"
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {coreValues.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-sm border border-border bg-background px-4 py-5 text-center transition-colors duration-[var(--duration-fast)] hover:border-foreground/20 hover:bg-muted/50 sm:min-h-32 sm:gap-4 sm:px-6"
              >
                <Icon
                  className="size-6 text-accent sm:size-7"
                  aria-hidden="true"
                />
                <h3 className="text-body-lg font-semibold text-foreground">
                  {value.title}
                </h3>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export { CoreValues };
