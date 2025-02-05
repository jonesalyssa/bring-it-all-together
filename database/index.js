const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;
app.use(require("morgan")("dev"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const db = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://localhost:3000/bringitalltogether",
});

async function query(sql, params, callback) {
  return db.query(sql, params, callback);
}

module.exports = { query };
