const db = require("../db/connection");

function selectAllUsers() {
  return db.query(`SELECT * FROM users`).then(({ rows: users }) => {
    return users;
  });
}

module.exports = selectAllUsers;
