import express from "express";
import products from "./data/products.js";
import product from "./data/products.js";
const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/products", (req, res) => {
  res.json(product);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

app.listen(5000, console.log("Server running on port 5000"));
