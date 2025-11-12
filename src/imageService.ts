import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import fetch from "node-fetch";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { ResizeOptions } from "./types";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
const MAX_IMAGE_BYTES = Number(process.env.MAX_IMAGE_BYTES || 5_000_000);

export async function fetchTheImageToBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`Failed to fetch image : ${res.status} ${res.statusText}`);

  const contentLength = res.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_IMAGE_BYTES) {
    throw new Error("the Image is too large");
  }

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_IMAGE_BYTES)
    throw new Error("the Image too large after download ");
  return buf;
}

export async function resizeImageAndSaveImage(
  buffer: Buffer,
  opts: ResizeOptions
) {
  let img = sharp(buffer, { failOnError: true });
  const transformer = img.resize(opts.width, opts.height, {
    fit: "inside",
    withoutEnlargement: true,
  });

  const format = opts.format || "jpeg";
  const quality = opts.quality ?? 80;

  if (format === "jpeg") transformer.jpeg({ quality });
  else if (format === "png") transformer.png();
  else if (format === "webp") transformer.webp({ quality });

  const filename = `${uuidv4()}.${format}`;
  const outPath = path.join(UPLOAD_DIR, filename);

  await transformer.toFile(outPath);
  return { path: outPath, filename };
}
