import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Media } from "@/components/common/media";
import { aboutHero } from "@/lib/content/about";

/**
 * The About page hero. An asymmetric two column composition echoing the homepage
 * hero: the page heading and a short supporting line on the left, the media
 * panel on the right, stacking to a single column on phones with the heading
 * first. The image is a static import, so it ships an automatic blur placeholder
 * and correct dimensions with no layout shift, and preloads as the page's one
 * above the fold image.
 */
function AboutHero() {
  return (
    <Section
      aria-labelledby="about-hero-heading"
      className="relative isolate overflow-hidden"
    >
      <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <h1 id="about-hero-heading" className="text-h1 text-foreground text-balance">
            {aboutHero.heading}
          </h1>
          <p className="max-w-xl text-body-lg text-muted-foreground text-pretty">
            {aboutHero.description}
          </p>
        </div>

        <Media
          ratio="4/3"
          src={aboutHero.media.src}
          alt={aboutHero.media.alt}
          preload
          sizes="(min-width: 1024px) 45vw, 100vw"
          imageProps={{ placeholder: "blur" }}
          className="lg:justify-self-end"
        />
      </Container>
    </Section>
  );
}

export { AboutHero };
