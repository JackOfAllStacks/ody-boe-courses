export type CourseCatalogItem = {
  slug: string;
  title: string;
  summary: string;
  level: string;
  estimatedTime: string;
  heroImage: string;
};

export const courseCatalog: CourseCatalogItem[] = [
  {
    slug: "mastering-first-grade-geometry",
    title: "Mastering First Grade Geometry and Spatial Reasoning",
    summary:
      "Playful, hands-on geometry lessons with spatial puzzles, quick quizzes, and memory cards.",
    level: "Beginner",
    estimatedTime: "2-3 hours",
    heroImage: "/placeholders/geometry-hero.svg",
  },
  {
    slug: "advanced-formalisms-theoretical-physics",
    title: "Advanced Formalisms in Theoretical Physics",
    summary:
      "A focused tour of action principles, symmetry, and quantization methods with drill-down quizzes.",
    level: "Advanced",
    estimatedTime: "4-6 hours",
    heroImage: "/placeholders/physics-hero.svg",
  },
  {
    slug: "creative-product-strategy",
    title: "Creative Product Strategy for Modern Teams",
    summary:
      "From opportunity mapping to narrative roadmaps, learn the craft of product strategy.",
    level: "Intermediate",
    estimatedTime: "3-4 hours",
    heroImage: "/placeholders/product-hero.svg",
  },
];
