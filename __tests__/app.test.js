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
        expect(typeof response.text).toBe("string");
      });
  });
  test("should check that the file return from the endpoint is equal to the endpoints.json required in to the test suite", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const parsedApiInfo = JSON.stringify(apiInformation, null, 2);
        expect(response.text).toEqual(parsedApiInfo);
      });
  });
});
