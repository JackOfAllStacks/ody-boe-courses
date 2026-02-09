import fs from "fs";
import path from "path";

const root = process.cwd();
const args = process.argv.slice(2);

const getArg = (name) => {
  const prefixed = `${name}=`;
  const direct = args.find((arg) => arg.startsWith(prefixed));
  if (direct) {
    return direct.slice(prefixed.length);
  }

  const index = args.findIndex((arg) => arg === name);
  if (index >= 0 && args[index + 1]) {
    return args[index + 1];
  }

  return "";
};

const slug = getArg("--slug").trim();
const title = getArg("--title").trim();
const level = (getArg("--level").trim() || "beginner").toLowerCase();

if (!slug) {
  console.error("Missing required arg: --slug <slug>");
  process.exit(1);
}

const resolvedTitle = title || slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
const templatePath = path.join(root, "skills/course-authoring/templates/course-template.md");
const targetPath = path.join(root, "content/courses", `${slug}.md`);

if (!fs.existsSync(templatePath)) {
  console.error(`Template not found: ${templatePath}`);
  process.exit(1);
}

if (fs.existsSync(targetPath)) {
  console.error(`Course file already exists: ${targetPath}`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, "utf8");
const rendered = template
  .replaceAll("{{slug}}", slug)
  .replaceAll("{{title}}", resolvedTitle)
  .replaceAll("{{level}}", level);

fs.writeFileSync(targetPath, rendered);
console.log(`Created draft course: content/courses/${slug}.md`);
