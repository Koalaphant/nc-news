const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const ENV = process.env.NODE_ENV || "development";

const envFilePath = path.join(__dirname, `../.env.${ENV}`);
const fallbackEnvPath = path.join(__dirname, "../.env.local");
const dotenvPath = fs.existsSync(envFilePath)
  ? envFilePath
  : fs.existsSync(fallbackEnvPath)
  ? fallbackEnvPath
  : null;

require("dotenv").config(dotenvPath ? { path: dotenvPath } : {});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

const getConnectionString = () => {
  const raw =
    process.env.DATABASE_URL ||
    (process.env.PGDATABASE && process.env.PGDATABASE.includes("://")
      ? process.env.PGDATABASE
      : null);

  if (!raw) return null;

  return raw.trim().replace(/^['"]/, "").replace(/['"];?$/, "");
};

const connectionString = getConnectionString();

if (connectionString) {
  config.connectionString = connectionString;

  if (ENV === "production") {
    config.max = 2;
  }
}

module.exports = new Pool(config);
