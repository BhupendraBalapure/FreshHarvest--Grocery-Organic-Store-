import type { SubscriptionPlan, Coupon } from "@/lib/types";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "sub-weekly",
    name: "Weekly Box",
    tagline: "Perfect for couples & singles",
    price: 699,
    cadence: "/week",
    savings: "Save 12%",
    popular: false,
    features: [
      "7–9 seasonal fruits & veggies",
      "Free same-day delivery",
      "Pause or skip anytime",
      "Curated recipe cards",
    ],
  },
  {
    id: "sub-monthly",
    name: "Monthly Box",
    tagline: "Our most loved plan",
    price: 2399,
    cadence: "/month",
    savings: "Save 20%",
    popular: true,
    features: [
      "Everything in Weekly, ×4",
      "Premium organic upgrades",
      "Priority delivery slots",
      "2× loyalty reward points",
      "Exclusive member-only deals",
    ],
  },
  {
    id: "sub-family",
    name: "Family Pack",
    tagline: "For households of 4+",
    price: 3999,
    cadence: "/month",
    savings: "Save 25%",
    popular: false,
    features: [
      "Bulk fruits, veggies & dairy",
      "Free bakery basket weekly",
      "Dedicated account manager",
      "Flexible weekly customisation",
      "Free delivery, always",
    ],
  },
];

export const coupons: Coupon[] = [
  {
    code: "FRESH20",
    description: "20% off your first order",
    type: "percent",
    value: 20,
    minSpend: 499,
  },
  {
    code: "HARVEST100",
    description: "₹100 off orders above ₹999",
    type: "flat",
    value: 100,
    minSpend: 999,
  },
  {
    code: "ORGANIC15",
    description: "15% off all organic products",
    type: "percent",
    value: 15,
    minSpend: 0,
  },
];
