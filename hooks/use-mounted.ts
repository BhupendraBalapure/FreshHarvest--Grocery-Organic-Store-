"use client";

import { useEffect, useState } from "react";

/** Returns true after the component has mounted on the client.
 *  Useful to avoid hydration mismatches for persisted Zustand stores. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
