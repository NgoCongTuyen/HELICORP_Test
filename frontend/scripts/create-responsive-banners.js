import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const input = path.join(__dirname, '..', 'public', 'images', 'banner.webp');
const sizes = [480, 768, 1024];

Promise.all(
  sizes.map((w) =>
    sharp(input)
      .resize({ width: w })
      .webp({ quality: 70 })
      .toFile(path.join(__dirname, '..', 'public', 'images', `banner-${w}.webp`))
  )
)
  .then(() => console.log('Created responsive banners'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
