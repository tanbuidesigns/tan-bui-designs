import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const outputDirectory = path.resolve("public/social");

const cards = [
  {
    source: "public/about/about-06.webp",
    output: "tan-bui-designs.png",
    eyebrow: "TAN BUI DESIGNS",
    title: ["Multidisciplinary", "design consultant"],
  },
  {
    source: "public/projects/islamiyah-series/featured-card-01.webp",
    output: "islamiyah-series-case-study.png",
    eyebrow: "CASE STUDY",
    title: ["Islamiyah Series", "Publication & educational design"],
  },
  {
    source: "public/projects/urban-eat/featured-card-01.webp",
    output: "urban-eat-case-study.png",
    eyebrow: "CASE STUDY",
    title: ["Urban Eat", "Packaging & brand design"],
  },
];

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function overlay({ eyebrow, title }) {
  const [primary, secondary] = title.map(escapeXml);

  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#07080a" stop-opacity="0.94" />
          <stop offset="0.58" stop-color="#07080a" stop-opacity="0.62" />
          <stop offset="1" stop-color="#07080a" stop-opacity="0.12" />
        </linearGradient>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#c7d2fd" />
          <stop offset="0.48" stop-color="#f5ccd3" />
          <stop offset="1" stop-color="#fef9c3" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#shade)" />
      <rect x="76" y="76" width="132" height="5" rx="2.5" fill="url(#accent)" />
      <text x="76" y="128" fill="#ffffff" opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="5">${escapeXml(eyebrow)}</text>
      <text x="70" y="302" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="700" letter-spacing="-3">${primary}</text>
      <text x="70" y="390" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="500" letter-spacing="-2">${secondary}</text>
      <text x="76" y="552" fill="#ffffff" opacity="0.76" font-family="Arial, Helvetica, sans-serif" font-size="23">tanbuidesigns.com</text>
    </svg>
  `);
}

await mkdir(outputDirectory, { recursive: true });

for (const card of cards) {
  await sharp(card.source)
    .rotate()
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .composite([{ input: overlay(card), blend: "over" }])
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(outputDirectory, card.output));
}

const blogOutputDirectory = path.join(outputDirectory, "blog");
await mkdir(blogOutputDirectory, { recursive: true });

const blogCovers = (await readdir(path.resolve("public/blog/covers")))
  .filter((fileName) => fileName.endsWith(".svg"));

for (const cover of blogCovers) {
  await sharp(path.resolve("public/blog/covers", cover))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(blogOutputDirectory, cover.replace(/\.svg$/, ".png")));
}

console.log(
  `Generated ${cards.length + blogCovers.length} social preview images in ${outputDirectory}.`,
);
