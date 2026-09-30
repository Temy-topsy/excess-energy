"use client";

import { useActionState, useSyncExternalStore } from "react";
import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const subscribe = () => () => {};
const getTimeoutSnapshot = () =>
  typeof window !== "undefined" && new URLSearchParams(window.location.search).get("reason") === "inactivity";
const getServerSnapshot = () => false;

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const isTimeout = useSyncExternalStore(subscribe, getTimeoutSnapshot, getServerSnapshot);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Enter your dashboard password to continue</p>
        </div>

        {isTimeout && (
          <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-center text-sm text-amber-500">
            <div className="flex items-center justify-center gap-2 font-medium">
              <Clock className="h-4 w-4" />
              <span>Session timed out</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              You were logged out after 1 minute of inactivity. Please enter your password again.
            </p>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-destructive font-medium">{state.error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Authenticating..." : "Login to Dashboard"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
