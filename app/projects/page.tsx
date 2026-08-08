import type { Metadata } from "next";

import { projects, featuredProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/content/seo";
import { JsonLd } from "@/components/common/json-ld";
import { breadcrumbSchema } from "@/lib/content/structured-data";
import { PageHero } from "@/components/sections/hero/page-hero";
import { ProjectsIntro } from "@/components/sections/projects/projects-intro";
import { ProjectShowcase } from "@/components/sections/projects/project-showcase";
import { CtaSection } from "@/components/sections/cta/cta-section";
import projectsHeroDesktop from "@/public/images/hero/projects-hero-desktop.jpg";
import projectsHeroMobile from "@/public/images/hero/projects-hero-mobile.jpg";

/**
 * The projects listing page. It reads entirely from the projects data: a
 * featured rail and the full grid are both rendered by the shared
 * ProjectShowcase, so adding a project to the data adds it here with no code
 * change. The full grid carries a stable id so a filter control can mount above
 * it later without a redesign.
 */

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Completed solar, battery storage, inverter, CCTV, and solar street lighting installations by Excess Energy across Ogun, Lagos, and Ibadan.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <PageHero
        heading="Clean energy, installed and proven."
        description="A look at the solar, storage, and security systems we have designed and installed for homes and businesses across Nigeria."
        desktopImage={projectsHeroDesktop}
        mobileImage={projectsHeroMobile}
        imageAlt="Excess Energy Projects"
      />
      <ProjectsIntro />
      <ProjectShowcase
        overline="Featured projects"
        heading="Selected work."
        lead="A closer look at installations that show the range of what we design and deliver."
        headingId="featured-projects-heading"
        projects={featuredProjects}
        tone="default"
        cols={3}
      />
      <ProjectShowcase
        overline="All projects"
        heading="The full portfolio."
        lead="Every installation we have completed, newest work included as it lands."
        headingId="all-projects-heading"
        projects={projects}
        tone="muted"
        cols={3}
        sectionId="all-projects"
      />
      <CtaSection
        heading="Have a project in mind?"
        lead="Start with a free energy assessment and we will design a system built around your needs."
        headingId="projects-cta-heading"
      />
    </>
  );
}
