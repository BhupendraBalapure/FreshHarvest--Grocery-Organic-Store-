import type { Metadata } from "next";
import { AdminGuard } from "@/components/admin/admin-guard";

export const metadata: Metadata = {
  title: "Seller Hub",
  description: "FreshHarvest admin dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}
