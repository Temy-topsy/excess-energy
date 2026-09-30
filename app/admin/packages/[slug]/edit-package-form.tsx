"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import type { SolarPackage } from "@/lib/content/packages";
import { updatePackageAction, uploadImageAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function EditPackageForm({ pkg }: { pkg: SolarPackage }) {
  const updateWithSlug = updatePackageAction.bind(null, pkg.slug);
  const [updateState, formAction, isPending] = useActionState(updateWithSlug, null);

  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "package_image" | "inverter_image" | "panel_image") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(field);
    const formData = new FormData();
    formData.append("image", file);
    
    const res = await uploadImageAction(pkg.slug, field, formData);
    if (res.error) {
      alert(`Upload failed: ${res.error}`);
    } else {
      alert("Image updated successfully!");
    }
    setUploadingImage(null);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/packages">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit {pkg.name}</h1>
          <p className="text-muted-foreground mt-1">Manage details and images for {pkg.slug}</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* TEXT DETAILS FORM */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Package Details</h2>
          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" name="name" defaultValue={pkg.name} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_title">SEO Title</Label>
              <Input id="seo_title" name="seo_title" defaultValue={pkg.seo.title} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seo_description">SEO Description</Label>
              <Textarea 
                id="seo_description" 
                name="seo_description" 
                defaultValue={pkg.seo.description} 
                required 
                rows={4}
              />
            </div>

            {updateState?.error && (
              <p className="text-sm text-destructive font-medium">{updateState.error}</p>
            )}
            {updateState?.success && (
              <p className="text-sm text-green-500 font-medium">Successfully saved changes!</p>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              Save Text Details
            </Button>
          </form>
        </Card>

        {/* IMAGES FORM */}
        <div className="space-y-6">
          <ImageUploadCard 
            title="Main Package Image" 
            field="package_image" 
            currentUrl={pkg.packageImage} 
            isUploading={uploadingImage === "package_image"}
            onUpload={(e) => handleImageUpload(e, "package_image")} 
          />
          <ImageUploadCard 
            title="Inverter Installation Image" 
            field="inverter_image" 
            currentUrl={pkg.inverterImage} 
            isUploading={uploadingImage === "inverter_image"}
            onUpload={(e) => handleImageUpload(e, "inverter_image")} 
          />
          <ImageUploadCard 
            title="Panel Installation Image" 
            field="panel_image" 
            currentUrl={pkg.panelImage} 
            isUploading={uploadingImage === "panel_image"}
            onUpload={(e) => handleImageUpload(e, "panel_image")} 
          />
        </div>
      </div>
    </div>
  );
}

function ImageUploadCard({ 
  title, 
  field, 
  currentUrl, 
  isUploading, 
  onUpload 
}: { 
  title: string, 
  field: string, 
  currentUrl: string, 
  isUploading: boolean, 
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void 
}) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="flex gap-6 items-center">
        <div className="relative h-24 w-32 shrink-0 flex items-center justify-center overflow-hidden rounded-md border border-border bg-muted text-muted-foreground">
          {currentUrl ? (
            <Image src={currentUrl} alt={title} fill className="object-cover" unoptimized />
          ) : (
            <span className="text-xs font-medium">None</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor={field} className="cursor-pointer">
            <div className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              {isUploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {isUploading ? "Uploading..." : "Upload New Image"}
            </div>
          </Label>
          <Input 
            id={field} 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={onUpload}
            disabled={isUploading} 
          />
          <p className="text-xs text-muted-foreground">JPEG, PNG or WebP</p>
        </div>
      </div>
    </Card>
  );
}
