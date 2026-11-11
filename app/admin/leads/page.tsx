import { AdminHeader } from "@/components/admin/admin-header";
import { getSalesLeads } from "./actions";
import { LeadsManager } from "./leads-manager";

export const metadata = {
  title: "Sales & Leads Management | Excess Energy CMS",
};

export default async function AdminLeadsPage() {
  const { leads, error } = await getSalesLeads();

  return (
    <div className="space-y-6">
      <AdminHeader />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sales & Inquiries</h1>
          <p className="text-muted-foreground mt-1">
            Track customer requests, quote pipeline, and closed revenue.
          </p>
        </div>
      </div>

      <LeadsManager initialLeads={leads} dbError={error} />
    </div>
  );
}
