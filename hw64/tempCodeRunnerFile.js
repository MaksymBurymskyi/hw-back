import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV == "development") {
  console.log("development mode");
} else {
  console.log("production mode");
}

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

const dataJsonFilePath = "package.json";
// htmlFilePath = "/views/index.html";

function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const data = fs.readFileSync(filePath);
      resolve(data.toString());
    } catch (error) {
      reject(error);
    }
  });
}
readFilePromise(path.join(__dirname, dataJsonFilePath))
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
