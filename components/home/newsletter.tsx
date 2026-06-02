"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function Newsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(_values: FormValues) {
    await new Promise((r) => setTimeout(r, 700));
    reset();
  }

  return (
    <section id="newsletter" className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-accent px-6 py-14 text-accent-foreground sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-hero-grid [background-size:24px_24px] opacity-[0.15]" />
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">
                <Sparkles className="h-4 w-4" /> Join 50,000+ subscribers
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
                Fresh deals, recipes & rewards
              </h2>
              <p className="mx-auto mt-3 max-w-md text-accent-foreground/70">
                Subscribe to our newsletter and get{" "}
                <span className="font-semibold text-primary">20% off</span> your
                first order, plus weekly inspiration.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <AnimatePresence mode="wait">
                {isSubmitSuccessful ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full bg-success px-6 py-4 font-semibold text-success-foreground"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    You're in! Check your inbox for your 20% code.
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto max-w-md"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <div className="relative flex-1">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="Enter your email"
                          className="h-[52px] w-full rounded-full border border-white/15 bg-white/95 pl-11 pr-4 text-sm text-accent outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="h-[52px]"
                      >
                        {isSubmitting ? "Joining…" : "Subscribe"}
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-left text-sm text-primary">
                        {errors.email.message}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-accent-foreground/50">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
