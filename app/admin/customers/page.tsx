"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Mail } from "lucide-react";
import { seedCustomers } from "@/lib/data/admin";
import { AdminPageHeader, StatCard, Panel } from "@/components/admin/widgets";
import { Users, Crown, IndianRupee } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";

const tierStyles: Record<string, string> = {
  Platinum: "bg-violet-500/15 text-violet-600",
  Gold: "bg-amber-500/15 text-amber-600",
  Silver: "bg-slate-400/20 text-slate-500",
  Bronze: "bg-orange-700/15 text-orange-700",
};

export default function AdminCustomersPage() {
  const [query, setQuery] = useState("");
  const list = seedCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()),
  );
  const totalSpent = seedCustomers.reduce((s, c) => s + c.spent, 0);
  const vips = seedCustomers.filter(
    (c) => c.tier === "Gold" || c.tier === "Platinum",
  ).length;

  return (
    <div>
      <AdminPageHeader
        title="Customers"
        subtitle={`${seedCustomers.length} registered customers`}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Customers" value="12,580" Icon={Users} />
        <StatCard label="VIP Members" value={`${vips} shown`} Icon={Crown} />
        <StatCard label="Lifetime Value" value={formatPrice(totalSpent)} Icon={IndianRupee} />
      </div>

      <Panel>
        <div className="border-b border-border p-4">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers…"
              className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-11 pr-4 text-sm outline-none focus:border-primary focus:bg-background"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Tier</th>
                <th className="px-5 py-3 font-medium">Orders</th>
                <th className="px-5 py-3 font-medium">Total Spent</th>
                <th className="px-5 py-3 font-medium">Joined</th>
                <th className="px-5 py-3 text-right font-medium">Contact</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Image src={c.avatar} alt={c.name} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", tierStyles[c.tier])}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-5 py-3">{c.orders}</td>
                  <td className="px-5 py-3 font-semibold">{formatPrice(c.spent)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.joined}</td>
                  <td className="px-5 py-3 text-right">
                    <a
                      href={`mailto:${c.email}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
