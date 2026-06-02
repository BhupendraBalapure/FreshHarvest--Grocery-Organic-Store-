import type { Farmer } from "@/lib/types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=700&q=80&auto=format&fit=crop`;

export const farmers: Farmer[] = [
  {
    id: "f-1",
    name: "Rajesh Patil",
    farm: "Sahyadri Organic Orchards",
    location: "Nashik, Maharashtra",
    image: img("1605000797499-95a51c5269ae"),
    quote:
      "For three generations we've grown without chemicals. When a customer tastes our grapes, they taste our soil, our sun, our care.",
    years: 24,
    specialty: "Grapes & Pomegranate",
  },
  {
    id: "f-2",
    name: "Lakshmi Devi",
    farm: "Nilgiri Hill Estates",
    location: "Ooty, Tamil Nadu",
    image: img("1595273670150-bd0c3c392e46"),
    quote:
      "Our carrots and greens are misted by mountain clouds every morning. FreshHarvest lets me reach families I never could before.",
    years: 18,
    specialty: "Root Vegetables & Greens",
  },
  {
    id: "f-3",
    name: "Harpreet Gill",
    farm: "Apple Valley Co-op",
    location: "Shimla, Himachal Pradesh",
    image: img("1620200423727-8127f75d7f53"),
    quote:
      "Every apple is picked by hand at the perfect moment. Selling direct means I earn fairly and you get fruit at its absolute peak.",
    years: 31,
    specialty: "Apples & Stone Fruit",
  },
];
