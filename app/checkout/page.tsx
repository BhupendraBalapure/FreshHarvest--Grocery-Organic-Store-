"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Truck,
  CreditCard,
  Check,
  CalendarClock,
  PartyPopper,
} from "lucide-react";
import { useCart } from "@/store/cart";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Address", Icon: MapPin },
  { id: 2, label: "Delivery", Icon: Truck },
  { id: 3, label: "Payment", Icon: CreditCard },
];

const slots = [
  "Today · 6–8 PM",
  "Today · 8–10 PM",
  "Tomorrow · 8–10 AM",
  "Tomorrow · 10–12 PM",
  "Tomorrow · 4–6 PM",
  "Tomorrow · 6–8 PM",
];

export default function CheckoutPage() {
  const mounted = useMounted();
  const [step, setStep] = useState(1);
  const [slot, setSlot] = useState(slots[0]);
  const [payment, setPayment] = useState("upi");
  const [done, setDone] = useState(false);
  const { items, total, clear } = useCart();

  const delivery = mounted && total() >= 499 ? 0 : 40;
  const grand = mounted ? total() + delivery : 0;

  if (done) {
    return (
      <div className="container flex flex-col items-center gap-5 py-24 text-center">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-success text-success-foreground"
        >
          <PartyPopper className="h-11 w-11" />
        </motion.span>
        <h1 className="font-display text-3xl font-bold">Order Confirmed!</h1>
        <p className="max-w-sm text-muted-foreground">
          Thank you for shopping with FreshHarvest. Your order{" "}
          <span className="font-semibold text-foreground">#FH-92831</span> will
          arrive {slot.toLowerCase()}.
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard">Track Order</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="mb-8 font-display text-3xl font-bold">Checkout</h1>

      {/* Stepper */}
      <div className="mb-10 flex items-center justify-center">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                  step >= s.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {step > s.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <s.Icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-semibold",
                  step >= s.id ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "mx-3 h-0.5 w-16 sm:w-28",
                  step > s.id ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="font-display text-xl font-bold">
                  Delivery Address
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Full name" defaultValue="Aarav Sharma" />
                  <Input placeholder="Phone number" defaultValue="+91 98765 43210" />
                </div>
                <Input placeholder="Flat / House no, Building" />
                <Input placeholder="Street, Area, Landmark" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input placeholder="City" defaultValue="Mumbai" />
                  <Input placeholder="State" defaultValue="Maharashtra" />
                  <Input placeholder="PIN" defaultValue="400050" />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="delivery"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                  <CalendarClock className="h-5 w-5 text-primary" /> Choose a
                  Delivery Slot
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSlot(s)}
                      className={cn(
                        "rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors",
                        slot === s
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="font-display text-xl font-bold">
                  Payment Method
                </h2>
                {[
                  { id: "upi", label: "UPI / Google Pay / PhonePe" },
                  { id: "card", label: "Credit / Debit Card" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 transition-colors",
                      payment === m.id
                        ? "border-primary bg-primary-soft"
                        : "border-border",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="h-4 w-4 accent-primary"
                    />
                    <span className="text-sm font-medium">{m.label}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
            ) : (
              <Button
                onClick={() => {
                  clear();
                  setDone(true);
                }}
              >
                Place Order
              </Button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-bold">Order Summary</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {mounted ? items.length : 0} items · {slot}
          </p>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Items total</span>
              <span>{mounted ? formatPrice(total()) : "—"}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span>{delivery === 0 ? "FREE" : formatPrice(delivery)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 font-display text-xl font-bold">
              <span>Total</span>
              <span>{formatPrice(grand)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
