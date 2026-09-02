import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Media } from "@/components/common/media";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/content/projects";

/**
 * One featured project, driven by the projects data. The whole card is a single
 * link to the project's future detail page: a stretched pseudo element on the
 * title makes the full surface the hit target, so the "View Project" control
 * stays a styled, non interactive affordance rather than a nested second link.
 * That keeps one clear tab stop and a large touch target for mobile.
 *
 * The cover renders through Media, so a missing image degrades to a quiet
 * placeholder box instead of breaking the layout, and real photography drops in
 * by changing the data.
 */
function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Card
      interactive
      className={cn("group relative overflow-hidden p-0", className)}
    >
      <Media
        ratio="4/3"
        src={project.images[0].src}
        alt={project.images[0].alt}
        sizes="(min-width: 640px) 45vw, 100vw"
        imageProps={{
          placeholder: "blur",
          className: "object-contain",
        }}
        className="rounded-none border-b border-border"
      />

      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <h3 className="text-h4 text-foreground">
          <Link
            href={project.href}
            className="rounded-xs outline-none transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] after:absolute after:inset-0 after:rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        {/* Styled like an outline button but intentionally non interactive: the
            card's stretched title link owns the navigation and the click. */}
        <span className="mt-auto inline-flex h-10 w-full items-center justify-center gap-2 rounded-sm border border-input px-4 text-sm font-semibold text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:border-accent group-hover:text-accent sm:w-auto">
          View Project
          <ArrowRight
            className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)] group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Card>
  );
}

export { ProjectCard };
