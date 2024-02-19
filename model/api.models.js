const apiInfo = require("../endpoints.json");

function displayApiInformation() {
  return JSON.stringify(apiInfo, null, 2);
}

module.exports = displayApiInformation;
