import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeading } from "@/components/common/section-heading";
import { Card } from "@/components/ui/card";
import { missionVision } from "@/lib/content/about";

/**
 * Mission and vision, shown as two premium statement cards. Each pairs an icon
 * and a short accent label with the statement itself, set large so it reads as a
 * commitment rather than body copy. Two cards side by side on tablet and up, one
 * per row on phones. The statements are data, so their wording lives in one place.
 */
function MissionVision() {
  return (
    <Section aria-labelledby="mission-vision-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Mission and vision"
          headingId="mission-vision-heading"
          heading="What drives us forward."
          className="max-w-2xl"
        />

        <Grid cols={2} gap="lg">
          {missionVision.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="gap-6 p-8">
                <span className="flex size-12 items-center justify-center rounded-xs bg-primary/15 text-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-3">
                  <span className="text-overline text-accent uppercase">
                    {item.label}
                  </span>
                  <p className="text-h4 text-foreground text-pretty">
                    {item.statement}
                  </p>
                </div>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}

export { MissionVision };
