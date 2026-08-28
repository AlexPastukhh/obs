const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const schedule = JSON.parse(fs.readFileSync(path.join(__dirname, "combined-schedule.json"), "utf8"));
const masterPath = path.join(root, "INDEPENDENT_TRANSCRIPT_AUDIT_MASTER_ALL_306.md");
const master = fs.existsSync(masterPath) ? fs.readFileSync(masterPath, "utf8") : "";

function norm(value) {
  return String(value || "")
    .replace(/\.svg$/i, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9а-яё]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactKey(value) {
  return norm(value).replace(/\s+/g, "");
}

function tokens(value) {
  return new Set(norm(value).split(" ").filter((x) => x.length > 1));
}

function score(a, b) {
  const at = tokens(a);
  const bt = tokens(b);
  if (!at.size || !bt.size) return 0;
  let inter = 0;
  for (const t of at) if (bt.has(t)) inter++;
  return inter / Math.max(at.size, bt.size);
}

const conspects = [];
const seen = new Set();
function addConspect(entry) {
  const key = `${entry.svg}||${entry.folder}`.toLowerCase();
  if (seen.has(key)) return;
  seen.add(key);
  conspects.push({
    ...entry,
    keySvg: norm(entry.svg),
    keyFolder: norm(entry.folder),
  });
}

for (const line of master.split(/\r?\n/)) {
  const match = line.match(/^\| ([^|]+) \| `([^`]+)` \| [^|]+ \| [^|]+ \| `([^`]+)` \|/);
  if (match) {
    addConspect({
      row: match[1].trim(),
      svg: match[2].trim(),
      folder: match[3].trim(),
    });
  }
}

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "tmp_pdf_extract") {
    const svgPath = path.join(root, entry.name, `${entry.name}.svg`);
    const sourceDir = path.join(root, entry.name, "source");
    const sourceSvg = fs.existsSync(sourceDir)
      ? fs.readdirSync(sourceDir).find((name) => /\.svg$/i.test(name))
      : "";
    const svg = fs.existsSync(svgPath) ? `${entry.name}.svg` : sourceSvg || "";
    addConspect({ row: "workspace", svg, folder: entry.name });
  }
}

function findMatch(raw) {
  const key = norm(raw);
  if (!key) return { status: "EMPTY", best: null, score: 0 };

  const manual = new Map([
    ["block scroll", "scroll block"],
    ["svg fw react", "svg react"],
    ["query syntax", "linq query syntax"],
    ["exception handlers", "exceptionhandlers"],
  ]);
  const mappedKey = manual.get(key);
  if (mappedKey) {
    const manualMatch = conspects.find((c) => c.keyFolder === mappedKey || c.keySvg === mappedKey || compactKey(c.folder) === mappedKey || compactKey(c.svg) === mappedKey);
    if (manualMatch) return { status: "MATCH_ACCEPTED", best: manualMatch, score: 1 };
  }

  const exact = conspects.find((c) => c.keyFolder === key || c.keySvg === key);
  if (exact) return { status: "MATCH_EXACT", best: exact, score: 1 };

  const compact = compactKey(raw);
  const compactExact = conspects.find((c) => compactKey(c.folder) === compact || compactKey(c.svg) === compact);
  if (compactExact) return { status: "MATCH_FUZZY", best: compactExact, score: 0.98 };

  const contains = conspects
    .map((c) => {
      const sf = Math.max(score(raw, c.folder), score(raw, c.svg));
      const contains =
        key.length >= 5 &&
        ((c.keyFolder && (c.keyFolder.includes(key) || key.includes(c.keyFolder))) ||
          (c.keySvg && (c.keySvg.includes(key) || key.includes(c.keySvg))));
      return { c, sf: contains ? Math.max(sf, 0.82) : sf };
    })
    .sort((a, b) => b.sf - a.sf)[0];

  if (contains && contains.sf >= 0.72) return { status: "MATCH_FUZZY", best: contains.c, score: contains.sf };
  if (contains && contains.sf >= 0.45) return { status: "POSSIBLE_MATCH", best: contains.c, score: contains.sf };
  return { status: "NO_MATCH", best: contains?.c || null, score: contains?.sf || 0 };
}

const checks = [];
for (const item of schedule) {
  const parts = item.topic
    .split(";")
    .map((x) => x.trim())
    .filter(Boolean);
  for (const part of parts) {
    const expandedParts = norm(part) === "redux" ? ["redux rtk", "redux basics"] : [part];
    for (const expandedPart of expandedParts) {
      const m = findMatch(expandedPart);
      checks.push({
      month: item.month,
      day: item.day,
      source: item.source,
      sourcePart: item.area === "react-client-js-css" ? item.part : "",
      originalTopicNote: item.topic,
      conspectName: expandedPart,
      planName: part,
      status: m.status,
      matchedRow: m.best?.row || "",
      matchedSvg: m.best?.svg || "",
      matchedFolder: m.best?.folder || "",
      score: Number(m.score.toFixed(2)),
    });
    }
  }
}

const counts = checks.reduce((acc, x) => {
  acc[x.status] = (acc[x.status] || 0) + 1;
  return acc;
}, {});

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

const csv = [
  [
    "month",
    "day",
    "source",
    "sourcePart",
    "conspectName",
    "planName",
    "status",
    "matchedRow",
    "matchedSvg",
    "matchedFolder",
    "score",
    "originalTopicNote",
  ].map(csvCell).join(","),
  ...checks.map((x) => [
    x.month,
    x.day,
    x.source,
    x.sourcePart,
    x.conspectName,
    x.planName,
    x.status,
    x.matchedRow,
    x.matchedSvg,
    x.matchedFolder,
    x.score,
    x.originalTopicNote,
  ].map(csvCell).join(",")),
].join("\n");

fs.writeFileSync(path.join(root, "COMBINED_REPETITION_PLAN_CONSPECT_MATCHES.csv"), csv, "utf8");

let md = "# Combined Repetition Plan - Conspect Match Audit\n\n";
md += "Generated: 2026-07-23\n\n";
md += "Scope: split each `Topic note` by semicolon and check whether each resulting conspect name has a corresponding entry in `INDEPENDENT_TRANSCRIPT_AUDIT_MASTER_ALL_306.md`.\n\n";
md += "Manual accepted mappings applied: `query syntax` -> `linq query syntax.svg`; `EXCEPTION HANDLERS` -> `EXCEPTIONHANDLERS.svg`; `svg * ( fw_react)` -> `svg react.svg`; `redux` expands into `redux rtk.svg` and `redux basics.svg`; `block scroll` -> `scroll block.svg` because the non-CSS `scroll block` conspect includes the practical scroll-locking/body behavior layer.\n\n";
md += "## Summary\n\n";
md += "```text\n";
md += `schedule rows: ${schedule.length}\n`;
md += `split conspect names checked: ${checks.length}\n`;
for (const key of Object.keys(counts).sort()) md += `${key}: ${counts[key]}\n`;
md += "```\n\n";

for (const status of ["NO_MATCH", "POSSIBLE_MATCH", "MATCH_ACCEPTED", "MATCH_FUZZY", "MATCH_EXACT"]) {
  const group = checks.filter((x) => x.status === status);
  if (!group.length) continue;
  md += `## ${status}\n\n`;
  md += "| Month | Day | Conspect name from plan | Matched SVG/folder | Score | Source |\n";
  md += "|---|---:|---|---|---:|---|\n";
  for (const x of group) {
    const matched = x.matchedSvg ? `row ${x.matchedRow}: \`${x.matchedSvg}\` / \`${x.matchedFolder}\`` : "-";
    md += `| ${x.month} | ${x.day ?? ""} | \`${x.conspectName.replace(/\|/g, "/")}\` | ${matched.replace(/\|/g, "/")} | ${x.score} | ${x.source}${x.sourcePart ? ` part ${x.sourcePart}` : ""} |\n`;
  }
  md += "\n";
}

fs.writeFileSync(path.join(root, "COMBINED_REPETITION_PLAN_CONSPECT_MATCH_AUDIT.md"), md, "utf8");

console.log(`schedule rows=${schedule.length}`);
console.log(`split conspect names=${checks.length}`);
console.log(counts);
console.log("wrote COMBINED_REPETITION_PLAN_CONSPECT_MATCH_AUDIT.md");
console.log("wrote COMBINED_REPETITION_PLAN_CONSPECT_MATCHES.csv");
