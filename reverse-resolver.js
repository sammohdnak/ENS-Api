const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

exports.reverseENSResolve = async (addresses) => {
  // Initialize Moralis
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

    // Get the ENS name from the response and add it to the output array
    // let ensName;
    // if (response && response !== null) {
    //   ensName = response.get("name");
    //   ensNames.push({ [`${address}`]: ensName });
    // } else {
    //   ensNames.push({ [`${address}`]: [] });
    // }

    // Delay for 40 milliseconds to stay within the rate limit
    await new Promise((resolve) => setTimeout(resolve, 40));
  }

  console.log(ensNames);
  // Return a JSON object with the addresses and their ENS names
  return { ensNames };
};
