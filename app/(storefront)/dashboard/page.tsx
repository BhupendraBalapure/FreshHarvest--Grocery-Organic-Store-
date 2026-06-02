"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  Bell,
  Gift,
  LogOut,
  Check,
  Truck,
  Star,
} from "lucide-react";
import { useWishlist } from "@/store/wishlist";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";

type Tab = "overview" | "orders" | "wishlist" | "addresses" | "notifications";

const tabs: { id: Tab; label: string; Icon: typeof User }[] = [
  { id: "overview", label: "Overview", Icon: User },
  { id: "orders", label: "Orders", Icon: Package },
  { id: "wishlist", label: "Wishlist", Icon: Heart },
  { id: "addresses", label: "Addresses", Icon: MapPin },
  { id: "notifications", label: "Notifications", Icon: Bell },
];

const orders = [
  {
    id: "FH-92831",
    date: "01 Jun 2026",
    status: "Out for delivery",
    total: 1248,
    items: 6,
  },
  {
    id: "FH-91044",
    date: "24 May 2026",
    status: "Delivered",
    total: 879,
    items: 4,
  },
  {
    id: "FH-89720",
    date: "12 May 2026",
    status: "Delivered",
    total: 2399,
    items: 11,
  },
];

const addresses = [
  {
    label: "Home",
    line: "12B, Sea Breeze Apartments, Bandra West, Mumbai 400050",
    default: true,
  },
  {
    label: "Office",
    line: "4th Floor, WeWork, BKC, Mumbai 400051",
    default: false,
  },
];

const notifications = [
  { text: "Your order #FH-92831 is out for delivery 🚚", time: "10 min ago" },
  { text: "Flash sale: 25% off all dry fruits today only!", time: "2 hours ago" },
  { text: "You earned 120 loyalty points 🎉", time: "1 day ago" },
];

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const mounted = useMounted();
  const wishlist = useWishlist((s) => s.items);
  const removeWishlist = useWishlist((s) => s.remove);

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start gap-4 rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-secondary p-6 sm:flex-row sm:items-center">
        <Image
          src="https://i.pravatar.cc/120?img=15"
          alt="Profile"
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-2xl object-cover"
        />
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold">Aarav Sharma</h1>
          <p className="text-sm text-muted-foreground">
            chatgptnotes@gmail.com · Member since 2024
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-accent-foreground">
          <Gift className="h-6 w-6 text-primary" />
          <div>
            <p className="font-display text-xl font-bold">1,240</p>
            <p className="text-[11px] opacity-70">Loyalty Points</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-3 shadow-soft">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary",
              )}
            >
              <t.Icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
          <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </aside>

        {/* Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Total Orders", value: "28", Icon: Package },
                  { label: "Wishlist Items", value: mounted ? `${wishlist.length}` : "0", Icon: Heart },
                  { label: "Reward Points", value: "1,240", Icon: Star },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                  >
                    <s.Icon className="h-6 w-6 text-primary" />
                    <p className="mt-3 font-display text-2xl font-bold">
                      {s.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <h2 className="mb-4 font-display text-lg font-bold">
                  Recent Order
                </h2>
                <OrderRow order={orders[0]} />
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <OrderRow order={o} />
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            <div>
              {!mounted || wishlist.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
                  <Heart className="h-10 w-10 text-muted-foreground" />
                  <p className="font-semibold">Your wishlist is empty</p>
                  <Button asChild variant="outline">
                    <Link href="/shop">Discover products</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {wishlist.map((p) => (
                    <div
                      key={p.id}
                      className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
                    >
                      <Link
                        href={`/product/${p.slug}`}
                        className="relative block aspect-square overflow-hidden"
                      >
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="33vw"
                          className="object-cover"
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="line-clamp-1 text-sm font-semibold">
                          {p.name}
                        </h3>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-display font-bold">
                            {formatPrice(p.salePrice ?? p.price)}
                          </span>
                          <button
                            onClick={() => removeWishlist(p.id)}
                            className="text-xs text-destructive hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "addresses" && (
            <div className="space-y-4">
              {addresses.map((a) => (
                <div
                  key={a.label}
                  className="flex items-start justify-between rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="flex items-center gap-2 font-semibold">
                        {a.label}
                        {a.default && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">{a.line}</p>
                    </div>
                  </div>
                  <button className="text-sm font-semibold text-primary hover:underline">
                    Edit
                  </button>
                </div>
              ))}
              <Button variant="outline">+ Add new address</Button>
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-3">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bell className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm">{n.text}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function OrderRow({ order }: { order: (typeof orders)[number] }) {
  const delivered = order.status === "Delivered";
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="font-semibold">{order.id}</p>
        <p className="text-sm text-muted-foreground">
          {order.date} · {order.items} items
        </p>
      </div>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
          delivered
            ? "bg-success/15 text-success"
            : "bg-primary/15 text-primary",
        )}
      >
        {delivered ? <Check className="h-3.5 w-3.5" /> : <Truck className="h-3.5 w-3.5" />}
        {order.status}
      </span>
      <span className="font-display text-lg font-bold">
        {formatPrice(order.total)}
      </span>
      <Button size="sm" variant="outline">
        {delivered ? "Reorder" : "Track"}
      </Button>
    </div>
  );
}
