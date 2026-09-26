"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePackageAction } from "@/app/admin/actions";

export function DeletePackageButton({ slug }: { slug: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this package? This action cannot be undone.")) {
      startTransition(async () => {
        await deletePackageAction(slug);
      });
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="size-4 animate-spin" /> : "Delete"}
    </Button>
  );
}
