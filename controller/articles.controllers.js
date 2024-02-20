const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
} = require("../model/articles.models");

function getArticlesById(request, response, next) {
  const articleId = request.params.article_id;

  selectArticleById(articleId)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

function getAllArticles(request, response, next) {
  selectAllArticles()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function getCommentsByArticleID(request, response, next) {
  const articleId = request.params.article_id;
  selectCommentsByArticleId(articleId)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticlesById, getAllArticles, getCommentsByArticleID };
