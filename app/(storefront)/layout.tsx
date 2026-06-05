import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* Spacer so the floating bottom nav doesn't cover footer content on mobile */}
      <div aria-hidden className="h-20 lg:hidden" />
      <CartDrawer />
      <MobileBottomNav />
    </>
  );
}
