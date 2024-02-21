const db = require("../db/index");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const apiInformation = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("path not found", () => {
  test("should return a 404 if path does not exist ", () => {
    return request(app)
      .get("/api/wrongpath")
      .expect(404)
      .then((response) => {
        const error = response.body;
        expect(error.msg).toBe("path not found");
      });
  });
});

/* ============ GET TESTS ============ */

describe("GET /api/topics ", () => {
  test("should fetch all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const { topics } = response.body;
        expect(topics.length).toBe(3);

        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});

describe("GET /api", () => {
  test("should return an object describing all available endpoints of the API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe("object");
      });
  });
  test("should check that the file return from the endpoint is equal to the endpoints.json required in to the test suite", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(apiInformation);
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("should respond with 200 status code", () => {
    return request(app).get("/api/articles/1").expect(200);
  });

  test("should return a specific article based on its id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const { article } = response.body;
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("article_img_url");

        expect(article.title).toBe("Living in the shadow of a great man");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("butter_bridge");
      });
  });

  test("should respond with an error if given a topic_id of an invalid type (NaN)", () => {
    return request(app)
      .get("/api/articles/nonsense")
      .expect(400)
      .then((response) => {
        const error = response.body;
        expect(error.msg).toBe("bad request");
      });
  });

  test("should respond with an error if given a topic_id of a valid type that does not exist in our database", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((response) => {
        const error = response.body;
        expect(error.msg).toBe("id not found");
      });
  });
});

describe("GET /api/articles", () => {
  test("should fetch all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles.length).toBe(13);

        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");

          expect(article).not.toHaveProperty("body");
        });
      });
  });

  test("should test all articles are in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("should return a message if no comments are found for given article ", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .expect(200)
      .then((response) => {
        const { msg } = response.body;
        expect(msg).toBe("comment not found");
      });
  });

  test("should respond with an error if given a article_id of an invalid type (NaN)", () => {
    return request(app)
      .get("/api/articles/nonsense/comments")
      .expect(400)
      .then((response) => {
        const error = response.body;
        expect(error.msg).toBe("bad request");
      });
  });

  test("should return an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        const articleId = 1;
        expect(Array.isArray(comments)).toBe(true);

        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("body");
          expect(comment).toHaveProperty("article_id");
          expect(comment.article_id).toBe(articleId);
        });
      });
  });

  test("should check the array is being returned in a descending order with the most recent comments first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const { comments } = response.body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
});

/* ============ POST TESTS ============ */
describe("POST /api/articles/:article_id/comments", () => {
  test("POST 201 inserts a new comment for a specific article", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Cool post!",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((response) => {
        expect(response.body.comment.author).toBe("butter_bridge");
        expect(response.body.comment.body).toBe("Cool post!");
      });
  });

  test("should return a 404 if article_id does not exist ", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Cool post!",
    };

    return request(app)
      .post("/api/articles/3333/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("no id exists");
      });
  });

  test("should return a 400 if the article_id is not valid", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Cool post!",
    };

    return request(app)
      .post("/api/articles/nonsense/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("should return a 400 if the comment is missing keys", () => {
    const newComment = {
      body: "Cool post!",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("should return a 404 error if the username is not registered", () => {
    const newComment = {
      username: "user1",
      body: "Hey! Cool post!",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("username does not exist");
      });
  });
});
