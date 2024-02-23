# NC News README

Welcome to NC News! This is a platform where you can read, share, and discuss articles on various topics. Whether you're interested in technology, politics, or lifestyle, NC News has got you covered.

## Hosted Version

You can access the hosted version of NC News [here](https://nc-news-nxya.onrender.com).

## Project Summary

NC News is a web application that provides endpoints to interact with articles, comments, users, and topics. Here's a summary of the main functionalities:

- **Get Topics**: Retrieve a list of available topics.
- **Get Endpoints**: Get a list of all available endpoints.
- **Get Article by ID**: Retrieve a single article by its ID.
- **Get Articles**: Get a list of articles.
- **Get Comments by Article ID**: Retrieve comments associated with a specific article.
- **Add Comment**: Post a comment on a specific article.
- **Update Article**: Update an existing article.
- **Delete Comment**: Delete a comment.
- **Get Users**: Retrieve a list of users.
- **Filter and Sort Articles**: Query articles based on specific criteria.
- **Get Comment Count**: Obtain the count of comments for a particular article.

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

## Version Information

- Node.js: v-21
- PostgreSQL: 14.10

## Contributors

- Andrew Ward-Jones

Feel free to explore, contribute, and provide feedback! If you encounter any issues or have suggestions for improvement, please raise them in the [Issues](https://github.com/koalaphant/nc-news/issues) section. Enjoy reading and discussing articles on NC News!
