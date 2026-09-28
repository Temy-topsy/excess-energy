import { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { AdminInactivityTracker } from "@/components/admin/admin-inactivity-tracker";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 py-20">
      <AdminInactivityTracker />
      <Container>
        {children}
      </Container>
    </div>
  );
}

