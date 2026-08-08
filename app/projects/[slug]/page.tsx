import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProjectBySlug,
  getProjectSlugs,
  getRelatedProjects,
} from "@/lib/content/projects";
import { getServiceBySlug } from "@/lib/content/services";
import { buildMetadata } from "@/lib/content/seo";
import { JsonLd } from "@/components/common/json-ld";
import { breadcrumbSchema } from "@/lib/content/structured-data";
import type { Service } from "@/lib/content/types";
import { ProjectHero } from "@/components/sections/projects/project-hero";
import { ProjectOverview } from "@/components/sections/projects/project-overview";
import { ProjectGallery } from "@/components/sections/projects/project-gallery";
import { ProjectStory } from "@/components/sections/projects/project-story";
import { ProjectServicesUsed } from "@/components/sections/projects/project-services-used";
import { ProjectShowcase } from "@/components/sections/projects/project-showcase";
import { CtaSection } from "@/components/sections/cta/cta-section";

/**
 * The one template every project detail page shares. It reads a project from
 * the projects data and composes the sections in a fixed order that tells the
 * story: hero, overview, gallery, the challenge to outcome spine, the services
 * behind it, related work, and a closing call to action. A new project needs no
 * code here; adding it to the data generates its page at build. The project set
 * is known, so any slug off the list is a genuine 404.
 */

/** Prerender one page per project. */
export function generateStaticParams(): { slug: string }[] {
  return getProjectSlugs().map((slug) => ({ slug }));
}

/** The project set is known, so anything off the list is a genuine 404. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/projects/${slug}`,
    ogType: "article",
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Resolve the project's service slugs to full records, dropping any that no
  // longer exist so a stale slug never breaks the page.
  const services = project.servicesUsed
    .map((serviceSlug) => getServiceBySlug(serviceSlug))
    .filter((service): service is Service => Boolean(service));

  const related = getRelatedProjects(slug, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${slug}` },
        ])}
      />
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery images={project.gallery} />
      <ProjectStory project={project} />
      <ProjectServicesUsed services={services} />
      <ProjectShowcase
        overline="More work"
        heading="Related projects."
        lead="Other installations that share an approach or a service with this one."
        headingId="related-projects-heading"
        projects={related}
        tone="muted"
        cols={3}
      />
      <CtaSection
        heading="Have a project like this in mind?"
        lead="Start with a free energy assessment and we will design a system built around your needs."
        headingId="project-cta-heading"
      />
    </>
  );
}
