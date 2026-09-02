import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Media } from "@/components/common/media";
import type { Project } from "@/lib/content/projects";

/**
 * The project detail hero pairs a quiet link back to the portfolio and project
 * title with the lead image. The remaining images lazy load in the gallery below.
 */
function ProjectHero({ project }: { project: Project }) {
  return (
    <Section
      data-hero
      spacing="none"
      aria-labelledby="project-hero-heading"
      className="relative isolate overflow-hidden"
    >
      <Container className="flex flex-col">
        <div className="flex flex-col justify-center gap-10 py-12 sm:py-16 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-20">
          <div className="flex flex-col gap-6 sm:gap-7">
            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-1.5 rounded-xs text-body-sm font-medium text-muted-foreground outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowLeft className="size-4 shrink-0" aria-hidden="true" />
              Back to all projects
            </Link>

            <div className="flex flex-col gap-5">
              <h1
                id="project-hero-heading"
                className="text-h1 text-foreground text-balance sm:text-display"
              >
                {project.title}
              </h1>
            </div>

          </div>

          <div className="relative lg:justify-self-end lg:w-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-md border border-border/80 sm:translate-x-4 sm:translate-y-4"
            />
            <Media
              ratio="4/3"
              src={project.images[0].src}
              alt={project.images[0].alt}
              objectFit="contain"
              preload
              sizes="(min-width: 1024px) 46vw, 100vw"
              imageProps={{ placeholder: "blur" }}
              className="relative border border-border shadow-lg"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { ProjectHero };
