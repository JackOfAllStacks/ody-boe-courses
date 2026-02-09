import fs from "fs";
import path from "path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const write = (p, v) => fs.writeFileSync(path.join(root, p), v);

const versionFile = "lib/version.ts";
const readmeFile = "README.md";
const packageFile = "package.json";
const lockFile = "package-lock.json";

const versionSource = read(versionFile);
const versionMatch = versionSource.match(/APP_VERSION\s*=\s*"v(\d+)\.(\d+)\.(\d+)"/);

if (!versionMatch) {
  throw new Error("Could not parse APP_VERSION in lib/version.ts");
}

const major = Number(versionMatch[1]);
const minor = Number(versionMatch[2]);
const patch = Number(versionMatch[3]) + 1;

const nextNoPrefix = `${major}.${minor}.${patch}`;
const nextWithPrefix = `v${nextNoPrefix}`;

write(versionFile, `export const APP_VERSION = \"${nextWithPrefix}\";\n`);

const readme = read(readmeFile);
const nextReadme = readme.replace(/\*\*Version:\*\*\s+v\d+\.\d+\.\d+/, `**Version:** ${nextWithPrefix}`);
write(readmeFile, nextReadme);

const pkg = JSON.parse(read(packageFile));
pkg.version = nextNoPrefix;
write(packageFile, `${JSON.stringify(pkg, null, 2)}\n`);

const lock = JSON.parse(read(lockFile));
lock.version = nextNoPrefix;
if (lock.packages && lock.packages[""]) {
  lock.packages[""].version = nextNoPrefix;
}
write(lockFile, `${JSON.stringify(lock, null, 2)}\n`);

console.log(`Bumped version to ${nextWithPrefix}`);
