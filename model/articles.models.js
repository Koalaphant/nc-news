const db = require("../db/connection");
const format = require("pg-format");

function selectArticleById(articleId) {
  const queryString = format(
    `
    SELECT 
      articles.*,
      COUNT(comments.comment_id)::integer AS comment_count
    FROM 
      articles
    LEFT JOIN 
      comments ON articles.article_id = comments.article_id
    WHERE 
      articles.article_id = %L
    GROUP BY 
      articles.article_id;
    `,
    articleId
  );

  return db.query(queryString).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "id not found" });
    }

    return result.rows[0];
  });
}

function selectAllArticles(topic) {
  let sqlString = `
  SELECT
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
`;

  const sqlParametersArr = [];

  if (topic) {
    sqlString += `
    WHERE articles.topic = $1
  `;
    sqlParametersArr.push(topic);
  }

  sqlString += `
  GROUP BY
    articles.article_id
  ORDER BY
    articles.created_at DESC
`;

  return db.query(sqlString, sqlParametersArr).then(({ rows }) => {
    if (topic && rows.length === 0) {
      return [];
    }

    return rows;
  });
}

function selectCommentsByArticleId(articleId) {
  const queryString = format(
    "SELECT comment_id, votes, created_at, author, body, article_id FROM comments WHERE article_id = %L ORDER BY created_at DESC",
    articleId
  );

  return db.query(queryString).then((result) => {
    return result.rows;
  });
}

function insertComment({ article_id, username, body }) {
  const commentData = {
    author: username,
    body: body,
  };

  if (!article_id || !username || !body) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  return db
    .query(
      "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;",
      [article_id, commentData.author, commentData.body]
    )
    .then((result) => {
      return result.rows[0];
    });
}

function ammendArticle(inc_votes, article_id) {
  const queryString = `
  UPDATE articles
  SET
  votes = votes + $1
  WHERE article_id = $2
  RETURNING *;
  `;

  return db.query(queryString, [inc_votes, article_id]).then(({ rows }) => {
    const patchedArticle = rows[0];

    if (!patchedArticle) {
      return Promise.reject({ status: 404, msg: "article not found" });
    }

    return patchedArticle;
  });
}

/* MOVE THIS AND OTHER COMMENTS MODELS TO THEIR OWN FILE */

function removeComment(comment_id) {
  return db
    .query(
      `DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *`,
      [comment_id]
    )
    .then((response) => {
      if (response.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      }
    });
}

module.exports = {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  insertComment,
  ammendArticle,
  removeComment,
};
