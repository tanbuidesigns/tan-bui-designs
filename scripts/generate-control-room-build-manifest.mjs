import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const appRoot = join(root, "src", "app");
const outputPath = join(root, "src", "data", "generated", "control-room-build-manifest.json");

async function pageFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await pageFiles(path));
    else if (entry.name === "page.tsx" || entry.name === "page.ts") files.push(path);
  }
  return files;
}

function routeFromFile(file) {
  const segments = relative(appRoot, file).split(sep).slice(0, -1).filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));
  return `/${segments.join("/")}`.replace(/\/$/, "") || "/";
}

function git(args, fallback = "") {
  try { return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { return fallback; }
}

const files = (await pageFiles(appRoot)).sort();
const routes = [];
const digest = createHash("sha256");
for (const file of files) {
  const source = await readFile(file, "utf8");
  const route = routeFromFile(file);
  digest.update(route).update("\0").update(source);
  routes.push({
    route,
    file: relative(root, file).split(sep).join("/"),
    visibility: route.startsWith("/control-room") || route.startsWith("/keystatic") ? "private-or-admin" : "public-candidate",
    dynamic: route.includes("["),
    clientComponent: /^\s*["']use client["'];/m.test(source),
    metadata: /export\s+(?:const\s+metadata|function\s+generateMetadata|async\s+function\s+generateMetadata)/.test(source) ? "dedicated" : "inherited-or-runtime",
  });
}

const commitLines = git(["log", "-20", "--date=short", "--pretty=format:%H%x09%ad%x09%s"]).split("\n").filter(Boolean);
const commits = commitLines.map((line) => {
  const [hash, date, ...subject] = line.split("\t");
  return { hash, date, subject: subject.join("\t").slice(0, 200) };
});
const manifest = {
  schemaVersion: 1,
  generatedOn: new Date().toISOString().slice(0, 10),
  sourceCommit: git(["rev-parse", "HEAD"], null),
  sourceBranch: git(["branch", "--show-current"], null),
  routeSourceDigest: digest.digest("hex"),
  routes,
  commits,
};

await mkdir(join(root, "src", "data", "generated"), { recursive: true });
const next = `${JSON.stringify(manifest, null, 2)}\n`;
let current = "";
try { current = await readFile(outputPath, "utf8"); } catch {}
if (current !== next) {
  await writeFile(outputPath, next, "utf8");
  console.log(`Control Room build manifest updated (${routes.length} route files, ${commits.length} commits).`);
} else {
  console.log(`Control Room build manifest is current (${routes.length} route files, ${commits.length} commits).`);
}
