import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "node:module";
import { Stats, promises } from "fs";
import fs from "fs";

const PORT = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV == "development") {
  console.log("development mode");
} else {
  console.log("production mode");
}

// app.get("/", (req, res) => {
//   res.send("<h1>Wellcome</h1>");
// });

app.get("/", (req, res) => {
  fs.readFile("./package.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(`
      <h1>Wellcome</h1>
      <h2>Json text:</h2>
    <pre>${data}</pre>`);
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
