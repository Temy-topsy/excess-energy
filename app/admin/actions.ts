"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminSupabase } from "@/lib/cms/supabase";
import { revalidatePath } from "next/cache";

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get("password");
  const validPassword = process.env.ADMIN_DASHBOARD_PASSWORD;

  if (password === validPassword) {
    const cookieStore = await cookies();
    cookieStore.set("admin-token", validPassword as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    cookieStore.set("admin-last-active", Date.now().toString(), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
    redirect("/admin/packages");
  }

  return { error: "Invalid password" };
}

export async function logoutAction(arg?: FormData | string) {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  cookieStore.delete("admin-last-active");
  if (typeof arg === "string" && arg) {
    redirect(`/admin/login?reason=${encodeURIComponent(arg)}`);
  }
  redirect("/admin/login");
}

export async function updatePackageAction(slug: string, prevState: any, formData: FormData) {
  const adminSupabase = getAdminSupabase();
  
  const updates = {
    name: formData.get("name"),
    seo_title: formData.get("seo_title"),
    seo_description: formData.get("seo_description"),
  };

  const { error } = await adminSupabase
    .from("solar_packages")
    .update(updates)
    .eq("slug", slug);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/services/excess-solar/${slug}`);
  revalidatePath("/admin/packages");
  
  return { success: true };
}

export async function uploadImageAction(slug: string, fieldType: "package_image" | "inverter_image" | "panel_image", formData: FormData) {
  const adminSupabase = getAdminSupabase();
  const file = formData.get("image") as File;
  
  if (!file || file.size === 0) {
    return { error: "No file provided" };
  }

  const fileName = `${slug}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  
  const { error: uploadError } = await adminSupabase.storage
    .from("packages-media")
    .upload(fileName, file);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const { data } = adminSupabase.storage.from("packages-media").getPublicUrl(fileName);
  const publicUrl = data.publicUrl;

  const { error: updateError } = await adminSupabase
    .from("solar_packages")
    .update({ [fieldType]: publicUrl })
    .eq("slug", slug);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath(`/services/excess-solar/${slug}`);
  revalidatePath("/admin/packages");

  return { success: true, url: publicUrl };
}

export async function createPackageAction(prevState: any, formData: FormData) {
  const adminSupabase = getAdminSupabase();
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  if (!name || !slug) return { error: "Name and slug are required" };

  const newPackage = {
    name,
    slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    href: `/services/excess-solar/${slug.toLowerCase().replace(/[^a-z0-9-]/g, "-")}`,
    package_image: "",
    package_alt: `${name} package`,
    inverter_image: "",
    panel_image: "",
    benefits: [],
    faq: [],
    seo_title: `${name} Solar Package`,
    seo_description: `Learn more about our ${name} solar package.`,
  };

  const { error } = await adminSupabase.from("solar_packages").insert(newPackage);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/packages");
  
  redirect(`/admin/packages/${newPackage.slug}`);
}

export async function deletePackageAction(slug: string) {
  const adminSupabase = getAdminSupabase();
  const { error } = await adminSupabase.from("solar_packages").delete().eq("slug", slug);

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/packages");

  return { success: true };
}
