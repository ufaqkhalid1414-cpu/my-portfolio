/**
 * Optimize project-art PNGs → WebP (+ small thumbs for cursor trail).
 * Usage: node scripts/optimize-project-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const artDir = path.join(root, "public", "project-art");
const thumbDir = path.join(artDir, "thumbs");

const files = [
  "project-dbms-admin-dashboard.png",
  "project-dsa-game-scene.png",
  "project-se-architecture-glass.png",
];

fs.mkdirSync(thumbDir, { recursive: true });

for (const file of files) {
  const input = path.join(artDir, file);
  if (!fs.existsSync(input)) {
    console.warn("skip missing", file);
    continue;
  }
  const base = file.replace(/\.png$/i, "");
  const hero = path.join(artDir, `${base}.webp`);
  const thumb = path.join(thumbDir, `${base}.webp`);

  await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(hero);

  await sharp(input)
    .resize({ width: 240, withoutEnlargement: true })
    .webp({ quality: 70, effort: 5 })
    .toFile(thumb);

  const srcKb = (fs.statSync(input).size / 1024).toFixed(1);
  const heroKb = (fs.statSync(hero).size / 1024).toFixed(1);
  const thumbKb = (fs.statSync(thumb).size / 1024).toFixed(1);
  console.log(`${base}: ${srcKb}KB png → ${heroKb}KB webp, ${thumbKb}KB thumb`);
}
