import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { companyStory } from "@/lib/content/about";

/**
 * The company story: a two column editorial block with the heading on the left
 * and a short run of paragraphs on the right, stacking on phones. The opening
 * paragraph is set a step larger to lead the eye in. Copy is data, kept concise
 * and human, with no invented figures.
 */
function CompanyStory() {
  return (
    <Section tone="muted" aria-labelledby="story-heading">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          overline={companyStory.overline}
          headingId="story-heading"
          heading={companyStory.heading}
        />

        <div className="flex flex-col gap-5">
          {companyStory.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-body-lg text-foreground text-pretty"
                  : "text-body text-muted-foreground text-pretty"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { CompanyStory };
