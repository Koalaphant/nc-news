const db = require("../db/connection");
const format = require("pg-format");

function selectArticleById(articleId) {
  const queryString = format(
    "SELECT * FROM articles WHERE article_id = %L",
    articleId
  );

  return db.query(queryString).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "id not found" });
    }

    return result.rows[0];
  });
}

function selectAllArticles() {
  return db
    .query(
      `SELECT 
  articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT(comments.comment_id)::integer AS comment_count
FROM 
  articles
LEFT JOIN 
  comments ON articles.article_id = comments.article_id
GROUP BY 
  articles.article_id
ORDER BY 
  articles.created_at DESC`
    )
    .then((result) => {
      return result.rows;
    });
}

function selectCommentsByArticleId(articleId) {
  const queryString = format(
    "SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = %L ORDER BY created_at DESC",
    articleId
  );

  return db.query(queryString).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "id not found" });
    }

    return result.rows;
  });
}

module.exports = {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
};
