"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAuth, ADMIN_CREDENTIALS } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuth((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        toast.success("Welcome back, Admin 👋");
        router.replace("/admin");
      } else {
        setError("Invalid email or password. Try the demo credentials below.");
        setLoading(false);
      }
    }, 500);
  }

  function fillDemo() {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
    setError("");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary/40 p-5">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex">
            <Logo className="h-14" />
          </Link>
        </div>

        <div className="rounded-3xl border border-border bg-card p-7 shadow-soft-lg">
          <div className="mb-6 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-xl font-bold">Seller Hub Login</h1>
              <p className="text-xs text-muted-foreground">
                Sign in to manage your store
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
              </span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@freshharvest.com"
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Password
              </span>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {error && (
              <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-5 rounded-2xl border border-dashed border-border bg-secondary/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Demo credentials
            </p>
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                <code className="font-semibold">{ADMIN_CREDENTIALS.email}</code>
              </p>
              <p>
                <span className="text-muted-foreground">Password:</span>{" "}
                <code className="font-semibold">{ADMIN_CREDENTIALS.password}</code>
              </p>
            </div>
            <button
              onClick={fillDemo}
              className="mt-3 text-xs font-semibold text-primary hover:underline"
            >
              Autofill demo credentials →
            </button>
          </div>
        </div>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-muted-foreground hover:text-primary"
        >
          ← Back to store
        </Link>
      </motion.div>
    </div>
  );
}
