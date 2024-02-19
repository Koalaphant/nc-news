const { selectAllTopics } = require("../model/topics.models");

function getAllTopics(request, response, next) {
  selectAllTopics().then((topics) => {
    response.status(200).send(topics.rows);
  });
}

module.exports = { getAllTopics };
