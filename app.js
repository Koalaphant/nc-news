const express = require("express");
const { getAllTopics } = require("./controller/topics.controllers");
const getApiInformation = require("./controller/api.controllers");
const {
  getArticlesById,
  getAllArticles,
} = require("./controller/articles.controllers");
const app = express();

app.get("/api/topics", getAllTopics);

app.get("/api", getApiInformation);

app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles", getAllArticles);

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "bad request" });
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
