"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/store/admin";
import { useMounted } from "@/hooks/use-mounted";
import {
  orderStatuses,
  statusStyles,
  type OrderStatus,
} from "@/lib/data/admin";
import { AdminPageHeader, Panel } from "@/components/admin/widgets";
import { formatPrice, cn } from "@/lib/utils";

const filters: ("All" | OrderStatus)[] = ["All", ...orderStatuses];

export default function AdminOrdersPage() {
  const mounted = useMounted();
  const orders = useAdmin((s) => s.orders);
  const setOrderStatus = useAdmin((s) => s.setOrderStatus);

  const [filter, setFilter] = useState<"All" | OrderStatus>("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    if (!mounted) return [];
    return orders.filter((o) => {
      const byStatus = filter === "All" || o.status === filter;
      const byQuery =
        !query ||
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.customer.toLowerCase().includes(query.toLowerCase());
      return byStatus && byQuery;
    });
  }, [orders, filter, query, mounted]);

  const revenue = useMemo(
    () =>
      mounted
        ? orders
            .filter((o) => o.status !== "Cancelled")
            .reduce((s, o) => s + o.total, 0)
        : 0,
    [orders, mounted],
  );

  return (
    <div>
      <AdminPageHeader
        title="Orders"
        subtitle={
          mounted
            ? `${orders.length} orders · ${formatPrice(revenue)} revenue`
            : "Loading…"
        }
      />

      {/* Filter chips */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-secondary",
            )}
          >
            {f}
            {mounted && f !== "All" && (
              <span className="ml-1.5 opacity-70">
                {orders.filter((o) => o.status === f).length}
              </span>
            )}
          </button>
        ))}
        <div className="relative ml-auto w-full max-w-xs">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order or customer…"
            className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-11 pr-4 text-sm outline-none focus:border-primary focus:bg-background"
          />
        </div>
      </div>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Order ID</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Items</th>
                <th className="px-5 py-3 font-medium">Payment</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-border last:border-0 hover:bg-secondary/40"
                >
                  <td className="px-5 py-3 font-semibold">{o.id}</td>
                  <td className="px-5 py-3">
                    <div className="font-medium">{o.customer}</div>
                    <div className="text-xs text-muted-foreground">{o.email}</div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                  <td className="px-5 py-3">{o.items}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-md border border-border px-2 py-0.5 text-xs">
                      {o.payment}
                    </span>
                  </td>
                  <td className="px-5 py-3 font-semibold">
                    {formatPrice(o.total)}
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => {
                        setOrderStatus(o.id, e.target.value as OrderStatus);
                        toast.success(`${o.id} → ${e.target.value}`);
                      }}
                      className={cn(
                        "cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ring-1 ring-inset ring-transparent focus:ring-primary",
                        statusStyles[o.status],
                      )}
                    >
                      {orderStatuses.map((s) => (
                        <option key={s} value={s} className="bg-popover text-foreground">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {mounted && list.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No orders match your filters.
            </p>
          )}
        </div>
      </Panel>
    </div>
  );
}
