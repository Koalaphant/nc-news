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
  return db.end();
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

describe("GET /api/topics ", () => {
  test("should fetch all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const topics = response.body;
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
        const article = response.body;
        expect(article).toHaveProperty("title");
        expect(article).toHaveProperty("topic");
        expect(article).toHaveProperty("author");
        expect(article).toHaveProperty("body");
        expect(article).toHaveProperty("created_at");
        expect(article).toHaveProperty("votes");
        expect(article).toHaveProperty("article_img_url");
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
