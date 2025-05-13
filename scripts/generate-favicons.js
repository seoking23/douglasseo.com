const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../public");
const SOURCE_IMAGE = path.join(PUBLIC_DIR, "doug_grad_with_bear.JPG");

async function generateFavicons() {
  try {
    // Generate favicon.ico (16x16, 32x32, 48x48)
    await sharp(SOURCE_IMAGE)
      .resize(48, 48, { fit: "cover" })
      .toFile(path.join(PUBLIC_DIR, "favicon-48x48.png"));

    await sharp(SOURCE_IMAGE)
      .resize(32, 32, { fit: "cover" })
      .toFile(path.join(PUBLIC_DIR, "favicon-32x32.png"));

    await sharp(SOURCE_IMAGE)
      .resize(16, 16, { fit: "cover" })
      .toFile(path.join(PUBLIC_DIR, "favicon-16x16.png"));

    // Generate apple-touch-icon
    await sharp(SOURCE_IMAGE)
      .resize(180, 180, { fit: "cover" })
      .toFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"));

    console.log("Favicon generation completed successfully!");
  } catch (error) {
    console.error("Error generating favicons:", error);
  }
}

generateFavicons();
