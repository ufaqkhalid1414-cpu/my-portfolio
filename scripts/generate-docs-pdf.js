/**
 * Generates a printable PDF from docs/PORTFOLIO-DOCUMENTATION.md
 * Usage (from ufaq-portfolio): node scripts/generate-docs-pdf.js
 */
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const mdPath = path.join(root, "docs", "PORTFOLIO-DOCUMENTATION.md");
const outPublic = path.join(root, "public", "ufaq-portfolio-documentation.pdf");
const outSibling = path.join(root, "..", "ufaq-portfolio-documentation.pdf");

const md = fs.readFileSync(mdPath, "utf8");

/** Split into ## sections (skip the top H1 intro for its own cover-ish first page) */
const parts = md.split(/\n(?=## )/);
const intro = parts[0].replace(/^#\s+.+\n+/, "").trim();
const sections = parts.slice(1).map((block) => {
  const lines = block.trim().split("\n");
  const title = lines[0].replace(/^##\s+/, "").trim();
  const body = lines.slice(1).join("\n").trim();
  return { title, body };
});

function writePdf(file) {
  const doc = new PDFDocument({ size: "A4", margin: 48 });
  const stream = fs.createWriteStream(file);
  doc.pipe(stream);

  // Cover / intro
  doc.fontSize(18).fillColor("#0a0f14").text("Ufaq Khalid — Portfolio Documentation", {
    align: "left",
  });
  doc.moveDown(0.4);
  doc.fontSize(9).fillColor("#555").text(intro.replace(/\n+/g, " ").slice(0, 900), {
    align: "left",
    lineGap: 2,
  });
  doc.moveDown(0.8);
  doc.fontSize(8).fillColor("#0d9488").text("Each following page = one site area. Animations & hovers at the bottom of that page.");

  for (const { title, body } of sections) {
    doc.addPage();
    doc.fontSize(14).fillColor("#0d9488").text(title, { align: "left" });
    doc.moveDown(0.5);

    const chunks = body.split(/\n### Animations & hover effects\n*/i);
    const main = (chunks[0] || "").trim();
    const anim = (chunks[1] || "").trim();

    doc.fontSize(9).fillColor("#222");
    for (const line of main.split("\n")) {
      const t = line.trim();
      if (!t) {
        doc.moveDown(0.25);
        continue;
      }
      if (t.startsWith("- ")) {
        doc.text(`•  ${t.slice(2)}`, { indent: 2, lineGap: 1 });
      } else {
        doc.text(t, { lineGap: 1 });
      }
    }

    doc.moveDown(0.6);
    doc
      .moveTo(48, doc.y)
      .lineTo(doc.page.width - 48, doc.y)
      .strokeColor("#e5e7eb")
      .lineWidth(0.5)
      .stroke();
    doc.moveDown(0.5);

    doc.fontSize(10).fillColor("#0d9488").text("Animations & hover effects");
    doc.moveDown(0.3);
    doc.fontSize(9).fillColor("#222");
    if (anim) {
      for (const line of anim.split("\n")) {
        const t = line.trim();
        if (!t) continue;
        if (t.startsWith("- ")) {
          doc.text(`•  ${t.slice(2)}`, { indent: 2, lineGap: 1 });
        } else {
          doc.text(t, { lineGap: 1 });
        }
      }
    } else {
      doc.text("•  (see section body)", { indent: 2 });
    }

    doc.fontSize(7).fillColor("#999");
    const bottom = doc.page.height - 36;
    doc.text(title, 48, bottom, { width: doc.page.width - 96, align: "center" });
  }

  doc.end();
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

(async () => {
  fs.mkdirSync(path.dirname(outPublic), { recursive: true });
  await writePdf(outPublic);
  await writePdf(outSibling);
  console.log("Wrote", outPublic);
  console.log("Wrote", path.resolve(outSibling));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
