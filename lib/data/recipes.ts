import type { Recipe } from "@/lib/types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

export const recipes: Recipe[] = [
  {
    id: "r-1",
    title: "Avocado & Cherry Tomato Toast",
    slug: "avocado-cherry-tomato-toast",
    image: img("1525351484163-7529414344d8"),
    time: "10 min",
    difficulty: "Easy",
    servings: 2,
    category: "Breakfast",
    description:
      "Creamy Hass avocado smashed over warm sourdough, topped with blistered cherry tomatoes and a drizzle of olive oil.",
  },
  {
    id: "r-2",
    title: "Rainbow Quinoa Power Bowl",
    slug: "rainbow-quinoa-power-bowl",
    image: img("1512621776951-a57141f2eefd"),
    time: "25 min",
    difficulty: "Easy",
    servings: 3,
    category: "Lunch",
    description:
      "Fluffy organic quinoa tossed with roasted carrots, baby spinach, almonds and a zesty honey-lime dressing.",
  },
  {
    id: "r-3",
    title: "Berry Greek Yogurt Parfait",
    slug: "berry-greek-yogurt-parfait",
    image: img("1488477181946-6428a0291777"),
    time: "8 min",
    difficulty: "Easy",
    servings: 2,
    category: "Snack",
    description:
      "Layers of thick Greek yogurt, fresh blueberries, granola crunch and raw forest honey for a protein-packed treat.",
  },
  {
    id: "r-4",
    title: "Roasted Broccoli & Cheddar Soup",
    slug: "roasted-broccoli-cheddar-soup",
    image: img("1547592180-85f173990554"),
    time: "40 min",
    difficulty: "Medium",
    servings: 4,
    category: "Dinner",
    description:
      "Velvety soup of roasted broccoli folded with aged cheddar — comfort in a bowl, ready in under an hour.",
  },
];
