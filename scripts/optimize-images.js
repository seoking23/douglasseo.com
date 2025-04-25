const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, "optimized");

// Create optimized directory if it doesn't exist
if (!fs.existsSync(OPTIMIZED_DIR)) {
  fs.mkdirSync(OPTIMIZED_DIR);
}

// List of images to optimize
const images = [
  "profile_image.JPG",
  "doug_grad_with_bear.JPG",
  "HazeIcon.png",
  "popper-logo.png",
  "chirp-microsystems.jpg",
  "tomylovemiwa-icon.png",
];

async function optimizeImage(filename) {
  const inputPath = path.join(PUBLIC_DIR, filename);
  const outputPath = path.join(
    OPTIMIZED_DIR,
    filename.replace(/\.[^.]+$/, ".webp")
  );

  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .resize(800, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFile(outputPath);

    console.log(`Optimized ${filename} to ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
  }
}

async function optimizeAllImages() {
  for (const image of images) {
    await optimizeImage(image);
  }
}

optimizeAllImages();
