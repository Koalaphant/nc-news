# NC News API

NC News is an Express/Node backend that exposes a REST API for browsing, filtering, and commenting on news articles. It is backed by PostgreSQL and ships with seeds, tests, and a containerised deployment workflow so you can run the stack locally or on a VPS.

## Tech Stack

- Node.js 22 (LTS-compatible)
- Express 4
- PostgreSQL 15/16
- pg & pg-format
- Jest, Supertest, jest-extended, jest-sorted
- Docker & Docker Compose

## Getting Started (Local Machine)

1. **Clone & install**

   ```bash
   git clone https://github.com/koalaphant/nc-news.git
   cd nc-news
   npm install
   ```

2. **Create the databases**

   ```bash
   npm run setup-dbs
   ```

   This runs `db/setup.sql` and creates the development/test databases defined there.

3. **Configure environment variables**

   Create `.env.development` and `.env.test` in the project root (never commit them). Each file needs either `PGDATABASE` or `DATABASE_URL`.

   ```ini
   # .env.development
   PGDATABASE=nc_news

   # .env.test
   PGDATABASE=nc_news_test
   ```

   For ad-hoc configs you can also use `.env.local`, which the app will load if the environment-specific file is missing.

4. **Seed and run**

   ```bash
   npm run seed     # populate dev DB
   npm start        # starts the API on http://localhost:9090
   ```

## Available Scripts

| Script                | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| `npm run setup-dbs`   | Executes `db/setup.sql` to create the dev/test databases.              |
| `npm run seed`        | Seeds the current environment’s database (defaults to development).    |
| `npm run seed-prod`   | Forces `NODE_ENV=production` and seeds using `DATABASE_URL`.           |
| `npm test`            | Runs the Jest test suite (requires `.env.test`).                       |
| `npm start`           | Launches `listen.js`, which starts the Express server.                 |

## API Overview

All routes are prefixed with `/api`.

| Method | Route                                      | Description                                      |
| ------ | ------------------------------------------ | ------------------------------------------------ |
| GET    | `/api`                                     | Returns the API documentation JSON.              |
| GET    | `/api/topics`                              | Lists all topics.                                |
| GET    | `/api/articles`                            | Lists articles, including sorting/filtering.     |
| GET    | `/api/articles/:article_id`                | Fetches a single article with comment count.     |
| GET    | `/api/articles/:article_id/comments`       | Lists comments for an article.                   |
| POST   | `/api/articles/:article_id/comments`       | Adds a new comment to an article.                |
| PATCH  | `/api/articles/:article_id`                | Updates article properties (e.g., votes).        |
| DELETE | `/api/comments/:comment_id`                | Deletes a comment.                               |
| GET    | `/api/users`                               | Lists users.                                     |

Errors are handled with contextual messages (e.g., invalid IDs return `400 Bad Request`, unknown paths return `404 Path not found`).

## Testing

The Jest suite exercises models, controllers, and endpoints. Ensure `.env.test` points at a clean test database, then run:

```bash
npm test
```

## Containerised Workflow

The repository includes a `Dockerfile` and `docker-compose.yml` so you can run both the API and Postgres as containers.

```bash
# Build and start the stack
docker compose up --build -d

# Follow logs
docker compose logs -f api

# Seed the production DB inside the container
docker compose exec api npm run seed-prod
```

The compose file:

- Launches Postgres 15 with credentials defined in `docker-compose.yml`.
- Builds the API container from the current source, installs production dependencies, and exposes port `9090`.
- Injects `DATABASE_URL` so the API talks to the bundled database.

Customize credentials, ports, or resource limits by editing the `environment` section in `docker-compose.yml`. To reset the database completely, run `docker compose down -v` (removes the persistent `db_data` volume).

## Deploying to a VPS with Docker

1. Copy the repo (or pull from GitHub) onto the VPS.
2. Configure environment secrets:
   - Update `docker-compose.yml` with production `POSTGRES_*` values.
   - Set `DATABASE_URL` so the API can reach Postgres (e.g., `postgres://user:pass@db:5432/ncnews`).
3. Build and start:

   ```bash
   docker compose build --no-cache api
   docker compose up -d
   ```

4. Seed the hosted database:

   ```bash
   docker compose exec api npm run seed-prod
   ```

5. Expose port `9090` (or map to 80/443 behind a reverse proxy) in your VPS firewall/security group.

## Contributing / Questions

- PRs and issues are welcome—open an issue if you spot a bug or have ideas.
- If you need additional documentation (e.g., Swagger, db diagrams) or deployment guidance, please ask!