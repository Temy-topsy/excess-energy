import { Section, type SectionTone } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectCard } from "@/components/common/project-card";
import type { Project } from "@/lib/content/projects";

/**
 * A titled rail of project cards. One layout for every place projects appear in
 * a grid: the home page's featured teaser, and the listing page's featured and
 * full grids. The heading, tone, columns, and the projects shown are all props,
 * so each usage differs by data alone and the card layout lives in one place.
 */
function ProjectShowcase({
  overline,
  heading,
  lead,
  headingId,
  projects,
  tone = "default",
  cols = 3,
  sectionId,
}: {
  overline: string;
  heading: React.ReactNode;
  lead?: React.ReactNode;
  headingId: string;
  projects: Project[];
  tone?: SectionTone;
  cols?: 2 | 3;
  /** Optional DOM id on the section, for anchor links and future filter UI. */
  sectionId?: string;
}) {
  if (projects.length === 0) return null;

  return (
    <Section tone={tone} id={sectionId} aria-labelledby={headingId}>
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline={overline}
          headingId={headingId}
          heading={heading}
          lead={lead}
          className="max-w-2xl"
        />

        <Grid cols={cols} gap="lg">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export { ProjectShowcase };
