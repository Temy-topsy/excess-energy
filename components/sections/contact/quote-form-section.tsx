import { MessageSquare, PhoneCall, PenLine } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Card } from "@/components/ui/card";
import { QuoteForm } from "@/components/forms/quote-form";

/**
 * The quote form in context. The form sits in a card on the left as the focus,
 * with a short three step "what happens next" on the right so the visitor knows
 * exactly what follows a submission. The form is the only client island; the
 * steps are static.
 */

const steps = [
  {
    icon: PenLine,
    title: "Share the essentials",
    body: "Five quick fields, no account and no back and forth to get started.",
  },
  {
    icon: MessageSquare,
    title: "We review it",
    body: "Your details arrive on WhatsApp and our team looks over what you need.",
  },
  {
    icon: PhoneCall,
    title: "We come back with a quote",
    body: "We reply with a quote and the right next step.",
  },
];

function QuoteFormSection() {
  return (
    <Section tone="muted" id="quote-form" aria-labelledby="quote-form-heading">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Card className="p-6 sm:p-8">
          <SectionHeading
            overline="Your details"
            headingId="quote-form-heading"
            heading="Request your quote."
            className="mb-8"
          />
          <QuoteForm />
        </Card>

        <div className="flex flex-col gap-8 lg:pt-4">
          <h3 className="text-h4 text-foreground">What happens next</h3>
          <ol className="flex flex-col gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="relative flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/15 text-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent text-[0.6875rem] font-semibold text-accent-foreground">
                      {index + 1}
                    </span>
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-body font-medium text-foreground">
                      {step.title}
                    </span>
                    <span className="text-body-sm text-muted-foreground text-pretty">
                      {step.body}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

export { QuoteFormSection };
