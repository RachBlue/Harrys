export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
}

export const HARRYS_CATALOG: Product[] = [
  {
    id: "winston-handle",
    name: "The Winston Handle",
    description: "Weighted die-cast zinc with a polished chrome finish.",
    price: 20,
    tags: ["precision", "durable"]
  },
  {
    id: "sensitive-shave-gel",
    name: "Aloe Shave Gel",
    description: "Cushions your face with a hydrating aloe formula.",
    price: 6,
    tags: ["gentle", "sensitive", "hydration"]
  },
  {
    id: "post-shave-balm",
    name: "Post-Shave Balm",
    description: "Quick-drying relief for immediate post-shave comfort.",
    price: 7,
    tags: ["gentle", "soothing"]
  },
  {
    id: "sharp-blades",
    name: "Harry's Blades (8-pack)",
    description: "German-engineered for a close, comfortable shave.",
    price: 16,
    tags: ["precision", "essential"]
  }
];