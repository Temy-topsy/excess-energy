import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * The marker for services that are architected but not yet live. A thin wrapper
 * over Badge so the label and icon stay consistent everywhere it appears.
 */
function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <Badge variant="coming-soon" className={cn(className)}>
      <Clock aria-hidden="true" />
      Coming Soon
    </Badge>
  );
}

export { ComingSoonBadge };
