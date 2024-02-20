const {
  selectArticleById,
  selectAllArticles,
} = require("../model/articles.models");

function getArticlesById(request, response, next) {
  const articleId = request.params.article_id;

  selectArticleById(articleId)
    .then((article) => {
      console.log(article);
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

module.exports = { getArticlesById, getAllArticles };
