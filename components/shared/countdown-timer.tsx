"use client";

import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownTimer({
  hoursFromNow = 11,
  className,
  variant = "dark",
}: {
  hoursFromNow?: number;
  className?: string;
  variant?: "dark" | "light";
}) {
  const { hours, minutes, seconds, days } = useCountdown(hoursFromNow);
  const totalHours = days * 24 + hours;
  const blocks = [
    { label: "Hours", value: pad(totalHours) },
    { label: "Mins", value: pad(minutes) },
    { label: "Secs", value: pad(seconds) },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {blocks.map((b, i) => (
        <div key={b.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl font-display text-xl font-bold tabular-nums shadow-soft sm:h-14 sm:w-14 sm:text-2xl",
                variant === "dark"
                  ? "bg-accent text-accent-foreground"
                  : "bg-white text-accent",
              )}
            >
              {b.value}
            </div>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {b.label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span className="-mt-4 text-xl font-bold text-primary">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
