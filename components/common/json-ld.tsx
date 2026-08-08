import * as React from "react";

/**
 * Renders a JSON-LD structured data block. The payload is our own trusted data
 * from lib/content, but it is still serialized defensively: `<` is escaped to
 * its unicode form so a stray value can never break out of the script element.
 * This is the standard safe way to inline JSON-LD; the alternative, printing
 * text nodes, is not valid inside a script of this type.
 *
 * A server component with no client cost. Pass one schema object per instance,
 * or an array for a combined graph.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // Trusted, escaped JSON-LD; text nodes are invalid inside this script type.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export { JsonLd };
