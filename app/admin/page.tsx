"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  IndianRupee,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { useAdmin } from "@/store/admin";
import { useMounted } from "@/hooks/use-mounted";
import { salesByMonth, statusStyles } from "@/lib/data/admin";
import { AdminPageHeader, StatCard, Panel } from "@/components/admin/widgets";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";

export default function AdminOverview() {
  const mounted = useMounted();
  const products = useAdmin((s) => s.products);
  const orders = useAdmin((s) => s.orders);

  const maxRev = Math.max(...salesByMonth.map((m) => m.revenue));
  const lowStock = mounted
    ? products.filter((p) => p.stockCount < 90).slice(0, 5)
    : [];
  const recentOrders = mounted ? orders.slice(0, 5) : [];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Welcome back, Aarav — here's your store at a glance."
        action={
          <Button asChild>
            <Link href="/admin/products">
              <Plus className="h-4 w-4" /> Add Product
            </Link>
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value="₹8,42,690" change={12.5} up Icon={IndianRupee} delay={0} />
        <StatCard label="Orders" value="3,284" change={8.2} up Icon={ShoppingCart} delay={0.05} />
        <StatCard label="Customers" value="12,580" change={4.1} up Icon={Users} delay={0.1} />
        <StatCard label="Avg. Order Value" value="₹1,248" change={2.3} up={false} Icon={TrendingUp} delay={0.15} />
      </div>

      {/* Chart + top products */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Revenue Overview" className="lg:col-span-2">
          <div className="p-6">
            <p className="mb-6 text-sm text-muted-foreground">
              Monthly revenue · last 6 months
            </p>
            <div className="flex h-56 items-end gap-3">
              {salesByMonth.map((m, i) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(m.revenue / maxRev) * 100}%` }}
                      transition={{ delay: i * 0.06, duration: 0.6 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary"
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {m.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="Top Products">
          <div className="space-y-1 p-4">
            {(mounted ? products : []).slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl p-2 hover:bg-secondary"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                  <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {p.category.replace("-", " ")}
                  </p>
                </div>
                <span className="text-sm font-semibold">
                  {formatPrice(p.salePrice ?? p.price)}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Recent orders + low stock */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel
          title="Recent Orders"
          className="lg:col-span-2"
          action={
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                    <td className="px-5 py-3 font-semibold">{o.id}</td>
                    <td className="px-5 py-3">{o.customer}</td>
                    <td className="px-5 py-3 font-semibold">{formatPrice(o.total)}</td>
                    <td className="px-5 py-3">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[o.status])}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel
          title="Low Stock Alerts"
          action={<AlertTriangle className="h-4 w-4 text-amber-500" />}
        >
          <div className="space-y-1 p-4">
            {lowStock.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">
                All products well stocked 🎉
              </p>
            )}
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-xl p-2">
                <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                  <Image src={p.image} alt={p.name} fill sizes="36px" className="object-cover" />
                </div>
                <p className="line-clamp-1 flex-1 text-sm font-medium">{p.name}</p>
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-600">
                  {p.stockCount} left
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
