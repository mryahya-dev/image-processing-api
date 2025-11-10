import fs from "fs";
import path from "path";

export function fixturePath(name: string) {
  return path.join(__dirname, "..", "fixtures", name);
}

export function readFixture(name: string) {
  return fs.readFileSync(fixturePath(name));
}
