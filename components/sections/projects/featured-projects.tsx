import { ProjectShowcase } from "@/components/sections/projects/project-showcase";
import { featuredProjects } from "@/lib/content/projects";

/**
 * The home page's featured projects teaser: a short, curated pair of featured
 * installations that invites visitors into the full portfolio at /projects. It
 * delegates to the shared ProjectShowcase so the card rail stays identical to
 * the listing page, and shows only featured projects so the section stays
 * curated as the portfolio grows.
 */
function FeaturedProjects() {
  return (
    <ProjectShowcase
      overline="Featured projects"
      heading="Installations built to last."
      lead="A look at the solar and battery systems we design, install, and stand behind."
      headingId="projects-heading"
      projects={featuredProjects.slice(0, 2)}
      tone="muted"
      cols={2}
    />
  );
}

export { FeaturedProjects };
