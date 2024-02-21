const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  insertComment,
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
      if (comments.length === 0) {
        response
          .status(200)
          .send({ msg: "comment not found" });
      }
      response.status(200).send({ comments });
    })

    .catch((err) => {
      next(err);
    });
}

function postComment(request, response, next) {
  const { article_id } = request.params;
  const { username, body } = request.body;

  insertComment({ article_id, username, body })
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getArticlesById,
  getAllArticles,
  getCommentsByArticleID,
  postComment,
};
