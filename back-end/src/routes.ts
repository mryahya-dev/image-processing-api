import express from "express";
import { fetchTheImageToBuffer, resizeImageAndSaveImage } from "./imageService";
import { ResizeOptions } from "./types";

import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads");

const router = express.Router();
router.get("/images", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err)
      return res.status(500).json({ error: "Failed to read uploads folder" });

    const images = files
      .filter((file) =>
        [".jpg", ".jpeg", ".png", ".webp"].includes(
          path.extname(file).toLowerCase()
        )
      )
      .map((file) => ({
        filename: file,
        url: `/uploads/${file}`,
      }));

    res.json({ images });
  });
});

router.get("/resize", async (req: any, res: any) => {
  try {
    const imageUrl = String(req.query.url || "").trim();
    if (!imageUrl)
      return res
        .status(400)
        .json({ error: "url query parameter is required." });

    const w = req.query.w ? parseInt(String(req.query.w), 10) : undefined;
    const h = req.query.h ? parseInt(String(req.query.h), 10) : undefined;
    const fmt = req.query.fmt ? String(req.query.fmt) : undefined;
    const ql = req.query.ql ? parseInt(String(req.query.ql), 10) : undefined;

    const opts: ResizeOptions = {};
    if (w && Number.isFinite(w) && w > 0) opts.width = w;
    if (h && Number.isFinite(h) && h > 0) opts.height = h;
    if (fmt && ["jpeg", "png", "webp"].includes(fmt)) opts.format = fmt as any;
    if (ql && ql > 0 && ql <= 100) opts.quality = ql;

    const buffer = await fetchTheImageToBuffer(imageUrl);
    const result = await resizeImageAndSaveImage(buffer, opts);

    res.json({
      message: "Image resized successfully",
      filename: result.filename,
      url: `/uploads/${result.filename}`,
    });
  } catch (err: any) {
    console.error("resize error", err);
    res.status(500).json({ error: err?.message || "internal error" });
  }
});

export default router;
