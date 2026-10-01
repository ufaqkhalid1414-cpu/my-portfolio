/**
 * PRD PDF — paginates only when needed (no blank pages between sections).
 * Usage: node scripts/generate-prd-pdf.js
 */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const mdPath = path.join(root, "docs", "PRD.md");
const outDocs = path.join(root, "docs", "Ufaq-Portfolio-PRD.pdf");
const outPublic = path.join(root, "public", "ufaq-portfolio-prd.pdf");
const outDesktop = path.join(root, "..", "Ufaq-Portfolio-PRD.pdf");

const md = fs.readFileSync(mdPath, "utf8");

function writePdf(file) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const stream = fs.createWriteStream(file);
  doc.pipe(stream);

  const pageBottom = () => doc.page.height - 50;
  const ensureSpace = (need = 60) => {
    if (doc.y > pageBottom() - need) doc.addPage();
  };

  const lines = md.split("\n");
  let i = 0;

  // Skip first H1 — use cover
  while (i < lines.length && !lines[i].startsWith("# ")) i++;
  i++; // past H1
  // optional H2 under title for cover subtitle
  let subtitle = "";
  if (i < lines.length && lines[i].startsWith("## ")) {
    subtitle = lines[i].replace(/^##\s+/, "").trim();
    i++;
  }

  doc.fontSize(18).fillColor("#0a0f14").text("Product Requirements Document", {
    align: "left",
  });
  doc.moveDown(0.3);
  doc.fontSize(12).fillColor("#0d9488").text(subtitle || "Ufaq Khalid — Portfolio");
  doc.moveDown(0.4);
  doc
    .fontSize(9)
    .fillColor("#555")
    .text(
      "Complete PRD for the shipped portfolio: goals, users, routes, features, content, motion, acceptance criteria, and known gaps. Design tokens & animation detail also live in the Design Sheet PDF.",
      { lineGap: 2 }
    );
  doc.moveDown(0.6);

  for (; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.replace(/\r$/, "");

    if (!line.trim()) {
      doc.moveDown(0.2);
      continue;
    }

    if (line.startsWith("---")) {
      ensureSpace(40);
      doc
        .moveTo(50, doc.y)
        .lineTo(doc.page.width - 50, doc.y)
        .strokeColor("#e5e7eb")
        .lineWidth(0.5)
        .stroke();
      doc.moveDown(0.45);
      continue;
    }

    if (line.startsWith("## ")) {
      ensureSpace(80);
      doc.moveDown(0.35);
      doc
        .fontSize(12)
        .fillColor("#0d9488")
        .text(line.replace(/^##\s+/, "").trim(), { lineGap: 2 });
      doc.moveDown(0.3);
      continue;
    }

    if (line.startsWith("### ")) {
      ensureSpace(50);
      doc
        .fontSize(10)
        .fillColor("#134e4a")
        .text(line.replace(/^###\s+/, "").trim(), { lineGap: 1.5 });
      doc.moveDown(0.2);
      continue;
    }

    // Tables: simple pipe rows
    if (line.trim().startsWith("|")) {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) continue; // separator
      ensureSpace(28);
      doc
        .fontSize(8)
        .fillColor("#222")
        .text(cells.join("  ·  "), { lineGap: 1.2, width: doc.page.width - 100 });
      continue;
    }

    if (line.startsWith("- [ ]") || line.startsWith("- [x]")) {
      ensureSpace(24);
      const checked = line.startsWith("- [x]");
      const text = line.replace(/^- \[[ x]\]\s*/, "");
      doc
        .fontSize(9)
        .fillColor("#222")
        .text(`${checked ? "[x]" : "[ ]"}  ${text}`, {
          lineGap: 1.2,
          width: doc.page.width - 100,
        });
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("1. ") || /^\d+\.\s/.test(line)) {
      ensureSpace(24);
      const text = line.replace(/^- /, "•  ").replace(/^(\d+)\.\s/, "$1. ");
      doc
        .fontSize(9)
        .fillColor("#222")
        .text(text, { lineGap: 1.2, width: doc.page.width - 100 });
      continue;
    }

    // bold-ish markdown strip
    const plain = line
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1");

    ensureSpace(24);
    doc
      .fontSize(9)
      .fillColor("#222")
      .text(plain, { lineGap: 1.3, width: doc.page.width - 100 });
  }

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

(async () => {
  fs.mkdirSync(path.dirname(outDocs), { recursive: true });
  fs.mkdirSync(path.dirname(outPublic), { recursive: true });
  await writePdf(outDocs);
  await writePdf(outPublic);
  try {
    await writePdf(outDesktop);
  } catch (e) {
    console.warn("Desktop copy skipped:", e.message);
  }
  console.log("Wrote:", outDocs);
  console.log("Wrote:", outPublic);
  console.log("Wrote:", outDesktop);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
