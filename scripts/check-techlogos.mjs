#!/usr/bin/env node
/**
 * TechLogos coverage check.
 *
 * Extracts every `TechLogo name="..."` usage from
 * src/components/tai-ui/SkillsGrid.tsx and asserts each referenced name has
 * an explicit `case` in src/components/tai-ui/TechLogos.tsx (JS switch
 * fallthrough groups count as explicit coverage).
 *
 * Zero fallback policy: every referenced TechLogo name must have an explicit case.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const skillsPath = path.resolve(here, "../src/components/tai-ui/SkillsGrid.tsx");
const logosPath = path.resolve(here, "../src/components/tai-ui/TechLogos.tsx");

function extractReferencedNames(source) {
  const names = [];
  const tagRe = /<TechLogo\b[^>]*>/gs;
  let m;
  while ((m = tagRe.exec(source)) !== null) {
    const tag = m[0];
    const attrRe = /name="([^"]*)"/;
    const attr = attrRe.exec(tag);
    if (attr) names.push(attr[1]);
  }
  return names;
}

function extractCaseGroups(source) {
  const groups = [];
  const re = /case ([\s\S]*?):\s*\r?\n\s*return \(/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    const header = m[1];
    const labels = [];
    const labelRe = /"([^"]+)"/g;
    let lm;
    while ((lm = labelRe.exec(header)) !== null) labels.push(lm[1]);
    groups.push({ labels });
  }
  return groups;
}

const skillsSrc = readFileSync(skillsPath, "utf8");
const logosSrc = readFileSync(logosPath, "utf8");

const referenced = [...new Set(extractReferencedNames(skillsSrc))];
const groups = extractCaseGroups(logosSrc);

const table = referenced.map((name) => {
  const group = groups.find((g) => g.labels.includes(name));
  return { name, group: group ? group.labels.join(" + ") : null, status: group ? "OK" : "FALLBACK" };
});

console.log("TechLogo name coverage table");
console.log("===========================");
for (const row of table) {
  console.log(`| ${row.name} | ${row.group ?? "(none)"} | ${row.status} |`);
}
console.log("===========================");

const missing = table.filter((r) => r.status === "FALLBACK");

if (missing.length > 0) {
  console.error(`Unresolved TechLogo names (no explicit case): ${missing.map((r) => r.name).join(", ")}`);
  process.exit(1);
}

console.log(`All ${table.length} referenced TechLogo names resolved to an explicit case.`);
