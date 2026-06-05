"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, User, Heart, ShoppingBag } from "lucide-react";
import { useUI } from "@/store/ui";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground ring-2 ring-card">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function Tab({
  label,
  icon: Icon,
  active,
  count,
}: {
  label: string;
  icon: typeof Home;
  active: boolean;
  count?: number;
}) {
  return (
    <span className="flex flex-1 flex-col items-center gap-0.5">
      <span
        className={cn(
          "relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300",
          active
            ? "bg-primary text-primary-foreground shadow-glow-sm"
            : "text-muted-foreground",
        )}
      >
        <Icon className="h-[17px] w-[17px]" strokeWidth={2.2} />
        {count != null && <Badge count={count} />}
      </span>
      <span
        className={cn(
          "whitespace-nowrap text-[10px] font-semibold transition-colors",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </span>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const openCart = useUI((s) => s.openCart);
  const cartCount = useCart((s) => s.totalItems());
  const wishlistCount = useWishlist((s) => s.items.length);
  const mounted = useMounted();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const links = [
    { label: "Home", href: "/", icon: Home },
    { label: "Categories", href: "/shop", icon: LayoutGrid },
    { label: "Account", href: "/dashboard", icon: User },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      count: mounted ? wishlistCount : 0,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-around rounded-[1.4rem] border border-border bg-card/90 px-1.5 py-1.5 shadow-soft-lg backdrop-blur-xl">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="flex flex-1">
            <Tab
              label={l.label}
              icon={l.icon}
              active={isActive(l.href)}
              count={l.count}
            />
          </Link>
        ))}

        {/* Cart — opens the drawer */}
        <button type="button" onClick={openCart} className="flex flex-1">
          <Tab
            label="Cart"
            icon={ShoppingBag}
            active={false}
            count={mounted ? cartCount : 0}
          />
        </button>
      </div>
    </nav>
  );
}
