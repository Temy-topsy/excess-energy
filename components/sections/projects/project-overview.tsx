import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import type { Project } from "@/lib/content/projects";

/**
 * The project overview: the full story told as running prose beside a short
 * heading. A two column editorial band, the same shape used across the About and
 * projects intro pages, so the narrative opens the detail page in a familiar
 * rhythm before the gallery and the challenge and solution spine below.
 */
function ProjectOverview({ project }: { project: Project }) {
  if (project.fullStory.length === 0) return null;

  return (
    <Section tone="muted" aria-labelledby="project-overview-heading">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          overline="Overview"
          headingId="project-overview-heading"
          heading="The project in full."
        />

        <div className="flex flex-col gap-5">
          {project.fullStory.map((paragraph, index) => (
            <p
              key={index}
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

export { ProjectOverview };
