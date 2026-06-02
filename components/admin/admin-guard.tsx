"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Leaf } from "lucide-react";
import { useAuth } from "@/store/auth";
import { useMounted } from "@/hooks/use-mounted";
import { AdminShell } from "@/components/admin/admin-shell";

const LOGIN_ROUTE = "/admin/login";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();
  const isAuthed = useAuth((s) => s.isAuthed);

  const isLoginRoute = pathname === LOGIN_ROUTE;

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthed && !isLoginRoute) {
      router.replace(LOGIN_ROUTE);
    }
    if (isAuthed && isLoginRoute) {
      router.replace("/admin");
    }
  }, [mounted, isAuthed, isLoginRoute, router]);

  // Login page renders standalone (no shell).
  if (isLoginRoute) return <>{children}</>;

  // Until we know auth state (or while redirecting), show a splash.
  if (!mounted || !isAuthed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-secondary/30">
        <span className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
          <Leaf className="h-7 w-7" />
        </span>
        <p className="text-sm text-muted-foreground">Checking access…</p>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
