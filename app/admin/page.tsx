"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Truck,
  TrendingUp,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
} from "lucide-react";
import { products } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";

type Tab = "dashboard" | "products" | "orders" | "customers" | "delivery";

const nav: { id: Tab; label: string; Icon: typeof Package }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "products", label: "Products", Icon: Package },
  { id: "orders", label: "Orders", Icon: ShoppingCart },
  { id: "customers", label: "Customers", Icon: Users },
  { id: "delivery", label: "Delivery", Icon: Truck },
];

const stats = [
  { label: "Total Revenue", value: "₹8,42,690", change: 12.5, up: true, Icon: IndianRupee },
  { label: "Orders", value: "3,284", change: 8.2, up: true, Icon: ShoppingCart },
  { label: "Customers", value: "12,580", change: 4.1, up: true, Icon: Users },
  { label: "Avg. Order", value: "₹1,248", change: 2.3, up: false, Icon: TrendingUp },
];

const salesBars = [42, 58, 35, 70, 64, 88, 76, 95, 60, 82, 73, 99];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const adminOrders = [
  { id: "FH-92831", customer: "Aarav Sharma", total: 1248, status: "Processing" },
  { id: "FH-92830", customer: "Priya Nair", total: 879, status: "Shipped" },
  { id: "FH-92829", customer: "Rohan Mehta", total: 2399, status: "Delivered" },
  { id: "FH-92828", customer: "Sneha Reddy", total: 540, status: "Pending" },
  { id: "FH-92827", customer: "Vikram Singh", total: 1899, status: "Delivered" },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-success/15 text-success",
  Shipped: "bg-sky-500/15 text-sky-600",
  Processing: "bg-primary/15 text-primary",
  Pending: "bg-amber-500/15 text-amber-600",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Seller Hub</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — here's what's happening today.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Nav */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-3 shadow-soft">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                tab === n.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary",
              )}
            >
              <n.Icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </aside>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {tab === "dashboard" && (
            <>
              {/* Stat cards */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <s.Icon className="h-5 w-5" />
                      </span>
                      <span
                        className={cn(
                          "flex items-center gap-0.5 text-xs font-semibold",
                          s.up ? "text-success" : "text-destructive",
                        )}
                      >
                        {s.up ? (
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5" />
                        )}
                        {s.change}%
                      </span>
                    </div>
                    <p className="mt-3 font-display text-2xl font-bold">
                      {s.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Chart + recent */}
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
                  <h2 className="mb-1 font-display text-lg font-bold">
                    Sales Overview
                  </h2>
                  <p className="mb-6 text-sm text-muted-foreground">
                    Monthly revenue · 2026
                  </p>
                  <div className="flex h-48 items-end gap-2">
                    {salesBars.map((h, i) => (
                      <div
                        key={i}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.04, duration: 0.5 }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary"
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {months[i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <h2 className="mb-4 font-display text-lg font-bold">
                    Top Products
                  </h2>
                  <div className="space-y-3">
                    {products.slice(0, 4).map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="line-clamp-1 text-sm font-medium">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.reviewCount} sold
                          </p>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(p.salePrice ?? p.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <OrdersTable />
            </>
          )}

          {tab === "products" && <ProductsTable />}
          {tab === "orders" && <OrdersTable />}
          {tab === "customers" && (
            <Placeholder
              title="Customer Management"
              desc="View, segment and manage your 12,580 customers, their orders and lifetime value."
            />
          )}
          {tab === "delivery" && (
            <Placeholder
              title="Delivery Management"
              desc="Assign delivery partners, manage slots and track live shipments on the map."
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function OrdersTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border p-5">
        <h2 className="font-display text-lg font-bold">Recent Orders</h2>
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search orders…"
            className="h-9 rounded-full border border-border bg-background pl-9 pr-4 text-sm outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Order</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Total</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {adminOrders.map((o) => (
              <tr
                key={o.id}
                className="border-b border-border last:border-0 hover:bg-secondary/40"
              >
                <td className="px-5 py-3 font-semibold">{o.id}</td>
                <td className="px-5 py-3">{o.customer}</td>
                <td className="px-5 py-3 font-semibold">
                  {formatPrice(o.total)}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-semibold",
                      statusColor[o.status],
                    )}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border p-5">
        <h2 className="font-display text-lg font-bold">
          Products ({products.length})
        </h2>
        <Button size="sm">
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Product</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium">Stock</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 10).map((p) => (
              <tr
                key={p.id}
                className="border-b border-border last:border-0 hover:bg-secondary/40"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-1 font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 capitalize text-muted-foreground">
                  {p.category.replace("-", " ")}
                </td>
                <td className="px-5 py-3 font-semibold">
                  {formatPrice(p.salePrice ?? p.price)}
                </td>
                <td className="px-5 py-3">{p.stockCount}</td>
                <td className="px-5 py-3">
                  <Badge variant={p.inStock ? "success" : "outline"}>
                    {p.inStock ? "In stock" : "Out"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Placeholder({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card py-24 text-center shadow-soft">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{desc}</p>
      <Button variant="outline">Coming soon</Button>
    </div>
  );
}
