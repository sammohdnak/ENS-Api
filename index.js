const express = require("express");
const { reverseENSResolve } = require("./reverse-resolver");
const app = express();
require("dotenv").config();

// Middleware to parse JSON data in requests
app.use(express.json());

// POST endpoint to receive an array of crypto addresses
app.post("/reverse-resolve", async (req, res, next) => {
  try {
    const addresses = req.body.addresses;
    const result = await reverseENSResolve(addresses);
    res.send({ type: "success", data: result });
  } catch (error) {
    res.send({ type: "error", data: error.message });
  }
});

// GET endpoint to return "Hello, World!"
app.get("/", (req, res) => {
  res.send("Welcome to ENS Resolver");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
