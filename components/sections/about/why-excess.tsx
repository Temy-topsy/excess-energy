import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { whyExcess } from "@/lib/content/about";

/**
 * Why Excess Energy: the strengths behind every installation, set as a calm two
 * column list of icon, title, and one supporting line rather than cards, so the
 * seven points read as a considered capability list and stay distinct from the
 * values grid above. Content is data; the copy avoids marketing superlatives.
 */
function WhyExcess() {
  return (
    <Section aria-labelledby="why-excess-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Why choose us"
          headingId="why-excess-heading"
          heading="The fundamentals we get right."
          className="max-w-2xl"
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {whyExcess.map((strength) => {
            const Icon = strength.icon;
            return (
              <div
                key={strength.title}
                className="flex flex-col gap-4 rounded-sm border border-border bg-card p-4 transition-colors duration-[var(--duration-fast)] last:col-span-2 hover:border-foreground/20 sm:p-6 lg:last:col-span-1"
              >
                <Icon
                  className="size-6 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-lg font-semibold text-foreground">
                    {strength.title}
                  </h3>
                  <p className="text-body-sm text-muted-foreground text-pretty">
                    {strength.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export { WhyExcess };
