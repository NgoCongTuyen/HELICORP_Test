const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '..', 'public', 'images');
const outDir = path.join(srcDir, 'optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const sizes = [320, 640, 1024, 1600];
const formats = ['webp', 'avif'];

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  const input = path.join(srcDir, file);
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;
  for (const size of sizes) {
    for (const fmt of formats) {
      const outName = `${name}-${size}.${fmt}`;
      const outPath = path.join(outDir, outName);
      try {
        await sharp(input).resize({ width: size }).toFormat(fmt, { quality: 80 }).toFile(outPath);
        console.log('Wrote', outPath);
      } catch (e) {
        console.error('Failed', outPath, e.message);
      }
    }
  }
}

(async () => {
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    await processFile(file);
  }
  console.log('Done optimizing images');
})();
