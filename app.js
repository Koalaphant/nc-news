const express = require("express");
const { getAllTopics } = require("./controller/topics.controllers");
const app = express();

app.use(express.json());

app.use((request, response, next) => {
  next();
});

app.get("/api/topics", getAllTopics);

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
