const fs = require("fs");
const path = require("path");

const inputs = [
  { month: "02", file: "asp area note 02.txt", source: "asp area note 02.pdf" },
  { month: "03", file: "area 03 asp.txt", source: "area 03 asp.pdf" },
  { month: "04", file: "topic nots asp 4.txt", source: "topic nots asp 4.pdf" },
  {
    month: "react-client-js-css",
    file: "react or client.js.css area.txt",
    source: "react or client.js.css area.pdf",
    partToMonth: { 1: "02", 2: "03", 3: "04" },
  },
];

function cleanLine(line) {
  return line.replace(/\r/g, "").trim();
}

function parseText(text, meta) {
  const lines = text.split(/\n/).map(cleanLine);
  const items = [];
  let currentDay = null;
  let currentPart = 1;
  let lastNumberedDay = null;
  let order = 0;
  let current = null;
  let field = null;

  function finish() {
    if (!current) return;
    current.topic = current.topic.replace(/\s+/g, " ").trim();
    current.details = current.details.replace(/\s+/g, " ").trim();
    current.block = current.block.replace(/\s+/g, " ").trim();
    if (meta.partToMonth && meta.partToMonth[current.part]) {
      current.area = meta.month;
      current.month = meta.partToMonth[current.part];
    } else {
      current.area = meta.month;
    }
    if (current.topic || current.details || current.block) items.push(current);
    current = null;
    field = null;
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || /^-- \d+ of \d+ --$/.test(line) || line === "topic notes") continue;

    const dayMatch = line.match(/^day(?:\s+(\d+))?$/i);
    if (dayMatch) {
      finish();
      if (dayMatch[1]) {
        const nextDay = Number(dayMatch[1]);
        if (lastNumberedDay !== null && nextDay < lastNumberedDay) currentPart += 1;
        currentDay = nextDay;
        lastNumberedDay = nextDay;
      }
      continue;
    }

    if (/^Topic note\s*:/i.test(line)) {
      finish();
      current = {
        month: meta.month,
        source: meta.source,
        part: currentPart,
        order: order++,
        day: currentDay,
        topic: line.replace(/^Topic note\s*:\s*/i, ""),
        details: "",
        block: "",
      };
      field = "topic";
      continue;
    }

    if (/^details\s*:/i.test(line)) {
      if (!current) {
        current = { month: meta.month, source: meta.source, part: currentPart, order: order++, day: currentDay, topic: "", details: "", block: "" };
      }
      current.details += " " + line.replace(/^details\s*:\s*/i, "");
      field = "details";
      continue;
    }

    if (/^block\s*:/i.test(line)) {
      if (!current) {
        current = { month: meta.month, source: meta.source, part: currentPart, order: order++, day: currentDay, topic: "", details: "", block: "" };
      }
      current.block += " " + line.replace(/^block\s*:\s*/i, "");
      field = "block";
      continue;
    }

    if (current && field) {
      current[field] += " " + line;
    }
  }
  finish();
  return items;
}

const all = [];
for (const input of inputs) {
  const text = fs.readFileSync(path.join(__dirname, input.file), "utf8");
  all.push(...parseText(text, input));
}

all.sort((a, b) => {
  const m = a.month.localeCompare(b.month);
  if (m !== 0) return m;
  const d = (a.day ?? 999) - (b.day ?? 999);
  if (d !== 0) return d;
  const s = a.source.localeCompare(b.source);
  if (s !== 0) return s;
  return a.order - b.order;
});

fs.writeFileSync(path.join(__dirname, "combined-schedule.json"), JSON.stringify(all, null, 2), "utf8");

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

const csv = [
  ["area", "part", "day", "topic", "details", "block", "source"].map(csvCell).join(","),
  ...all.map((item) => [
    item.month,
    item.part,
    item.day ?? "",
    item.topic,
    item.details,
    item.block,
    item.source,
  ].map(csvCell).join(",")),
].join("\n");
fs.writeFileSync(path.join(__dirname, "..", "COMBINED_REPETITION_PLAN_FROM_PDFS.csv"), csv, "utf8");

let md = "# Combined Repetition Plan From PDFs\n\n";
md += "Generated: 2026-07-23\n\n";
md += "Source PDFs:\n";
for (const input of inputs) md += `- ${input.source}\n`;
md += "\n";
md += "Notes:\n";
md += "- Original `Topic note` names are preserved as extracted from the PDFs.\n";
md += "- Rows where a PDF had `day` without a number inherit the previous numbered day in the same source PDF.\n";
md += "- `react or client.js.css area.pdf` contains several month-like parts: Part 1 is merged into month 02, Part 2 into month 03, Part 3 into month 04.\n";
md += "- Each row keeps its source PDF so ASP and React/client/CSS items can be distinguished after merging.\n\n";

let lastMonth = null;
let lastDay = null;
for (const item of all) {
  if (item.month !== lastMonth) {
    md += `## Month ${item.month}\n\n`;
    lastMonth = item.month;
    lastDay = null;
  }
  if (item.day !== lastDay) {
    md += `### Day ${item.day ?? "unspecified"}\n\n`;
    lastDay = item.day;
  }
  md += `- ${item.topic || "(empty topic)"}\n`;
  if (item.details) md += `  - details: ${item.details}\n`;
  if (item.block) md += `  - block: ${item.block}\n`;
  md += `  - source: ${item.source}\n`;
  if (item.area === "react-client-js-css") md += `  - source part: ${item.part}\n`;
}

fs.writeFileSync(path.join(__dirname, "..", "COMBINED_REPETITION_PLAN_FROM_PDFS.md"), md, "utf8");
console.log(`items=${all.length}`);
console.log("wrote tmp_pdf_extract/combined-schedule.json");
console.log("wrote COMBINED_REPETITION_PLAN_FROM_PDFS.md");
console.log("wrote COMBINED_REPETITION_PLAN_FROM_PDFS.csv");
