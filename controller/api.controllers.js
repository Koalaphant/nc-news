const apiInfo = require("../endpoints.json");

function getApiInformation(request, response, next) {
  response.status(200).send(apiInfo);
}

module.exports = getApiInformation;
