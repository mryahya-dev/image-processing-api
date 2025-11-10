import express from "express";
import dotenv from "dotenv";
import path from "path";
import routes from "./routes";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

// Serve uploads statically
const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads");
app.use("/uploads", express.static(uploadDir));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Image resize API listening on http://localhost:${port}`);
});
