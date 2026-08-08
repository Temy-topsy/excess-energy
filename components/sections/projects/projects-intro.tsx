import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";

/**
 * A short introduction to the portfolio: a two column editorial block that sets
 * how we approach a project before the grids below show the work. Copy is
 * qualitative and carries no invented figures, matching the About page voice.
 */
function ProjectsIntro() {
  return (
    <Section tone="muted" aria-labelledby="projects-intro-heading">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          overline="Our approach"
          headingId="projects-intro-heading"
          heading="Every project starts with a real energy problem."
        />

        <div className="flex flex-col gap-5">
          <p className="text-body-lg text-foreground text-pretty">
            We do not sell systems off a shelf. Each installation begins with an
            assessment of how a home or business actually uses energy, then a
            design sized to that demand and the outcome the client is after.
          </p>
          <p className="text-body text-muted-foreground text-pretty">
            The projects below show that approach across solar, battery storage,
            inverters, security, and street lighting. Every one is installed by
            our own team and backed by a one year warranty and ongoing support.
          </p>
        </div>
      </Container>
    </Section>
  );
}

export { ProjectsIntro };
