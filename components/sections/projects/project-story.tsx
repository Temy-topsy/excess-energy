import { CircleCheckBig, Lightbulb, TriangleAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import type { Project } from "@/lib/content/projects";

/**
 * The heart of the story: challenge, solution, and outcome read as one
 * connected narrative rather than three loose cards. Each step is an icon chip
 * on a shared vertical spine, so the eye travels problem to result in order.
 * The copy comes straight from the project data and carries no invented
 * metrics, matching the factual voice used across the site.
 */

const steps = [
  {
    key: "challenge" as const,
    label: "The challenge",
    icon: TriangleAlert,
  },
  {
    key: "solution" as const,
    label: "The solution",
    icon: Lightbulb,
  },
  {
    key: "result" as const,
    label: "The outcome",
    icon: CircleCheckBig,
  },
];

function ProjectStory({ project }: { project: Project }) {
  return (
    <Section tone="muted" aria-labelledby="project-story-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="How we solved it"
          headingId="project-story-heading"
          heading="From problem to result."
          lead="Every installation starts with a real constraint. Here is the one we designed around and what it delivered."
          className="max-w-2xl"
        />

        <ol className="flex flex-col">
          {steps.map((step, index) => (
            <StoryStep
              key={step.key}
              label={step.label}
              icon={step.icon}
              body={project[step.key]}
              isLast={index === steps.length - 1}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/**
 * One step on the spine: an icon chip with a connector line running to the next
 * step, and the step's label and prose alongside. The connector is dropped on
 * the final step so the line ends cleanly.
 */
function StoryStep({
  label,
  icon: Icon,
  body,
  isLast,
}: {
  label: string;
  icon: LucideIcon;
  body: string;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-5 sm:gap-6">
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-6 top-12 h-[calc(100%-1.5rem)] w-px bg-border"
        />
      ) : null}

      <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-background text-accent">
        <Icon className="size-5" aria-hidden="true" />
      </span>

      <div className={isLast ? "flex flex-col gap-2" : "flex flex-col gap-2 pb-10 sm:pb-12"}>
        <h3 className="text-overline uppercase text-muted-foreground">{label}</h3>
        <p className="max-w-prose text-body-lg text-foreground text-pretty">{body}</p>
      </div>
    </li>
  );
}

export { ProjectStory };
