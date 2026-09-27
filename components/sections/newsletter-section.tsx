import { Container } from "@/components/layout/container";
import { NewsletterBox } from "@/components/common/newsletter-box";

export function NewsletterSection() {
  return (
    <section aria-label="Newsletter Subscription" className="py-10 md:py-14">
      <Container>
        <NewsletterBox />
      </Container>
    </section>
  );
}
