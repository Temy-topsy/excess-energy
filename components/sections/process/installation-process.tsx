import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { processSteps } from "@/lib/content/process";

/**
 * The installation process, presented as a numbered stepper read from the
 * process data. On phones it is a vertical timeline: numbered nodes joined by a
 * connector down the left edge. From large screens up it turns into a single
 * horizontal flow, six nodes joined by a track, so the whole journey reads at a
 * glance. The connectors are drawn per step relative to its own node, so the
 * geometry holds whatever the column widths are, and the last step never trails
 * a line. Hovering a step lifts its node to accent, a quiet CSS cue only.
 *
 * A server component; every step is data, so reordering or adding one is a
 * content change, never a layout one.
 */

function InstallationProcess() {
  return (
    <Section id="process" aria-labelledby="process-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="How it works"
          headingId="process-heading"
          heading="A clear path from first call to lasting power."
          lead="Six steps, one team, and no surprises along the way."
          className="max-w-2xl"
        />

        <ol className="relative grid gap-y-10 lg:grid-cols-6 lg:gap-x-6 lg:gap-y-0">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === processSteps.length - 1;

            return (
              <li
                key={step.title}
                className="group relative flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center"
              >
                {/* Connectors: a vertical run to the next node on mobile, a
                    horizontal run on desktop. Both start at this node's centre
                    and reach the next one, and neither renders on the last step. */}
                {!isLast ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute top-11 -bottom-10 left-[1.375rem] w-px -translate-x-1/2 bg-border lg:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-[1.375rem] left-1/2 hidden h-px w-[calc(100%+1.5rem)] -translate-y-1/2 bg-border lg:block"
                    />
                  </>
                ) : null}

                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-card font-mono text-body-sm font-semibold text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:border-accent group-hover:text-accent">
                  {index + 1}
                </span>

                <div className="flex flex-col gap-2 pt-1 lg:items-center lg:pt-0">
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  <h3 className="text-body-lg font-semibold text-foreground text-balance">
                    {step.title}
                  </h3>
                  <p className="text-body-sm text-muted-foreground text-pretty">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export { InstallationProcess };
