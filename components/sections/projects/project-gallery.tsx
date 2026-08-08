import { ImageIcon } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Media } from "@/components/common/media";
import type { ProjectImage } from "@/lib/content/projects";

/**
 * The project gallery. The first image leads at a wide ratio, and the rest fall
 * into a two up grid that collapses to a single column on phones, so the set
 * reads as a considered layout rather than a dump of thumbnails. Every image
 * renders through Media, which reserves its box and shows a branded placeholder
 * until photography is added, so the gallery holds its shape with or without
 * real photos. None of these images preload; they lazy load as the reader
 * scrolls, keeping the detail page light on a mid range phone.
 */
function ProjectGallery({ images }: { images: ProjectImage[] }) {
  if (images.length === 0) return null;

  const [lead, ...rest] = images;

  return (
    <Section aria-labelledby="project-gallery-heading">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionHeading
          overline="Gallery"
          headingId="project-gallery-heading"
          heading="A look at the work."
          lead="From the installed system to the details that make it dependable."
          className="max-w-2xl"
        />

        <div className="flex flex-col gap-6 lg:gap-8">
          <GalleryImage image={lead} ratio="16/9" sizes="(min-width: 1280px) 1216px, 100vw" />

          {rest.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {rest.map((image, index) => (
                <GalleryImage
                  key={index}
                  image={image}
                  ratio="4/3"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/**
 * One gallery tile. Renders the photograph when present and a quiet branded
 * placeholder when not, so the tile keeps its frame either way.
 */
function GalleryImage({
  image,
  ratio,
  sizes,
}: {
  image: ProjectImage;
  ratio: "16/9" | "4/3";
  sizes: string;
}) {
  return (
    <Media
      ratio={ratio}
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      imageProps={image.src ? { placeholder: "blur" } : undefined}
      className="border border-border"
    >
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <ImageIcon className="size-10 text-muted-foreground" aria-hidden="true" />
      </div>
    </Media>
  );
}

export { ProjectGallery };
