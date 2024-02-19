const express = require("express");
const { getAllTopics } = require("./controller/topics.controllers");
const getApiInformation = require("./controller/api.controllers");
const app = express();

app.get("/api/topics", getAllTopics);

app.get("/api", getApiInformation);

app.use((err, request, response, next) => {
  response.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
