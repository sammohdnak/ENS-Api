const express = require("express");
const app = express();
require("dotenv").config();
const Moralis = require("moralis").default;
Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

reverseENSResolve = async (addresses) => {
  console.log(addresses);
  // Loop through each address in the input array
  const ensNames = [];
  for (const address of addresses) {
    const response = await Moralis.EvmApi.resolve.resolveAddress({
      address,
    });
    if (response) {
      // console.log(response.toJSON());
      ensNames.push({ [`${address}`]: response.toJSON() });
    } else {
      ensNames.push({ [`${address}`]: {} });
    }

    // Delay for 40 milliseconds to stay within the rate limit
    await new Promise((resolve) => setTimeout(resolve, 40));
  }

  console.log(ensNames);
  // Return a JSON object with the addresses and their ENS names
  return { ensNames };
};

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

app.listen(5002, () => {
  console.log("App listening on port 5002");
});
