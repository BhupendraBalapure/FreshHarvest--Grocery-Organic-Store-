"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  cta?: { label: string; href: string };
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  cta,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:mb-12",
        align === "center"
          ? "items-center text-center"
          : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <Reveal className={align === "center" ? "max-w-2xl" : "max-w-xl"}>
        {eyebrow && (
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </Reveal>

      {cta && (
        <Reveal delay={0.1}>
          <Link
            href={cta.href}
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
