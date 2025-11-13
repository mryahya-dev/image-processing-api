import express from "express";
import { fetchImageToBuffer, resizeImageAndSaveImage } from "./imageService";
import { ResizeOptions } from "./types";
import multer from "multer";

import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads");

// Configure multer for file uploads
const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

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

    const buffer = await fetchImageToBuffer(imageUrl);
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

router.post(
  "/upload-resize",
  upload.single("file"),
  async (req: any, res: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const w = req.query.w ? parseInt(String(req.query.w), 10) : undefined;
      const h = req.query.h ? parseInt(String(req.query.h), 10) : undefined;
      const fmt = req.query.fmt ? String(req.query.fmt) : undefined;
      const ql = req.query.ql ? parseInt(String(req.query.ql), 10) : undefined;

      const opts: ResizeOptions = {};
      if (w && Number.isFinite(w) && w > 0) opts.width = w;
      if (h && Number.isFinite(h) && h > 0) opts.height = h;
      if (fmt && ["jpeg", "png", "webp"].includes(fmt))
        opts.format = fmt as any;
      if (ql && ql > 0 && ql <= 100) opts.quality = ql;

      const buffer = fs.readFileSync(req.file.path);
      const result = await resizeImageAndSaveImage(buffer, opts);

      // Clean up uploaded temp file
      fs.unlinkSync(req.file.path);

      res.json({
        message: "Image resized successfully",
        filename: result.filename,
        url: `/uploads/${result.filename}`,
      });
    } catch (err: any) {
      console.error("upload-resize error", err);
      res.status(500).json({ error: err?.message || "internal error" });
    }
  }
);

// ...existing code...

router.get("/download/:filename", (req: any, res: any) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(uploadDir, filename);

    // Security: prevent path traversal
    if (!filepath.startsWith(uploadDir)) {
      return res.status(400).json({ error: "Invalid filename" });
    }

    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: "File not found" });
    }

    // Send file with download headers
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.download(filepath, filename);
  } catch (err: any) {
    console.error("download error", err);
    res.status(500).json({ error: err?.message || "internal error" });
  }
});

// ...existing code...
export default router;
