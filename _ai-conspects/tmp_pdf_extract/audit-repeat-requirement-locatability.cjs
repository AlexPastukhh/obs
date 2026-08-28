const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const schedule = JSON.parse(fs.readFileSync(path.join(__dirname, "combined-schedule.json"), "utf8"));
const matches = parseCsv(fs.readFileSync(path.join(root, "COMBINED_REPETITION_PLAN_CONSPECT_MATCHES.csv"), "utf8"));

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

function norm(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}#.+-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function usefulTokens(value) {
  const stop = new Set([
    "the", "and", "or", "with", "what", "when", "why", "how", "some", "basic", "basics",
    "whole", "block", "part", "only", "without", "from", "into", "for", "to", "of", "in",
    "a", "an", "is", "are", "be", "can", "need", "needs", "this", "that", "it", "not",
    "возможно", "стоит", "лучше", "по", "из", "за", "и", "в", "на", "это"
  ]);
  return norm(value).split(" ").filter((t) => t.length > 2 && !stop.has(t));
}

function splitAnchors(value) {
  const raw = String(value || "")
    .replace(/[“”]/g, '"')
    .split(/[;\n]+/)
    .map((x) => x.trim())
    .filter(Boolean);
  const result = [];
  for (const item of raw) {
    const cleaned = item.replace(/^["']|["']$/g, "").trim();
    if (cleaned) result.push(cleaned);
  }
  return result;
}

function scheduleKey(item) {
  return `${item.month}|${item.day}|${item.source}|${item.topic}`;
}

const matchByRow = new Map();
for (const row of matches) {
  const key = `${row.month}|${Number(row.day)}|${row.source}|${row.originalTopicNote}`;
  if (!matchByRow.has(key)) matchByRow.set(key, []);
  matchByRow.get(key).push(row);
}

const corpusCache = new Map();
function conspectCorpus(folder) {
  if (corpusCache.has(folder)) return corpusCache.get(folder);
  const folderPath = path.join(root, folder);
  const files = [];
  if (fs.existsSync(folderPath)) collectTextFiles(folderPath, files);
  const chunks = [];
  for (const file of files) {
    try {
      const text = fs.readFileSync(file, "utf8");
      chunks.push({ file, text, normText: norm(text) });
    } catch {}
  }
  const corpus = {
    files: chunks,
    normAll: chunks.map((x) => x.normText).join("\n"),
  };
  corpusCache.set(folder, corpus);
  return corpus;
}

function collectTextFiles(dir, files) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".git", "audit-assets", "source"].includes(entry.name)) {
        // Source SVGs are often base64-heavy; data/regions/transcripts carry searchable text.
        continue;
      }
      collectTextFiles(full, files);
    } else if (/\.(md|txt|json|csv)$/i.test(entry.name)) {
      if (/APPLY_|ARCHIVE|MANIFEST|STATUS|MARKUP_POLICY/i.test(entry.name)) continue;
      if (entry.size > 2_000_000) continue;
      files.push(full);
    }
  }
}

function anchorScore(anchor, folders) {
  const tokens = usefulTokens(anchor);
  if (!tokens.length) return { score: 0, found: false, evidence: "", file: "" };
  const anchorNorm = norm(anchor);
  let best = { score: 0, found: false, evidence: "", file: "" };

  for (const folder of folders) {
    const corpus = conspectCorpus(folder);
    for (const file of corpus.files) {
      let score = 0;
      let evidence = "";
      if (anchorNorm.length >= 4 && file.normText.includes(anchorNorm)) {
        score = 1;
        evidence = snippet(file.text, anchor);
      } else {
        let hits = 0;
        for (const token of tokens) if (file.normText.includes(token)) hits++;
        score = hits / tokens.length;
        if (score > 0) evidence = tokenSnippet(file.text, tokens);
      }
      if (score > best.score) {
        best = {
          score,
          found: score >= 0.55,
          evidence: evidence.replace(/\s+/g, " ").slice(0, 220),
          file: path.relative(root, file.file),
        };
      }
    }
  }
  return best;
}

function snippet(text, phrase) {
  const idx = text.toLowerCase().indexOf(String(phrase).toLowerCase());
  if (idx < 0) return tokenSnippet(text, usefulTokens(phrase));
  return text.slice(Math.max(0, idx - 90), Math.min(text.length, idx + phrase.length + 130));
}

function tokenSnippet(text, tokens) {
  const lower = text.toLowerCase();
  let bestIdx = -1;
  for (const token of tokens) {
    const idx = lower.indexOf(token.toLowerCase());
    if (idx >= 0 && (bestIdx < 0 || idx < bestIdx)) bestIdx = idx;
  }
  if (bestIdx < 0) return "";
  return text.slice(Math.max(0, bestIdx - 90), Math.min(text.length, bestIdx + 180));
}

function rowVerdict(item, rowMatches, anchorResults) {
  if (!rowMatches.length) return "MATCH_MISSING";
  if (!item.details && !item.block) return "CLEAR_WHOLE_CONSPECT";
  const anchors = anchorResults.length;
  const found = anchorResults.filter((x) => x.score >= 0.55).length;
  const strong = anchorResults.filter((x) => x.score >= 0.8).length;
  if (!anchors) return "CLEAR_WHOLE_CONSPECT";
  if (strong === anchors) return "CLEAR_TARGET_FOUND";
  if (found === anchors) return "MOSTLY_LOCATABLE";
  if (found > 0) return "PARTIAL_LOCATABLE_NEEDS_MANUAL_BOUNDARY";
  return "NOT_LOCATED_NEEDS_SVG_OR_MANUAL_BLOCK";
}

const audits = [];
const manualFollowUp = new Map([
  [
    "02|9|scopes and idisposable",
    {
      final: "MANUAL_CLEAR_TARGET_FOUND",
      note:
        "Human-readable target is clear: repeat IDisposable/DI-scope basics, ownership, deterministic Dispose/using, scope disposal, and only high-level finalizer contrast. Do not do the deep finalizer regions. Use 05-stage5-corrected-source-preserving-transcript-v002.md R01/S-001..S-005 and 06-repetition-guide-v002.md mental model.",
    },
  ],
  [
    "02|10|modelstate",
    {
      final: "MANUAL_CLEAR_TARGET_FOUND",
      note:
        "Human-readable target is clear and found: modelstate/regions/modelstate-final.md has section 1 ModelState basics, section 3 TryValidateModel, and section 4 Prefixes/collections/repeated validation. This covers basics, methods/properties, and prefix explanation.",
    },
  ],
  [
    "02|19|async processing of multiple calls,parallelism",
    {
      final: "MANUAL_CLEAR_TARGET_FOUND",
      note:
        "Human-readable target is clear: the misspelled source label `Sumary -whole block with border` maps to the summary/selection-guide block. Use 09-full-combined-final-transcript.md section `## 12 Selection guide` plus nearby comparison of SemaphoreSlim + Task.WhenAll vs Parallel.ForEachAsync.",
    },
  ],
  [
    "02|25|streaming",
    {
      final: "MANUAL_CLEAR_TARGET_FOUND",
      note:
        "Target is now locally restored and found: R05 SSE / EventSource / server-side writer / heartbeat / reconnect is covered by streaming/regions/R05-sse-eventsource-writer-heartbeat-reconnect.md, restored from local extracted SVG/source images/contact sheet.",
    },
  ],
]);

for (const item of schedule) {
  const key = scheduleKey(item);
  const rowMatches = matchByRow.get(key) || [];
  const folders = [...new Set(rowMatches.map((m) => m.matchedFolder).filter(Boolean))];
  const detailsAnchors = splitAnchors(item.details);
  const blockAnchors = splitAnchors(item.block);
  const anchors = [...blockAnchors.map((a) => ({ type: "block", text: a })), ...detailsAnchors.map((a) => ({ type: "details", text: a }))];
  const anchorResults = anchors.map((anchor) => ({ ...anchor, ...anchorScore(anchor.text, folders) }));
  const verdict = rowVerdict(item, rowMatches, anchorResults);
  const manual = manualFollowUp.get(`${item.month}|${item.day}|${item.topic}`);
  audits.push({
    month: item.month,
    day: item.day,
    source: item.source,
    topic: item.topic,
    matchedFolders: folders.join(" | "),
    details: item.details,
    block: item.block,
    anchorCount: anchors.length,
    foundAnchors: anchorResults.filter((x) => x.score >= 0.55).length,
    strongAnchors: anchorResults.filter((x) => x.score >= 0.8).length,
    verdict,
    finalVerdict: manual?.final || verdict,
    manualNote: manual?.note || "",
    anchors: anchorResults,
  });
}

const counts = audits.reduce((acc, x) => {
  acc[x.finalVerdict] = (acc[x.finalVerdict] || 0) + 1;
  return acc;
}, {});

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

const csv = [
  ["month", "day", "source", "topic", "matchedFolders", "details", "block", "anchorCount", "foundAnchors", "strongAnchors", "autoVerdict", "finalVerdict", "manualNote", "anchorEvidence"]
    .map(csvCell).join(","),
  ...audits.map((x) => [
    x.month,
    x.day,
    x.source,
    x.topic,
    x.matchedFolders,
    x.details,
    x.block,
    x.anchorCount,
    x.foundAnchors,
    x.strongAnchors,
    x.verdict,
    x.finalVerdict,
    x.manualNote,
    x.anchors.map((a) => `${a.type}: ${a.text} => ${a.score.toFixed(2)} ${a.file}`).join(" || "),
  ].map(csvCell).join(",")),
].join("\n");
fs.writeFileSync(path.join(root, "REPETITION_REQUIREMENT_LOCATABILITY_AUDIT.csv"), csv, "utf8");

let md = "# Repetition Requirement Locatability Audit\n\n";
md += "Generated: 2026-07-23\n\n";
md += "Purpose: for every schedule row, determine whether the requested repetition target is understandable and locally findable inside the matched conspect transcript/region/data text. Rows without `details`/`block` are treated as whole-conspect repetitions.\n\n";
md += "Important: this is a local text-search audit, not a fresh full SVG visual review for every row. Rows marked `NOT_LOCATED` or `PARTIAL_LOCATABLE` are the ones where SVG/manual inspection is most useful.\n\n";
md += "## Summary\n\n```text\n";
md += `schedule rows checked: ${audits.length}\n`;
for (const key of Object.keys(counts).sort()) md += `${key}: ${counts[key]}\n`;
md += "```\n\n";

md += "## Verdict Meaning\n\n";
md += "- `CLEAR_WHOLE_CONSPECT`: no limiter; repeat the whole matched conspect(s).\n";
md += "- `CLEAR_TARGET_FOUND`: every `details`/`block` anchor was strongly found in local transcript/data text.\n";
md += "- `MOSTLY_LOCATABLE`: anchors are findable, but wording differs enough that questions should keep the original `details` text visible.\n";
md += "- `PARTIAL_LOCATABLE_NEEDS_MANUAL_BOUNDARY`: some requested anchors are found, but at least one subtopic needs manual boundary selection or SVG check.\n";
md += "- `NOT_LOCATED_NEEDS_SVG_OR_MANUAL_BLOCK`: the request is understandable, but I could not reliably find that exact block/topic in local text.\n\n";
md += "Manual follow-up may promote an automatic weak verdict when the intended target is clear after inspecting the folder structure/transcripts, or may downgrade it when source ledgers say a block exists but no usable transcript file is present.\n\n";

md += "## Manual Follow-Up On Ambiguous Rows\n\n";
md += "| Date | Topic | Final verdict | What exactly to repeat | Why |\n";
md += "|---|---|---|---|---|\n";
for (const x of audits.filter((a) => a.manualNote)) {
  let target = "";
  if (x.topic === "scopes and idisposable") target = "IDisposable/DI-scope basics, ownership, `Dispose`/`using`, scope disposal; only high-level finalizer contrast, no deep finalizer pass.";
  else if (x.topic === "modelstate") target = "`ModelState` basics, key methods/properties, `TryValidateModel`, prefixes, collection prefixes, repeated validation.";
  else if (x.topic === "async processing of multiple calls,parallelism") target = "The bordered summary/selection-guide block: choosing between `SemaphoreSlim + Task.WhenAll` and `Parallel.ForEachAsync`, ordering/failure/allocation consequences.";
  else if (x.topic === "streaming") target = "R05 SSE/EventSource/server-side writer/heartbeat/reconnect, restored from local SVG/source images.";
  md += `| ${x.month}-${String(x.day).padStart(2, "0")} | \`${x.topic.replace(/\|/g, "/")}\` | ${x.finalVerdict} | ${target.replace(/\|/g, "/")} | ${x.manualNote.replace(/\|/g, "/")} |\n`;
}
md += "\n";

for (const verdict of ["TARGET_UNDERSTANDABLE_BUT_TRANSCRIPT_GAP", "NOT_LOCATED_NEEDS_SVG_OR_MANUAL_BLOCK", "PARTIAL_LOCATABLE_NEEDS_MANUAL_BOUNDARY", "MOSTLY_LOCATABLE", "MANUAL_CLEAR_TARGET_FOUND", "CLEAR_TARGET_FOUND", "CLEAR_WHOLE_CONSPECT"]) {
  const group = audits.filter((x) => x.finalVerdict === verdict);
  if (!group.length) continue;
  md += `## ${verdict}\n\n`;
  md += "| Date | Topic | Target limiter | Matched folders | Anchor evidence |\n";
  md += "|---|---|---|---|---|\n";
  for (const x of group) {
    const limiter = [x.block ? `block: ${x.block}` : "", x.details ? `details: ${x.details}` : ""].filter(Boolean).join("<br>") || "whole conspect";
    const evidence = x.anchors.length
      ? x.anchors.map((a) => `**${a.type}** \`${a.text.replace(/\|/g, "/")}\` score ${a.score.toFixed(2)}${a.file ? `<br>${a.file.replace(/\|/g, "/")}` : ""}${a.evidence ? `<br>${a.evidence.replace(/\|/g, "/")}` : ""}`).join("<br><br>")
      : "whole matched conspect(s)";
    md += `| ${x.month}-${String(x.day).padStart(2, "0")} | \`${x.topic.replace(/\|/g, "/")}\` | ${limiter.replace(/\|/g, "/")} | ${x.matchedFolders.replace(/\|/g, "<br>")} | ${[x.manualNote, evidence].filter(Boolean).join("<br><br>").replace(/\|/g, "/")} |\n`;
  }
  md += "\n";
}

fs.writeFileSync(path.join(root, "REPETITION_REQUIREMENT_LOCATABILITY_AUDIT.md"), md, "utf8");

console.log(`rows=${audits.length}`);
console.log(counts);
console.log("wrote REPETITION_REQUIREMENT_LOCATABILITY_AUDIT.md");
console.log("wrote REPETITION_REQUIREMENT_LOCATABILITY_AUDIT.csv");
