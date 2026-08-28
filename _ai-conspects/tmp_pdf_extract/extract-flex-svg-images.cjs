const fs = require("fs");
const path = require("path");

const svgPath = "C:\\Users\\alexa\\Downloads\\flex,centering etc.svg";
const outDir = path.join(__dirname, "flex-centering-images");
fs.mkdirSync(outDir, { recursive: true });

const svg = fs.readFileSync(svgPath, "utf8");
const symbolRe = /<symbol id="([^"]+)"><image href="data:image\/png;base64,([^"]+)"/g;
const symbols = new Map();
let match;
while ((match = symbolRe.exec(svg))) {
  symbols.set(match[1], Buffer.from(match[2], "base64"));
}

const useRe = /<g transform="translate\(([^)]+)\)[^"]*"><use href="#([^"]+)" width="([^"]+)" height="([^"]+)"/g;
const uses = [];
while ((match = useRe.exec(svg))) {
  const [x, y] = match[1].split(/\s+/).map(Number);
  uses.push({ x, y, id: match[2], width: Number(match[3]), height: Number(match[4]) });
}

const rows = [];
uses.forEach((u, index) => {
  const buf = symbols.get(u.id);
  if (!buf) return;
  const name = `${String(index + 1).padStart(2, "0")}-${u.id}.png`;
  fs.writeFileSync(path.join(outDir, name), buf);
  rows.push({ file: name, ...u });
});

rows.sort((a, b) => a.y - b.y || a.x - b.x);
fs.writeFileSync(path.join(outDir, "index.json"), JSON.stringify(rows, null, 2), "utf8");
console.log(`symbols=${symbols.size}`);
console.log(`uses=${uses.length}`);
console.log(`wrote=${rows.length}`);
for (const row of rows) {
  console.log(`${row.file}\tx=${row.x}\ty=${row.y}\tw=${row.width}\th=${row.height}`);
}
