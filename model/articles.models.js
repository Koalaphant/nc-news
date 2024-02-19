const db = require("../db/connection");
const format = require("pg-format");

function selectArticleById(articleId) {
  const queryString = format(
    "SELECT * FROM articles WHERE article_id = %L",
    articleId
  );

  return db.query(queryString);
}

module.exports = selectArticleById;
