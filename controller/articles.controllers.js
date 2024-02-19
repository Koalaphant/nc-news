const selectArticleById = require("../model/articles.models");

function getArticlesById(request, response, next) {
  const articleId = request.params.article_id;
  selectArticleById(articleId).then((article) => {
    response.status(200).send(article.rows[0]);
  });
}

module.exports = getArticlesById;
