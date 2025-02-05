<<<<<<< HEAD
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

=======
async function seed() {
  console.log("Seeding the database.");
  try {
    const users = [
      {
        first: "Jack",
        last: "Brown",
        email: "jackbrown@gmail.com",
        password: "Betty",
      },
      {
        first: "John",
        last: "Smith",
        email: "johnsmith@gmail.com",
        password: "Betty1",
      },
      {
        first: "David",
        last: "Johnson",
        email: "davidjohnson@gmail.com",
        password: "Betty2",
      },
    ];
    console.log(` Customer added: ${users}`);
    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  }
}

>>>>>>> refs/remotes/origin/main
// Seed the database if we are running this file directly.
if (require.main === module) {
  seed();
}

module.exports = seed;
