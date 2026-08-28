const fs = require("fs");
const path = require("path");
const { PDFParse } = require("./node_modules/pdf-parse");

const files = [
  "C:/Users/alexa/Downloads/asp area note 02.pdf",
  "C:/Users/alexa/Downloads/area 03 asp.pdf",
  "C:/Users/alexa/Downloads/topic nots asp 4.pdf",
  "C:/Users/alexa/Downloads/react or client.js.css area.pdf",
];

(async () => {
  for (const file of files) {
    const parser = new PDFParse({ data: fs.readFileSync(file) });
    const data = await parser.getText();
    const output = path.join(__dirname, path.basename(file, ".pdf") + ".txt");
    fs.writeFileSync(output, data.text, "utf8");
    console.log(`${path.basename(file)} pages=${data.pages?.length || "?"} chars=${data.text.length} -> ${output}`);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
