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
          lead="The strengths behind every installation, from the first visit to long after handover."
          className="max-w-2xl"
        />

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {whyExcess.map((strength) => {
            const Icon = strength.icon;
            return (
              <div key={strength.title} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xs bg-primary/15 text-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1.5">
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
