"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export function Sheet({
  open,
  onClose,
  side = "right",
  children,
  className,
  label = "Panel",
}: SheetProps) {
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-label={label}>
          <motion.div
            className="absolute inset-0 bg-accent/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={cn(
              "absolute top-0 flex h-full w-full max-w-md flex-col bg-background shadow-soft-lg",
              side === "right" ? "right-0" : "left-0",
              className,
            )}
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export function SheetHeader({
  title,
  subtitle,
  onClose,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between border-b border-border p-5">
      <div>
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <button
        onClick={onClose}
        aria-label="Close"
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
