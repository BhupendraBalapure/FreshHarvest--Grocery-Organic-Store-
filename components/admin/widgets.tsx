"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  change,
  up,
  Icon,
  delay = 0,
}: {
  label: string;
  value: string;
  change?: number;
  up?: boolean;
  Icon: LucideIcon;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-2xl border border-border bg-card p-5 shadow-soft"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        {change !== undefined && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-xs font-semibold",
              up ? "text-success" : "text-destructive",
            )}
          >
            {up ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {change}%
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
        className,
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 border-b border-border p-5">
          {title && <h2 className="font-display text-lg font-bold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
