const {
  selectArticleById,
  selectAllArticles,
  selectCommentsByArticleId,
  insertComment,
  ammendArticle,
  removeComment,
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
  const { topic, sort_by, order } = request.query;

  selectAllArticles(topic, sort_by, order)
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
        response.status(200).send({ msg: "comment not found" });
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

function patchArticle(request, response, next) {
  const { inc_votes } = request.body;
  const { article_id } = request.params;

  ammendArticle(inc_votes, article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

/* MOVE THIS AND OTHER COMMENTS CONTROLLERS TO THEIR OWN FILE */

function deleteComment(request, response, next) {
  const { comment_id } = request.params;

  removeComment(comment_id)
    .then(() => {
      response.status(204).send();
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
  patchArticle,
  deleteComment,
};
