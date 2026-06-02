import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-glow">
        <Leaf className="h-9 w-9" />
      </span>
      <p className="font-display text-7xl font-bold text-gradient">404</p>
      <h1 className="font-display text-2xl font-bold">Page not found</h1>
      <p className="max-w-sm text-muted-foreground">
        The page you're looking for has been harvested. Let's get you back to
        fresh picks.
      </p>
      <Button asChild size="lg">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
