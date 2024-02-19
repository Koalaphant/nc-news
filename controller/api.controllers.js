const displayApiInformation = require("../model/api.models");

function getApiInformation(request, response, next) {
  const apiInfo = displayApiInformation();
  response.status(200).send(apiInfo);
}

module.exports = getApiInformation;
