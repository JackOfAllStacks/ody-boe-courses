import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const branch = execSync("git branch --show-current", { encoding: "utf8" }).trim();
const base = process.argv[2] || "main";
const outDir = path.join(root, "docs", "branch-summaries");
const outFile = path.join(outDir, `${branch.replace(/[\\/]/g, "-")}.md`);

const mergeBase = execSync(`git merge-base ${base} ${branch}`, { encoding: "utf8" }).trim();
const rawLog = execSync(`git log --no-merges --pretty=format:%h%x09%s ${mergeBase}..${branch}`, { encoding: "utf8" }).trim();
const commitLines = rawLog ? rawLog.split("\n") : [];

const feature = commitLines.length ? commitLines[0].split("\t")[1] : "No commits yet";
const bullets = commitLines.length
  ? commitLines.map((line) => {
      const [hash, subject] = line.split("\t");
      return `- ${hash}: ${subject}`;
    }).join("\n")
  : "- No commits on this branch yet.";

const body = `# Branch Summary: ${branch}\n\n- Feature: ${feature}\n- Base branch: ${base}\n- Commit count: ${commitLines.length}\n\n## Commits\n${bullets}\n`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, body);
console.log(`Wrote ${path.relative(root, outFile)}`);
