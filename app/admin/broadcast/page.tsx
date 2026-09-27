import { AdminHeader } from "@/components/admin/admin-header";
import { BroadcastComposer } from "./broadcast-composer";
import { getSubscribers } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBroadcastPage() {
  const { subscribers, error } = await getSubscribers();

  return (
    <div className="space-y-6">
      <AdminHeader />
      <BroadcastComposer subscribers={subscribers} dbError={error} />
    </div>
  );
}
