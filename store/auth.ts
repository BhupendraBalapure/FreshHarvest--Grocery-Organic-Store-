"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Frontend-only demo auth gate for the admin area.
 * NOTE: credentials are hardcoded on the client — this is a UX gate for the
 * demo, NOT real security. Replace with NextAuth/Auth.js + a backend before
 * production.
 */
export const ADMIN_CREDENTIALS = {
  email: "admin@freshharvest.com",
  password: "admin123",
};

interface AuthState {
  isAuthed: boolean;
  email: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthed: false,
      email: null,
      login: (email, password) => {
        const ok =
          email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
          password === ADMIN_CREDENTIALS.password;
        if (ok) set({ isAuthed: true, email: email.trim().toLowerCase() });
        return ok;
      },
      logout: () => set({ isAuthed: false, email: null }),
    }),
    { name: "freshharvest-admin-auth" },
  ),
);
