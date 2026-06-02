"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { subscriptionPlans } from "@/lib/data/subscriptions";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Subscriptions() {
  return (
    <section id="subscriptions" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Save More, Effortlessly"
          title="Subscription Plans"
          description="Set it and forget it. Fresh boxes delivered on your schedule — pause or cancel anytime."
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid items-stretch gap-6 lg:grid-cols-3"
        >
          {subscriptionPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7 shadow-soft transition-shadow hover:shadow-soft-lg",
                plan.popular
                  ? "border-primary bg-accent text-accent-foreground shadow-glow"
                  : "border-border bg-card",
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-glow-sm">
                  <Sparkles className="h-3.5 w-3.5" /> Most Popular
                </span>
              )}

              <div className="mb-5">
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p
                  className={cn(
                    "text-sm",
                    plan.popular
                      ? "text-accent-foreground/70"
                      : "text-muted-foreground",
                  )}
                >
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-1 flex items-end gap-1">
                <span className="font-display text-4xl font-bold">
                  {formatPrice(plan.price)}
                </span>
                <span
                  className={cn(
                    "mb-1 text-sm",
                    plan.popular
                      ? "text-accent-foreground/70"
                      : "text-muted-foreground",
                  )}
                >
                  {plan.cadence}
                </span>
              </div>
              <span className="mb-6 inline-flex w-fit rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
                {plan.savings}
              </span>

              <ul className="mb-7 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.popular
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
              >
                Choose {plan.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
