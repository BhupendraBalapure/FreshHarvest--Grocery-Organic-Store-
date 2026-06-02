"use client";

import { motion } from "framer-motion";
import { Download, IndianRupee, ShoppingBag, Percent, Repeat } from "lucide-react";
import { useAdmin } from "@/store/admin";
import { useMounted } from "@/hooks/use-mounted";
import { salesByMonth } from "@/lib/data/admin";
import { categories as seedCategories } from "@/lib/data/categories";
import { AdminPageHeader, StatCard, Panel } from "@/components/admin/widgets";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

const palette = [
  "bg-primary",
  "bg-amber-400",
  "bg-sky-500",
  "bg-violet-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-fuchsia-500",
];

export default function AdminReportsPage() {
  const mounted = useMounted();
  const products = useAdmin((s) => s.products);
  const maxRev = Math.max(...salesByMonth.map((m) => m.revenue));

  // products per category (live)
  const breakdown = seedCategories.map((c) => ({
    name: c.name,
    count: mounted ? products.filter((p) => p.category === c.slug).length : 0,
  }));
  const totalProducts = breakdown.reduce((s, b) => s + b.count, 0) || 1;

  return (
    <div>
      <AdminPageHeader
        title="Sales Reports"
        subtitle="Performance insights for your store"
        action={
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (6 mo)" value={formatPrice(salesByMonth.reduce((s, m) => s + m.revenue, 0))} Icon={IndianRupee} />
        <StatCard label="Units Sold" value="18,420" change={9.4} up Icon={ShoppingBag} />
        <StatCard label="Conversion Rate" value="3.8%" change={0.6} up Icon={Percent} />
        <StatCard label="Repeat Rate" value="64%" change={5.1} up Icon={Repeat} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Line-ish revenue trend */}
        <Panel title="Revenue Trend" className="lg:col-span-2">
          <div className="p-6">
            <div className="flex h-64 items-end gap-3">
              {salesByMonth.map((m, i) => (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[11px] font-semibold text-muted-foreground">
                    {Math.round(m.revenue / 1000)}k
                  </span>
                  <div className="flex w-full flex-1 items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(m.revenue / maxRev) * 100}%` }}
                      transition={{ delay: i * 0.06, duration: 0.6 }}
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Category breakdown */}
        <Panel title="Catalogue by Category">
          <div className="space-y-3 p-5">
            {breakdown.map((b, i) => {
              const pct = Math.round((b.count / totalProducts) * 100);
              return (
                <div key={b.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium">{b.name}</span>
                    <span className="text-muted-foreground">{b.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className={`h-full rounded-full ${palette[i % palette.length]}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}
