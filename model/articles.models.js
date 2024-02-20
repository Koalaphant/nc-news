const db = require("../db/connection");
const format = require("pg-format");

function selectArticleById(articleId) {
  const queryString = format(
    "SELECT * FROM articles WHERE article_id = %L",
    articleId
  );

  return db.query(queryString);
}

function selectAllArticles() {
  return db.query(`SELECT 
  articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT(comments.comment_id) AS comment_count
FROM 
  articles
LEFT JOIN 
  comments ON articles.article_id = comments.article_id
GROUP BY 
  articles.article_id
ORDER BY 
  articles.created_at DESC`);
}

module.exports = { selectArticleById, selectAllArticles };
