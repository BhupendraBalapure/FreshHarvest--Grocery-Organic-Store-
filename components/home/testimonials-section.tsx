"use client";

import Image from "next/image";
import { testimonials } from "@/lib/data/testimonials";
import { SectionHeading } from "@/components/shared/section-heading";
import { StarRating } from "@/components/shared/star-rating";
import { Quote } from "lucide-react";

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <StarRating rating={t.rating} size={16} />
        <Quote className="h-7 w-7 text-primary/25" />
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <Image
          src={t.avatar}
          alt={t.name}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-muted-foreground">
            {t.role} · {t.location}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection() {
  // duplicate for seamless marquee loop
  const row = [...testimonials, ...testimonials];
  return (
    <section id="testimonials" className="section overflow-hidden bg-secondary/40">
      <div className="container">
        <SectionHeading
          eyebrow="Loved by Thousands"
          title="What our customers say"
          description="Real reviews from families who made the switch to fresher, better groceries."
          align="center"
        />
      </div>

      <div className="group relative mask-fade-r">
        <div className="flex w-max gap-5 px-5 animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
