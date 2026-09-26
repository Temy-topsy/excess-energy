import { ReactNode } from "react";
import { Container } from "@/components/layout/container";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 py-20">
      <Container>
        {children}
      </Container>
    </div>
  );
}
