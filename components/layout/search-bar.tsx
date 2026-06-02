"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, TrendingUp, ArrowRight, Clock, CornerDownLeft } from "lucide-react";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { useRecentlyViewed } from "@/store/recently-viewed";
import { useMounted } from "@/hooks/use-mounted";
import { formatPrice, cn } from "@/lib/utils";

const trending = ["Apples", "Organic", "Avocado", "Almonds", "Green Tea", "Honey"];

export function SearchBar({
  onNavigate,
  placeholder = "Search for fresh produce, dairy, snacks…",
  autoFocus = false,
}: {
  onNavigate?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const mounted = useMounted();
  const recent = useRecentlyViewed((s) => s.items);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.tags.some((t) => t.includes(q)),
      )
      .slice(0, 6);
  }, [query]);

  // close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // "/" global shortcut to focus
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    onNavigate?.();
    router.push(href);
  }

  function submit() {
    const q = query.trim();
    if (active >= 0 && results[active]) {
      go(`/product/${results[active].slug}`);
    } else if (q) {
      go(`/shop?q=${encodeURIComponent(q)}`);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-xl">
      {/* Input */}
      <div
        className={cn(
          "flex h-11 items-center gap-2 rounded-full border bg-secondary/50 pl-4 pr-2 transition-all",
          open
            ? "border-primary bg-background ring-2 ring-primary/20"
            : "border-border",
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          autoFocus={autoFocus}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Search products"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
            aria-label="Clear"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <kbd className="hidden rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground sm:block">
            /
          </kbd>
        )}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-popover shadow-soft-lg"
          >
            {query.trim() === "" ? (
              <div className="p-4">
                {/* Recent */}
                {mounted && recent.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> Recently viewed
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recent.slice(0, 4).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => go(`/product/${p.slug}`)}
                          className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 text-xs font-medium hover:border-primary/50 hover:bg-secondary"
                        >
                          <span className="relative h-6 w-6 overflow-hidden rounded-full">
                            <Image src={p.images[0]} alt="" fill sizes="24px" className="object-cover" />
                          </span>
                          {p.name.split(" ").slice(0, 2).join(" ")}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trending */}
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5" /> Trending searches
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {trending.map((t) => (
                    <button
                      key={t}
                      onClick={() => go(`/shop?q=${encodeURIComponent(t)}`)}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Categories */}
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Browse categories
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {categories.slice(0, 6).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => go(`/shop?category=${c.slug}`)}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary"
                    >
                      <span className="text-base">{c.icon}</span> {c.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {results.map((p, i) => (
                  <button
                    key={p.id}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(`/product/${p.slug}`)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors",
                      active === i ? "bg-secondary" : "hover:bg-secondary",
                    )}
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-border">
                      <Image src={p.images[0]} alt={p.name} fill sizes="44px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{p.name}</span>
                      <span className="block text-xs capitalize text-muted-foreground">
                        {p.category.replace("-", " ")}
                      </span>
                    </span>
                    <span className="font-display text-sm font-bold">
                      {formatPrice(p.salePrice ?? p.price)}
                    </span>
                  </button>
                ))}
                <button
                  onClick={submit}
                  className="mt-1 flex w-full items-center justify-between rounded-xl border-t border-border px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
                >
                  <span className="flex items-center gap-1.5">
                    <Search className="h-4 w-4" /> See all results for "{query.trim()}"
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 p-8 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </span>
                <p className="text-sm font-semibold">No products found</p>
                <p className="text-xs text-muted-foreground">
                  Try a different keyword or browse all products.
                </p>
                <button
                  onClick={() => go("/shop")}
                  className="mt-1 text-xs font-semibold text-primary hover:underline"
                >
                  Browse all →
                </button>
              </div>
            )}

            {/* footer hint */}
            <div className="hidden items-center justify-end gap-3 border-t border-border bg-secondary/40 px-4 py-2 text-[11px] text-muted-foreground sm:flex">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-background px-1">↑</kbd>
                <kbd className="rounded border border-border bg-background px-1">↓</kbd>
                to navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-background px-1">
                  <CornerDownLeft className="h-3 w-3" />
                </kbd>
                to select
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
