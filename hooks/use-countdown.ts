"use client";

import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

function diff(target: number): TimeLeft {
  const total = target - Date.now();
  if (total <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isOver: false,
  };
}

/** Counts down to `hoursFromNow` hours ahead. Computes the target on the
 *  client only, so SSR markup stays stable until mount. */
export function useCountdown(hoursFromNow = 12) {
  const [target, setTarget] = useState<number | null>(null);
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const t = Date.now() + hoursFromNow * 60 * 60 * 1000;
    setTarget(t);
    setTime(diff(t));
  }, [hoursFromNow]);

  useEffect(() => {
    if (target == null) return;
    const id = setInterval(() => setTime(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}
