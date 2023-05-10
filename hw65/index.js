import express from "express";
import mongoose from "mongoose";
// export { Product, productSchema };

import { Product } from "./model/product.js";

const PORT = 3002;

const app = express();

const url = "mongodb://localhost:27017";
const connection = mongoose.createConnection(url, { maxPoolSize: 19 });

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`DB connection error: ${err}`);
  });

app.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      const productsHtml = products.map(
        (product) => `
        <div style="border: 1px solid #000;
        width: fit-content;
        margin: 0 0 20px 0;
        padding: 0 10px">
        <h2>${product.title}</h2>
        <p>Price: ${product.price}</p>
        </div>
        `
      );
      const html = `<h1>Products:</h1> ${productsHtml.join("")}`;
      res.send(html);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
