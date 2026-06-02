import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  productBySlug,
  productsByCategory,
} from "@/lib/data/products";
import { ProductDetail } from "@/components/product/product-detail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const sameCategory = productsByCategory(product.category).filter(
    (p) => p.id !== product.id,
  );
  const related = sameCategory.slice(0, 4);
  const frequentlyBought = products
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: "FreshHarvest" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.salePrice ?? product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail
        product={product}
        related={related}
        frequentlyBought={frequentlyBought}
      />
    </>
  );
}
