import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";

/**
 * The contact hero. Text led and left aligned to match the other secondary page
 * heroes. It sets a plain, human invitation to get in touch before the methods
 * and form below carry the detail.
 */
function ContactHero() {
  return (
    <Section
      aria-labelledby="contact-hero-heading"
      className="relative isolate overflow-hidden"
    >
      <Container className="flex max-w-3xl flex-col gap-6">
        <h1
          id="contact-hero-heading"
          className="text-h1 text-foreground text-balance sm:text-display"
        >
          Talk to a real energy team.
        </h1>
        <p className="max-w-xl text-body-lg text-muted-foreground text-pretty">
          Call, email, or start a WhatsApp chat. Tell us what you need and we
          will point you to the right next step, usually the same day.
        </p>
      </Container>
    </Section>
  );
}

export { ContactHero };
