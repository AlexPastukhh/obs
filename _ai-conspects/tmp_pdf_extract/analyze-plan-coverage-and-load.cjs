const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const schedule = JSON.parse(fs.readFileSync(path.join(__dirname, "combined-schedule.json"), "utf8"));
const matches = parseCsv(fs.readFileSync(path.join(root, "COMBINED_REPETITION_PLAN_CONSPECT_MATCHES.csv"), "utf8"));
const masterPath = path.join(root, "INDEPENDENT_TRANSCRIPT_AUDIT_MASTER_ALL_306.md");
const master = fs.existsSync(masterPath) ? fs.readFileSync(masterPath, "utf8") : "";

function norm(value) {
  return String(value || "")
    .replace(/\.svg$/i, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTicks(value) {
  return String(value || "").replace(/^`|`$/g, "").trim();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const header = rows.shift() || [];
  return rows.filter((r) => r.length === header.length).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

const masterConspects = [];
for (const line of master.split(/\r?\n/)) {
  const parts = line.split("|").map((x) => x.trim());
  if (parts.length < 6) continue;
  const row = parts[1];
  const svg = stripTicks(parts[2]);
  const folder = stripTicks(parts[5]);
  if (!/^(\d+|extra-\d+)$/.test(row) || !folder || folder === "-" || folder.startsWith("-") || folder.startsWith("_")) continue;
  masterConspects.push({ source: "master", row, svg, folder, key: norm(folder || svg) });
}

const localFolders = fs.readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !name.startsWith(".") && !name.startsWith("_") && !name.startsWith("-") && name !== "tmp_pdf_extract")
  .map((folder) => ({ source: "workspace", row: "workspace", svg: "", folder, key: norm(folder) }));

function mergeByKey(items) {
  const map = new Map();
  for (const item of items) {
    if (!item.key) continue;
    if (!map.has(item.key)) map.set(item.key, { key: item.key, folders: new Set(), svgs: new Set(), rows: new Set(), sources: new Set() });
    const agg = map.get(item.key);
    agg.folders.add(item.folder);
    if (item.svg) agg.svgs.add(item.svg);
    if (item.row) agg.rows.add(item.row);
    agg.sources.add(item.source);
  }
  return [...map.values()].map((x) => ({
    key: x.key,
    folders: [...x.folders].sort(),
    svgs: [...x.svgs].sort(),
    rows: [...x.rows].sort(),
    sources: [...x.sources].sort(),
  })).sort((a, b) => a.key.localeCompare(b.key));
}

const allConspects = mergeByKey([...masterConspects, ...localFolders]);
const plannedKeys = new Set(matches.map((m) => norm(m.matchedFolder || m.conspectName)).filter(Boolean));
const notInPlan = allConspects.filter((c) => !plannedKeys.has(c.key));

const scheduleByDay = new Map();
for (const item of schedule) {
  const key = `${item.month}-${String(item.day).padStart(2, "0")}`;
  if (!scheduleByDay.has(key)) scheduleByDay.set(key, []);
  scheduleByDay.get(key).push(item);
}

const matchedByDay = new Map();
for (const row of matches) {
  const key = `${row.month}-${String(row.day).padStart(2, "0")}`;
  if (!matchedByDay.has(key)) matchedByDay.set(key, []);
  matchedByDay.get(key).push(row);
}

function hasLimiter(item) {
  return Boolean(String(item.details || "").trim() || String(item.block || "").trim());
}

function dayWeight(key) {
  const items = scheduleByDay.get(key) || [];
  const conspects = matchedByDay.get(key) || [];
  const limited = items.filter(hasLimiter).length;
  return {
    key,
    month: key.slice(0, 2),
    day: Number(key.slice(3)),
    scheduleRows: items.length,
    conspects: conspects.length,
    limitedRows: limited,
    fullRows: items.length - limited,
    loadScore: conspects.length + Math.max(0, items.length - limited),
    topics: items.map((x) => x.topic),
  };
}

const dayLoads = [...scheduleByDay.keys()].sort().map(dayWeight);
const heavyDays = dayLoads.filter((d) => d.conspects >= 5 || d.loadScore >= 7);
const lightDays = dayLoads.filter((d) => d.conspects <= 2).map((d) => d.key);
const mostOverloaded = dayLoads.filter((d) => d.loadScore >= 9).sort((a, b) => b.loadScore - a.loadScore || b.conspects - a.conspects);

const limitedRows = schedule.filter(hasLimiter);
const blockRows = schedule.filter((x) => String(x.block || "").trim());
const detailsOnlyRows = schedule.filter((x) => String(x.details || "").trim() && !String(x.block || "").trim());

let md = "# Repetition Plan Coverage And Load Review\n\n";
md += "Generated: 2026-07-23\n\n";
md += "## Scope\n\n";
md += "This compares the combined PDF repetition plan against local workspace conspects and the master audit table. Names are normalized for case, spacing and punctuation. Manual mappings from the conspect match audit are already reflected in the CSV input.\n\n";
md += "## Coverage Summary\n\n";
md += "```text\n";
md += `schedule rows: ${schedule.length}\n`;
md += `planned conspect items: ${matches.length}\n`;
md += `unique planned matched folders: ${new Set(matches.map((m) => norm(m.matchedFolder || m.conspectName))).size}\n`;
md += `unique local/master conspects: ${allConspects.length}\n`;
md += `local/master conspects not in current PDF plan: ${notInPlan.length}\n`;
md += `days with schedule entries: ${dayLoads.length}\n`;
md += `rows with details/block limiter: ${limitedRows.length}\n`;
md += `rows with explicit block: ${blockRows.length}\n`;
md += `rows with details only: ${detailsOnlyRows.length}\n`;
md += "```\n\n";

md += "## Meaning Of Details And Block\n\n";
md += "`Topic note` names the conspect or conspects to repeat. If several names are separated by semicolons, each is a separate conspect item for that day.\n\n";
md += "`details` narrows the repetition target inside the conspect: repeat the named subtopics, caveats, APIs, methods or concepts, not necessarily the whole transcript. Treat it as a study prompt and question-generation filter.\n\n";
md += "`block` is stronger than ordinary details: it points to a specific section/fragment inside the conspect. For these rows, the default should be a targeted pass over that block, plus only enough surrounding context to make it understandable.\n\n";
md += "If both `details` and `block` exist, use `block` as the anchor and `details` as the expected content to verify from that block.\n\n";

md += "## Load Notes\n\n";
md += "A fair daily load should count limited rows as lighter than full-conspect rows. A day with 5+ conspects is probably heavy unless many rows have narrow `details`/`block` constraints.\n\n";
md += "Recommended balancing rule: cap normal days at about 3 full conspects or 5 lightweight/partial items. Move overflow to nearest free/light day in the same week, keeping ASP and React/client/CSS mixed when possible.\n\n";

md += "## Redistribution Strategy\n\n";
md += "Do not blindly move every semicolon-separated item. First classify each row:\n\n";
md += "- `full`: no `details` and no `block`; repeat the whole transcript and generate broad questions.\n";
md += "- `partial`: has `details`; repeat only those subtopics, plus minimal context.\n";
md += "- `block`: has `block`; open the named section/visual block and repeat that fragment exactly.\n\n";
md += "Suggested capacity target:\n\n";
md += "```text\n";
md += "normal day: 2-3 full conspects, or 4-5 partial/block items\n";
md += "heavy day warning: 5+ conspects or load score >= 7\n";
md += "hard split required: load score >= 9\n";
md += "```\n\n";
md += "Best move candidates are broad semicolon bundles with no `details`/`block`, especially from the same day. Preserve rows with explicit `block` near their original date because those are already intentionally scoped.\n\n";

md += "## Days To Split First\n\n";
md += "| Date | Why split | Suggested action |\n";
md += "|---|---|---|\n";
for (const d of mostOverloaded) {
  const action = d.key === "03-05"
    ? "Split into at least 3 sessions: MVC/Razor group, Razor helpers/components group, TypeScript basics group."
    : d.key === "03-10"
      ? "Split backend security/file/download topics away from JS bytes/streams/concurrency topics."
      : d.key === "03-07"
        ? "Keep the `filters` and `ef has conversion` block repeats, move the auth/CORS/React utility bundle to a light day."
        : d.key === "04-16"
          ? "Split EF/modeling items from events/conventions/claims; this is 9 full items in one row."
          : d.key === "03-06"
            ? "Keep EF CORE GENERAL partial block; split explicit interface/lazy loading from Redux/Zustand/React state."
            : d.key === "04-04"
              ? "Split JS array/not items from ASP headers/auth/server/ascii items."
              : "Move one broad semicolon group to the nearest light day in the same month.";
  md += `| ${d.key} | ${d.conspects} conspect items, load score ${d.loadScore} | ${action} |\n`;
}
md += "\n";

md += "## Heaviest Days\n\n";
md += "| Date | Schedule rows | Conspect items | Limited rows | Load score | Topics |\n";
md += "|---|---:|---:|---:|---:|---|\n";
for (const d of heavyDays.sort((a, b) => b.loadScore - a.loadScore || b.conspects - a.conspects)) {
  md += `| ${d.key} | ${d.scheduleRows} | ${d.conspects} | ${d.limitedRows} | ${d.loadScore} | ${d.topics.map((x) => `\`${x.replace(/\|/g, "/")}\``).join("<br>")} |\n`;
}
md += "\n";

md += "## Light Days\n\n";
md += lightDays.length ? lightDays.map((x) => `- ${x}`).join("\n") + "\n\n" : "(none)\n\n";

md += "## Rows With Details Or Block\n\n";
md += "| Month | Day | Topic note | Details | Block |\n";
md += "|---|---:|---|---|---|\n";
for (const item of limitedRows) {
  md += `| ${item.month} | ${item.day} | \`${item.topic.replace(/\|/g, "/")}\` | ${String(item.details || "").replace(/\|/g, "/")} | ${String(item.block || "").replace(/\|/g, "/")} |\n`;
}
md += "\n";

md += "## Conspects Existing But Not In Current PDF Plan\n\n";
md += "These are local/master conspects that are not scheduled by the current four-PDF combined plan. This does not mean they are bad or unnecessary; it means they need either a separate review cycle or insertion into light days.\n\n";
md += "| Key | Folders | Rows | SVGs |\n";
md += "|---|---|---|---|\n";
for (const c of notInPlan) {
  md += `| \`${c.key.replace(/\|/g, "/")}\` | ${c.folders.map((x) => `\`${x.replace(/\|/g, "/")}\``).join("<br>")} | ${c.rows.join(", ")} | ${c.svgs.map((x) => `\`${x.replace(/\|/g, "/")}\``).join("<br>")} |\n`;
}

fs.writeFileSync(path.join(root, "REPETITION_PLAN_COVERAGE_AND_LOAD_REVIEW.md"), md, "utf8");

const csv = [
  '"key","folders","rows","svgs"',
  ...notInPlan.map((c) => [c.key, c.folders.join(" | "), c.rows.join(" | "), c.svgs.join(" | ")]
    .map((x) => `"${String(x).replace(/"/g, '""')}"`).join(",")),
].join("\n");
fs.writeFileSync(path.join(root, "REPETITION_PLAN_CONSPECTS_NOT_IN_CURRENT_PLAN.csv"), csv, "utf8");

console.log(`local/master conspects=${allConspects.length}`);
console.log(`planned unique=${new Set(matches.map((m) => norm(m.matchedFolder || m.conspectName))).size}`);
console.log(`not in plan=${notInPlan.length}`);
console.log(`heavy days=${heavyDays.length}`);
console.log(`limited rows=${limitedRows.length}`);
console.log("wrote REPETITION_PLAN_COVERAGE_AND_LOAD_REVIEW.md");
console.log("wrote REPETITION_PLAN_CONSPECTS_NOT_IN_CURRENT_PLAN.csv");
