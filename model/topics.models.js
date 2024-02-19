const db = require("../db/index");

function selectAllTopics() {
  return db.query(`SELECT * FROM topics`);
}

module.exports = { selectAllTopics };
