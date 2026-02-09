import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const root = process.cwd();
const slug = (process.argv[2] || "").trim();
const manifestPath = path.join(root, "content/published-courses.json");
const coursePath = path.join(root, "content/courses", `${slug}.md`);

if (!slug) {
  console.error("Usage: npm run course:publish -- <slug>");
  process.exit(1);
}

if (!fs.existsSync(coursePath)) {
  console.error(`Course file does not exist: ${coursePath}`);
  process.exit(1);
}

try {
  execFileSync("node", ["scripts/validate-course.mjs", slug], {
    cwd: root,
    stdio: "inherit",
  });
} catch {
  console.error("Publish blocked: course validation failed.");
  process.exit(1);
}

let manifest = { publishedSlugs: [] };
if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

if (!Array.isArray(manifest.publishedSlugs)) {
  manifest.publishedSlugs = [];
}

if (!manifest.publishedSlugs.includes(slug)) {
  manifest.publishedSlugs.push(slug);
  manifest.publishedSlugs.sort();
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Published course slug: ${slug}`);
} else {
  console.log(`Course already published: ${slug}`);
}
