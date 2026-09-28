import { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { AdminInactivityTracker } from "@/components/admin/admin-inactivity-tracker";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20 py-20">
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var path = window.location.pathname;
                var isLogin = path === '/admin/login';
                var cookies = document.cookie.split('; ');
                var hasInit = cookies.some(function(c) { return c.indexOf('admin-session-init=1') === 0; });
                if (hasInit) {
                  sessionStorage.setItem('admin_session_active', '1');
                  document.cookie = 'admin-session-init=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                }
                if (!isLogin && !sessionStorage.getItem('admin_session_active')) {
                  document.cookie = 'admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                  document.cookie = 'admin-last-active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                  window.location.replace('/admin/login');
                }
              } catch (e) {}
            })();
          `,
        }}
      />
      <AdminInactivityTracker />
      <Container>
        {children}
      </Container>
    </div>
  );
}

