import { Clock, MapPin, ShieldCheck } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { company } from "@/lib/content/company";

/**
 * The contact form in context: a short, reassuring column on the left and the
 * form itself on the right. The id on the section gives the header CTA and any
 * on page link a stable anchor to scroll the form into view. The form is the one
 * client island here; everything around it is static.
 */

const reassurances = [
  {
    icon: Clock,
    title: "Same day reply",
    body: `Lines open ${company.availability}, so your message never waits long.`,
  },
  {
    icon: ShieldCheck,
    title: "No obligation",
    body: "The assessment is free and yours to act on, or not.",
  },
  {
    icon: MapPin,
    title: "Across the region",
    body: `Serving ${company.coverageAreas.join(", ")}, and growing.`,
  },
];

function ContactFormSection() {
  return (
    <Section id="contact-form" aria-labelledby="contact-form-heading">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            overline="Send a message"
            headingId="contact-form-heading"
            heading="Tell us what you need."
            lead="Share a few details and our team will come back to you with the right next step."
          />

          <ul className="flex flex-col gap-5">
            {reassurances.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/15 text-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-body font-medium text-foreground">
                      {item.title}
                    </span>
                    <span className="text-body-sm text-muted-foreground text-pretty">
                      {item.body}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Card className="p-6 sm:p-8">
          <ContactForm />
        </Card>
      </Container>
    </Section>
  );
}

export { ContactFormSection };
