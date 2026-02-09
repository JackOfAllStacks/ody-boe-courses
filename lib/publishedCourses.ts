import fs from "fs";
import path from "path";

type PublishedCoursesManifest = {
  publishedSlugs?: unknown;
};

const publishedCoursesPath = path.join(
  process.cwd(),
  "content/published-courses.json"
);

const normalizeSlugs = (input: unknown): string[] => {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0
  );
};

export const getPublishedCourseSlugs = (): string[] => {
  if (!fs.existsSync(publishedCoursesPath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(publishedCoursesPath, "utf8");
    const parsed = JSON.parse(raw) as PublishedCoursesManifest;
    return normalizeSlugs(parsed.publishedSlugs);
  } catch {
    return [];
  }
};

export const isCoursePublished = (slug: string): boolean => {
  return getPublishedCourseSlugs().includes(slug);
};

export const getPublishedCoursesPath = () => publishedCoursesPath;
