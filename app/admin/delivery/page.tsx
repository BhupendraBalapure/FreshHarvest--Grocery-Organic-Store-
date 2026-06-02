"use client";

import { useState } from "react";
import { MapPin, Truck, Package, CheckCircle2, Clock } from "lucide-react";
import { seedDeliveries, type AdminDelivery } from "@/lib/data/admin";
import { AdminPageHeader, StatCard, Panel } from "@/components/admin/widgets";
import { cn } from "@/lib/utils";

const statusFlow: AdminDelivery["status"][] = [
  "Assigned",
  "Picked Up",
  "In Transit",
  "Delivered",
];

const statusStyle: Record<AdminDelivery["status"], string> = {
  Assigned: "bg-amber-500/15 text-amber-600",
  "Picked Up": "bg-sky-500/15 text-sky-600",
  "In Transit": "bg-primary/15 text-primary",
  Delivered: "bg-success/15 text-success",
};

export default function AdminDeliveryPage() {
  const [deliveries, setDeliveries] = useState(seedDeliveries);

  function advance(id: string) {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const idx = statusFlow.indexOf(d.status);
        const next = statusFlow[Math.min(idx + 1, statusFlow.length - 1)];
        return { ...d, status: next };
      }),
    );
  }

  const active = deliveries.filter((d) => d.status !== "Delivered").length;
  const transit = deliveries.filter((d) => d.status === "In Transit").length;
  const done = deliveries.filter((d) => d.status === "Delivered").length;

  return (
    <div>
      <AdminPageHeader
        title="Delivery Management"
        subtitle="Track and advance live shipments"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Active Deliveries" value={`${active}`} Icon={Truck} />
        <StatCard label="In Transit" value={`${transit}`} Icon={Clock} />
        <StatCard label="Delivered Today" value={`${done}`} Icon={CheckCircle2} />
      </div>

      <Panel title="Live Shipments">
        <div className="divide-y divide-border">
          {deliveries.map((d) => (
            <div key={d.id} className="flex flex-wrap items-center gap-4 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Package className="h-5 w-5" />
              </span>
              <div className="min-w-[140px]">
                <p className="font-semibold">{d.order}</p>
                <p className="text-xs text-muted-foreground">Partner: {d.partner}</p>
              </div>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" /> {d.area}
              </p>
              <p className="text-sm text-muted-foreground">{d.slot}</p>
              <span
                className={cn(
                  "ml-auto rounded-full px-2.5 py-1 text-xs font-semibold",
                  statusStyle[d.status],
                )}
              >
                {d.status}
              </span>
              <button
                disabled={d.status === "Delivered"}
                onClick={() => advance(d.id)}
                className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {d.status === "Delivered" ? "Completed" : "Advance →"}
              </button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
