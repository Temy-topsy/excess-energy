import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/content/projects";
import { buildMetadata } from "@/lib/content/seo";
import { JsonLd } from "@/components/common/json-ld";
import { breadcrumbSchema } from "@/lib/content/structured-data";
import { ProjectHero } from "@/components/sections/projects/project-hero";
import { ProjectGallery } from "@/components/sections/projects/project-gallery";
import { CtaSection } from "@/components/sections/cta/cta-section";

/**
 * The one template every project detail page shares. It reads a project from
 * the projects data and composes the sections in a fixed order that tells the
 * three images followed by a closing call to action. A new project needs no
 * page implementation; adding it to the data generates its route at build.
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
      <ProjectGallery images={project.images.slice(1)} />
      <CtaSection
        heading="Have a project like this in mind?"
        lead="Start with a free energy assessment and we will design a system built around your needs."
        headingId="project-cta-heading"
      />
    </>
  );
}
