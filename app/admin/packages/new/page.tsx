"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createPackageAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function NewPackagePage() {
  const [state, formAction, isPending] = useActionState(createPackageAction, null);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/packages">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Package</h1>
          <p className="text-muted-foreground mt-1">Add a new solar package to the system.</p>
        </div>
      </div>

      <Card className="p-6">
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input id="name" name="name" placeholder="e.g. 10kVA Premium" required />
            <p className="text-xs text-muted-foreground">The public-facing name of the package.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input id="slug" name="slug" placeholder="e.g. 10kva-premium" required />
            <p className="text-xs text-muted-foreground">Used in the URL: /services/excess-solar/10kva-premium</p>
          </div>

          {state?.error && (
            <p className="text-sm text-destructive font-medium">{state.error}</p>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
            Create Package
          </Button>
        </form>
      </Card>
    </div>
  );
}
