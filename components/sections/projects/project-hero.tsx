import Link from "next/link";
import { ArrowLeft, Calendar, Layers, MapPin } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Media } from "@/components/common/media";
import type { Project } from "@/lib/content/projects";

/**
 * The project detail hero. Text led and editorial: a quiet link back to the
 * portfolio, the title, a short description, and a compact meta row that carries
 * the project's identity (where, when, and the installed capacity) in one place,
 * so no later section has to repeat it.
 *
 * The cover renders through Media, so it degrades to a branded placeholder when
 * a project ships without photography. It is the one preloaded image on the
 * page; every gallery image below lazy loads.
 */
function ProjectHero({ project }: { project: Project }) {
  return (
    <Section
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
              <p className="max-w-xl text-body-lg text-muted-foreground text-pretty">
                {project.description}
              </p>
            </div>

            <dl className="mt-1 flex flex-wrap gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1">
                <dt className="text-overline uppercase text-muted-foreground">
                  Location
                </dt>
                <dd className="inline-flex items-center gap-1.5 text-body-sm font-medium text-foreground">
                  <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {project.location}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-overline uppercase text-muted-foreground">
                  Completed
                </dt>
                <dd className="inline-flex items-center gap-1.5 text-body-sm font-medium text-foreground">
                  <Calendar className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {project.completionDate}
                </dd>
              </div>
              {project.capacity ? (
                <div className="flex flex-col gap-1">
                  <dt className="text-overline uppercase text-muted-foreground">
                    Capacity
                  </dt>
                  <dd className="inline-flex items-center gap-1.5 text-body-sm font-medium text-foreground">
                    <Layers className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    {project.capacity}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="relative lg:justify-self-end lg:w-full">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-md border border-border/80 sm:translate-x-4 sm:translate-y-4"
            />
            <Media
              ratio="4/3"
              src={project.coverImage}
              alt={project.coverAlt ?? ""}
              preload={Boolean(project.coverImage)}
              sizes="(min-width: 1024px) 46vw, 100vw"
              imageProps={project.coverImage ? { placeholder: "blur" } : undefined}
              className="relative border border-border shadow-lg"
            >
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="flex size-20 items-center justify-center rounded-md bg-primary/15 text-foreground">
                  <Layers className="size-10" aria-hidden="true" />
                </span>
              </div>
            </Media>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { ProjectHero };
