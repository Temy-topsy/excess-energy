"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Mail, ExternalLink, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/admin/actions";

export function AdminHeader() {
  const pathname = usePathname();

  const isPackages = pathname.startsWith("/admin/packages");
  const isBroadcast = pathname.startsWith("/admin/broadcast");

  return (
    <header className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div className="flex flex-wrap items-center gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">
            Excess Energy CMS
          </span>
          <h2 className="text-lg font-bold text-foreground">Management Portal</h2>
        </div>

        <nav className="flex items-center gap-2 border-l border-border pl-6">
          <Link
            href="/admin/packages"
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              isPackages
                ? "bg-amber-500 text-slate-950 font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
            Solar Packages
          </Link>
          <Link
            href="/admin/broadcast"
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              isBroadcast
                ? "bg-amber-500 text-slate-950 font-semibold"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Mail className="h-4 w-4" />
            Email Broadcast
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Site</span>
          </Link>
        </Button>
        <form action={logoutAction}>
          <Button variant="outline" size="sm" type="submit" className="flex items-center gap-1.5">
            <LogOut className="h-3.5 w-3.5" />
            <span>Log Out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
