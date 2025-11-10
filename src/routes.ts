import express from "express";
import { fetchTheImageToBuffer, resizeImageAndSaveImage } from "./imageService";
import { ResizeOptions } from "./types";

import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads");

const router = express.Router();

// HTML page listing all images
router.get("/images", (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).send("Failed to read uploads folder");

    // Only include image files
    const images = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
    });

    // Generate HTML
    let html = "<h1>Uploaded Images</h1><ul>";
    images.forEach((file) => {
      const url = `/uploads/${file}`;
      html += `<li><a href="${url}" target="_blank">${file}</a> <br><img src="${url}" width="200"/></li>`;
    });
    html += "</ul>";

    res.send(html);
  });
});

// GET /resize?url=...&w=300&h=200&fmt=png&ql=80
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

    // Return a JSON response with saved path and a downloadable URL
    res.json({ file: result.filename, savedTo: result.path });
  } catch (err: any) {
    console.error("resize error", err);
    res.status(500).json({ error: err?.message || "internal error" });
  }
});

export default router;
