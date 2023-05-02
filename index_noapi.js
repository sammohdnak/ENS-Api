require("dotenv").config();
const Moralis = require("moralis").default;

const addresses = ["..............", "................"];

reverseENSResolve = async (addresses) => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
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

const run = async () => {
  console.log(await reverseENSResolve(addresses));
};

run();
