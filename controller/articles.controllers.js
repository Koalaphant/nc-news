const {
  selectArticleById,
  selectAllArticles,
} = require("../model/articles.models");

function getArticlesById(request, response, next) {
  const articleId = request.params.article_id;

  selectArticleById(articleId)
    .then((article) => {
      if (article.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "id not found" });
      }
      response.status(200).send(article.rows[0]);
    })
    .catch((err) => {
      next(err);
    });
}

function getAllArticles(request, response, next) {
  selectAllArticles()
    .then((articles) => {
      response.status(200).send(articles.rows);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticlesById, getAllArticles };
