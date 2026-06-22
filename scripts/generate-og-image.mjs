/**
 * Generates the social-share (Open Graph / Twitter) card at
 * `public/assets/og-card.png` from the OotD logo.
 *
 * Run with: `node scripts/generate-og-image.mjs`
 *
 * The card is checked into the repo; re-run this script whenever the logo or
 * branding changes.
 */
import { createRequire } from 'node:module';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// sharp ships under pnpm's virtual store and isn't symlinked at the repo root,
// so resolve it from node_modules/.pnpm/sharp@*/node_modules/sharp.
function resolveSharp() {
  try {
    return require('sharp');
  } catch {
    const pnpmDir = join(root, 'node_modules', '.pnpm');
    const entry = readdirSync(pnpmDir).find((name) => /^sharp@/.test(name));
    if (!entry) throw new Error('sharp not found under node_modules/.pnpm');
    return require(join(pnpmDir, entry, 'node_modules', 'sharp'));
  }
}

const sharp = resolveSharp();

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_SIZE = 300;

const logoSvg = readFileSync(join(root, 'public', 'assets', 'ootd-logo.svg'));

const background =
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a2a36"/>
      <stop offset="55%" stop-color="#155564"/>
      <stop offset="100%" stop-color="#1f7a8c"/>
    </linearGradient>
    <radialGradient id="glow" cx="22%" cy="42%" r="55%">
      <stop offset="0%" stop-color="#3aa7bd" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#3aa7bd" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${WIDTH}" height="8" fill="#1f7a8c"/>
  <g font-family="Segoe UI, Arial, sans-serif" fill="#ffffff">
    <text x="470" y="212" font-size="26" letter-spacing="6" fill="#a9e0ea" font-weight="600">WINDOWS UTILITY</text>
    <text x="468" y="300" font-size="80" font-weight="800">Outlook on</text>
    <text x="468" y="392" font-size="80" font-weight="800">the Desktop</text>
    <text x="470" y="452" font-size="31" fill="#d4eef3">Pin your Outlook calendar, inbox &amp; tasks</text>
    <text x="470" y="494" font-size="31" fill="#d4eef3">right on your Windows desktop.</text>
    <text x="470" y="560" font-size="25" fill="#8fc9d4" font-weight="600">outlookonthedesktop.com</text>
  </g>
</svg>`);

const logoPng = await sharp(logoSvg, { density: 384 })
  .resize(LOGO_SIZE, LOGO_SIZE)
  .png()
  .toBuffer();

const outDir = join(root, 'public', 'assets');
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'og-card.png');

await sharp(background)
  .composite([{ input: logoPng, top: Math.round((HEIGHT - LOGO_SIZE) / 2), left: 110 }])
  .png()
  .toFile(outPath);

console.log(`Wrote ${outPath}`);
