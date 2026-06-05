"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Users,
  Truck,
  BarChart3,
  Search,
  Bell,
  Menu,
  Store,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Logo } from "@/components/brand/logo";
import { useAuth } from "@/store/auth";

const nav = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", Icon: Package },
  { label: "Categories", href: "/admin/categories", Icon: Tags },
  { label: "Orders", href: "/admin/orders", Icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", Icon: Users },
  { label: "Delivery", href: "/admin/delivery", Icon: Truck },
  { label: "Reports", href: "/admin/reports", Icon: BarChart3 },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const email = useAuth((s) => s.email);
  const logout = useAuth((s) => s.logout);

  function handleLogout() {
    logout();
    toast.success("Signed out");
    router.replace("/admin/login");
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <Link
        href="/admin"
        className="flex flex-col items-start gap-1 px-5 py-5"
      >
        <Logo className="h-8" />
        <span className="block pl-0.5 text-[11px] font-medium text-muted-foreground">
          Seller Hub
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(n.href)
                ? "bg-primary text-primary-foreground shadow-glow-sm"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <n.Icon className="h-[18px] w-[18px]" /> {n.label}
          </Link>
        ))}
      </nav>

      <div className="m-3 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary p-4">
        <p className="text-sm font-semibold">Need a hand?</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Check the seller guide for tips on boosting sales.
        </p>
        <Link
          href="/admin"
          className="mt-3 inline-block text-xs font-semibold text-primary hover:underline"
        >
          View guide →
        </Link>
      </div>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" /> Back to store
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-card lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[90] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-accent/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 left-0 w-72 bg-card shadow-soft-lg"
            >
              {SidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden flex-1 sm:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search orders, products, customers…"
              className="h-10 w-full max-w-md rounded-full border border-border bg-secondary/50 pl-11 pr-4 text-sm outline-none focus:border-primary focus:bg-background"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              className="hidden h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:bg-secondary sm:flex"
            >
              <Store className="h-4 w-4" /> View Store
            </Link>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-1 sm:pr-3">
              <Image
                src="https://i.pravatar.cc/80?img=15"
                alt="Admin"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden text-xs font-medium text-muted-foreground sm:block">
                {email ?? "admin"}
              </span>
              <button
                onClick={handleLogout}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
