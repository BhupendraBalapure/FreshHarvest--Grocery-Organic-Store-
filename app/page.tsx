import { Hero } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories-section";
import { FlashDeals } from "@/components/home/flash-deals";
import { BestSellers } from "@/components/home/best-sellers";
import { TrendingProducts } from "@/components/home/trending-products";
import { FreshArrivals } from "@/components/home/fresh-arrivals";
import { WhyChoose } from "@/components/home/why-choose";
import { Subscriptions } from "@/components/home/subscriptions";
import { FarmerStories } from "@/components/home/farmer-stories";
import { RecipesSection } from "@/components/home/recipes-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { AppPromo } from "@/components/home/app-promo";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FlashDeals />
      <BestSellers />
      <TrendingProducts />
      <FreshArrivals />
      <WhyChoose />
      <Subscriptions />
      <FarmerStories />
      <RecipesSection />
      <TestimonialsSection />
      <AppPromo />
      <Newsletter />
    </>
  );
}
