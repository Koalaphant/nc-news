const db = require("../db/index");
const fs = require("fs/promises");

async function displayApiInformation() {
  const apiInformation = await fs.readFile("../endpoints.json", "utf-8");
  console.log(apiInformation);

  return apiInformation;
}

module.exports = displayApiInformation;
