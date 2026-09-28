"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/admin/actions";

const INACTIVITY_TIMEOUT_MS = 60 * 1000; // 1 minute
const WARNING_THRESHOLD_SECONDS = 15;

export function AdminInactivityTracker() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const [showWarning, setShowWarning] = useState(false);

  const lastActivityRef = useRef<number>(Date.now());
  const lastCookieUpdateRef = useRef<number>(Date.now());
  const isLoggingOutRef = useRef<boolean>(false);

  const performLogout = useCallback(async (reason: string = "inactivity") => {
    if (isLoggingOutRef.current) return;
    isLoggingOutRef.current = true;

    try {
      sessionStorage.removeItem("admin_session_active");
      localStorage.removeItem("admin_last_active");
      document.cookie = "admin-last-active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "admin-session-init=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch {
      // ignore
    }

    try {
      await logoutAction(reason);
    } catch {
      window.location.href = `/admin/login${reason ? `?reason=${encodeURIComponent(reason)}` : ""}`;
    }
  }, []);

  const resetTimer = useCallback(() => {
    const now = Date.now();
    lastActivityRef.current = now;
    setShowWarning(false);
    setSecondsRemaining(60);

    // Throttle cookie and localStorage updates to every 5 seconds
    if (now - lastCookieUpdateRef.current > 5000) {
      lastCookieUpdateRef.current = now;
      try {
        localStorage.setItem("admin_last_active", now.toString());
        document.cookie = `admin-last-active=${now}; path=/; max-age=604800; SameSite=Lax`;
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (isLoginPage) return;

    // Check if session is active in this tab
    if (!sessionStorage.getItem("admin_session_active")) {
      performLogout("");
      return;
    }

    // Initialize timestamps on mount
    const now = Date.now();
    lastActivityRef.current = now;
    lastCookieUpdateRef.current = now;
    try {
      localStorage.setItem("admin_last_active", now.toString());
      document.cookie = `admin-last-active=${now}; path=/; SameSite=Lax`;
    } catch {
      // ignore
    }

    // Activity event listeners
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "wheel"];
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Handle clicks that navigate outside /admin in the current tab
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");
      if (
        href &&
        !href.startsWith("/admin") &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        targetAttr !== "_blank"
      ) {
        try {
          sessionStorage.removeItem("admin_session_active");
          document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie = "admin-last-active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        } catch {
          // ignore
        }
      }
    };
    document.addEventListener("click", handleLinkClick);

    // Sync across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "admin_last_active" && e.newValue) {
        const tabTime = Number(e.newValue);
        if (!isNaN(tabTime) && tabTime > lastActivityRef.current) {
          lastActivityRef.current = tabTime;
        }
      }
    };
    window.addEventListener("storage", handleStorage);

    // Visibility change check (e.g. user returns to inactive tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const currentTime = Date.now();
        const elapsed = currentTime - lastActivityRef.current;
        if (elapsed >= INACTIVITY_TIMEOUT_MS) {
          performLogout();
        } else {
          resetTimer();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Heartbeat check every second
    const interval = setInterval(() => {
      if (isLoggingOutRef.current) return;

      // Check if another tab was active more recently
      try {
        const stored = localStorage.getItem("admin_last_active");
        if (stored) {
          const storedTime = Number(stored);
          if (!isNaN(storedTime) && storedTime > lastActivityRef.current) {
            lastActivityRef.current = storedTime;
          }
        }
      } catch {
        // ignore
      }

      const currentTime = Date.now();
      const elapsed = currentTime - lastActivityRef.current;
      const remaining = Math.max(0, Math.ceil((INACTIVITY_TIMEOUT_MS - elapsed) / 1000));

      setSecondsRemaining(remaining);
      setShowWarning(remaining <= WARNING_THRESHOLD_SECONDS && remaining > 0);

      if (remaining <= 0) {
        performLogout();
      }
    }, 1000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, [isLoginPage, performLogout, resetTimer]);

  if (isLoginPage || !showWarning) {
    return null;
  }

  return (
    <aside
      aria-label="Session Inactivity Warning"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-amber-500/50 bg-slate-900/95 p-4 text-slate-100 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500">
        <Clock className="h-5 w-5 animate-pulse" />
      </div>
      <div className="text-sm">
        <p className="font-semibold text-white">Inactivity Warning</p>
        <p className="text-xs text-slate-300">
          Logging out in <span className="font-bold text-amber-400">{secondsRemaining}s</span> due to inactivity
        </p>
      </div>
      <Button
        size="sm"
        variant="default"
        className="ml-2 bg-amber-500 text-slate-950 hover:bg-amber-400 font-semibold text-xs h-8 cursor-pointer"
        onClick={() => resetTimer()}
      >
        Stay Logged In
      </Button>
    </aside>
  );
}
