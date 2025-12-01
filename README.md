# NC News README

Welcome to NC News! This is a platform where you can read, share, and discuss articles on various topics. Whether you're interested in technology, politics, or lifestyle, NC News has got you covered.

## Hosted Version

You can access the hosted version of NC News [here](https://nc-news-nxya.onrender.com).

## Project Summary

NC News is a web application that provides endpoints to interact with articles, comments, users, and topics. Here's a summary of the main functionalities:

- **Get Topics**:

  - Endpoint: `GET /api/topics`
  - Description: Retrieves a list of available topics.

- **Get Endpoints**:

  - Endpoint: `GET /api`
  - Description: Retrieves a list of all available endpoints.

- **Get Article by ID**:

  - Endpoint: `GET /api/articles/:article_id`
  - Description: Retrieves a single article by its ID.

- **Get Articles**:

  - Endpoint: `GET /api/articles`
  - Description: Retrieves a list of articles.

- **Get Comments by Article ID**:

  - Endpoint: `GET /api/articles/:article_id/comments`
  - Description: Retrieves comments associated with a specific article.

- **Add Comment**:

  - Endpoint: `POST /api/articles/:article_id/comments`
  - Description: Posts a comment on a specific article.

- **Update Article**:

  - Endpoint: `PATCH /api/articles/:article_id`
  - Description: Updates an existing article.

- **Delete Comment**:

  - Endpoint: `DELETE /api/comments/:comment_id`
  - Description: Deletes a comment.

- **Get Users**:

  - Endpoint: `GET /api/users`
  - Description: Retrieves a list of users.

- **Filter and Sort Articles**:

  - Endpoint: `GET /api/articles (queries)`
  - Description: Allows articles to be filtered and sorted.

- **Get Comment Count**:
  - Endpoint: `GET /api/articles/:article_id (comment count)`
  - Description: Adds a comment count to the response when retrieving a single article.

## Getting Started

To get started with NC News locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- Node.js (minimum version v-21)
- PostgreSQL (minimum version 14.10)

### Clone the Repository

```bash
git clone https://github.com/koalaphant/nc-news.git
```

### Install Dependencies

```bash
cd nc-news
npm install
```

To install the dependencies required for the project, run the following command in your terminal:

```bash
npm install dotenv@^16.0.0 express@^4.18.2 pg@^8.7.3
```

```
npm install --save-dev jest@^27.5.1 jest-extended@^2.0.0 jest-sorted@^1.0.15 pg-format@^1.0.4 supertest@^6.3.4
```

## Dependencies

- **dotenv**: ^16.0.0
- **express**: ^4.18.2
- **pg**: ^8.7.3

## Dev Dependencies

- **jest**: ^27.5.1
- **jest-extended**: ^2.0.0
- **jest-sorted**: ^1.0.15
- **pg-format**: ^1.0.4
- **supertest**: ^6.3.4

### Create .env Files

When cloning this repository, developers will need to add necessary environment variables.

To accomplish this, follow these steps:

Create two files:

- `.env.development`
- `.env.test`

Within these files, include key information required to connect to the two databases locally.

Here's an example format:

```
PGDATABASE=your_database_name_here
```

Replace `your_database_name_here` with the name of your local database. These files should also contain any other sensitive information required for the application to run locally.

### Seed Local Database

```bash
npm run seed
```

### Run Tests

```bash
npm test
```

## Containerised Setup

This project ships with a `Dockerfile` and `docker-compose.yml` so you can run both the API and a Postgres instance locally or on a VPS.

1. Build and start both services:

   ```bash
   docker compose up --build
   ```

   The API will be available on `http://localhost:9090` by default.

2. Seed the database inside the container whenever you need fresh data:

   ```bash
   docker compose run --rm api npm run seed-prod
   ```

3. To customize credentials or ports, edit the environment variables in `docker-compose.yml` (and the matching `DATABASE_URL` string).

Stop the stack with `docker compose down` and remove persisted Postgres data by adding the `-v` flag (this deletes the `db_data` volume).

## Version Information

- Node.js: v-21
- PostgreSQL: 14.10

## Contributors

- Andrew Ward-Jones

Feel free to explore, contribute, and provide feedback! If you encounter any issues or have suggestions for improvement, please raise them in the [Issues](https://github.com/koalaphant/nc-news/issues) section. Enjoy reading and discussing articles on NC News!
