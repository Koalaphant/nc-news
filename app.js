const express = require("express");
const { getAllTopics } = require("./controller/topics.controllers");
const getApiInformation = require("./controller/api.controllers");
const {
  getArticlesById,
  getAllArticles,
  getCommentsByArticleID,
  postComment,
} = require("./controller/articles.controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", getApiInformation);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleID);

app.post("/api/articles/:article_id/comments", postComment);

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "bad request" });
  }

  if (
    err.code === "23503" &&
    err.detail.includes('is not present in table "users".')
  ) {
    response.status(404).send({ msg: "username does not exist" });
  }
  if (err.code === "23503") {
    response.status(404).send({ msg: "no id exists" });
  }

  next(err);
});

app.all("/*", (request, response, next) => {
  response.status(404).send({ msg: "path not found" });
});

app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
