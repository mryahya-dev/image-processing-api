import {
  fetchTheImageToBuffer,
  resizeImageAndSaveImage,
} from "../src/imageService";
import { readFixture } from "./helpers/fileHelper";

describe("imageService", () => {
  it("resizes a small image buffer and saves to disk", async () => {
    const buf = readFixture("sample.jpg");
    const result = await resizeImageAndSaveImage(buf, {
      width: 100,
      height: 100,
      format: "jpeg",
      quality: 60,
    });
    expect(result.path).toBeDefined();
    expect(result.filename).toContain(".jpeg");
  });

  // This test intentionally skips remote fetch — to test fetchImageToBuffer you'd need a mock http server.
});
