import sharp from "sharp";
import fs from "fs";
import path from "path";

const iconsDir = path.resolve("public/icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 1. Generate SVG source with authentic Flectēre visual language
const standardSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2043"/>
      <stop offset="100%" stop-color="#0A1630"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B88B36"/>
    </linearGradient>
  </defs>
  <!-- Background with subtle border -->
  <rect width="512" height="512" rx="96" fill="url(#navyGrad)"/>
  <rect x="16" y="16" width="480" height="480" rx="80" fill="none" stroke="url(#goldGrad)" stroke-width="6" opacity="0.4"/>
  
  <!-- Outer Gold Ring -->
  <circle cx="256" cy="256" r="170" fill="none" stroke="url(#goldGrad)" stroke-width="8"/>
  <circle cx="256" cy="256" r="156" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.6"/>

  <!-- Academic Crest Monogram P1 -->
  <text x="230" y="295" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="160" font-weight="900" fill="#FFFFFF" text-anchor="middle">P</text>
  <text x="325" y="295" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="160" font-weight="900" fill="url(#goldGrad)" text-anchor="middle">1</text>
  
  <!-- Subtitle -->
  <text x="256" y="360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="700" fill="#E8ECF0" letter-spacing="6" text-anchor="middle">PRESTIGE ONE</text>
  <text x="256" y="388" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="600" fill="#B88B36" letter-spacing="4" text-anchor="middle">AUDE SAPERE</text>
</svg>
`;

// Maskable SVG with safe zone margin (80% safe center)
const maskableSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2043"/>
      <stop offset="100%" stop-color="#0A1630"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#B88B36"/>
    </linearGradient>
  </defs>
  <!-- Full bleed background -->
  <rect width="512" height="512" fill="url(#navyGrad)"/>

  <!-- Inner Crest strictly within safe zone (r=140) -->
  <circle cx="256" cy="256" r="140" fill="none" stroke="url(#goldGrad)" stroke-width="7"/>
  <circle cx="256" cy="256" r="128" fill="none" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="5,5" opacity="0.6"/>

  <!-- Academic Crest Monogram P1 -->
  <text x="234" y="290" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="130" font-weight="900" fill="#FFFFFF" text-anchor="middle">P</text>
  <text x="312" y="290" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="130" font-weight="900" fill="url(#goldGrad)" text-anchor="middle">1</text>
  
  <text x="256" y="345" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" fill="#E8ECF0" letter-spacing="4" text-anchor="middle">PRESTIGE ONE</text>
</svg>
`;

async function generate() {
  fs.writeFileSync("public/icons/icon.svg", standardSvg.trim());

  // 192x192
  await sharp(Buffer.from(standardSvg))
    .resize(192, 192)
    .png()
    .toFile("public/icons/icon-192x192.png");

  // 512x512
  await sharp(Buffer.from(standardSvg))
    .resize(512, 512)
    .png()
    .toFile("public/icons/icon-512x512.png");

  // Maskable 192x192
  await sharp(Buffer.from(maskableSvg))
    .resize(192, 192)
    .png()
    .toFile("public/icons/maskable-icon-192x192.png");

  // Maskable 512x512
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile("public/icons/maskable-icon-512x512.png");

  // Favicon 32x32 png
  await sharp(Buffer.from(standardSvg))
    .resize(32, 32)
    .png()
    .toFile("public/favicon.ico");

  console.log("✓ PWA Icons and favicons generated successfully!");
}

generate().catch(console.error);
