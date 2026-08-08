import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

/**
 * The projects listing hero. A text-led editorial opening rather than a media
 * panel, so the portfolio grid below carries the imagery and the page stays
 * uncluttered. Left aligned to match the other secondary page heroes.
 */
function ProjectsHero() {
  return (
    <Section
      aria-labelledby="projects-hero-heading"
      className="relative isolate overflow-hidden"
    >
      <Container className="flex max-w-3xl flex-col gap-6">
        <h1
          id="projects-hero-heading"
          className="text-h1 text-foreground text-balance sm:text-display"
        >
          Clean energy, installed and proven.
        </h1>
        <p className="max-w-xl text-body-lg text-muted-foreground text-pretty">
          A look at the solar, storage, and security systems we have designed
          and installed for homes and businesses across Nigeria.
        </p>
      </Container>
    </Section>
  );
}

export { ProjectsHero };
