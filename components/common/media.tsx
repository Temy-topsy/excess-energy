import * as React from "react";
import Image, { type ImageProps, type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

/**
 * A fixed ratio media frame. It reserves its aspect box up front so the layout
 * never shifts and never depends on a specific asset being present. When a
 * source is supplied it renders an optimised, filled next/image; when it is not
 * it renders a quiet branded placeholder in the same box. That is what lets the
 * hero ship today and swap in real installation photography or a background
 * video later with no structural change.
 *
 * Server component by design: there is no interactivity here, so it stays out
 * of the client bundle.
 */

type MediaRatio = "16/9" | "4/3" | "3/2" | "1/1";

const ratioClass: Record<MediaRatio, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
};

interface MediaProps extends React.ComponentProps<"div"> {
  ratio?: MediaRatio;
  /** Image source. A static import also supplies its own blur placeholder. */
  src?: string | StaticImageData;
  alt?: string;
  /**
   * Preload the image. Use only for above the fold media such as the hero, and
   * only once per page. Replaces the deprecated `priority` prop in Next 16.
   */
  preload?: boolean;
  /** Responsive sizes hint, forwarded to next/image. */
  sizes?: string;
  objectFit?: "cover" | "contain";
  imageProps?: Partial<Omit<ImageProps, "src" | "alt" | "fill">>;
  /** Rendered inside the frame when no `src` is set: the placeholder content. */
  children?: React.ReactNode;
}

function Media({
  ratio = "16/9",
  src,
  alt = "",
  preload = false,
  sizes = "100vw",
  objectFit = "cover",
  imageProps,
  className,
  children,
  ...props
}: MediaProps) {
  return (
    <div
      data-slot="media"
      className={cn(
        "relative isolate overflow-hidden rounded-md bg-muted",
        ratioClass[ratio],
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          preload={preload}
          loading={preload ? "eager" : undefined}
          sizes={sizes}
          className={cn(
            objectFit === "cover" ? "object-cover" : "object-contain",
          )}
          {...imageProps}
        />
      ) : (
        children
      )}
    </div>
  );
}

export { Media };
export type { MediaProps, MediaRatio };
