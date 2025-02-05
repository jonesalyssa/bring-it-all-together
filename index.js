const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3000;
app.use(require("morgan")("dev"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const JWT = process.env.JWT;

app.post("/api/register", async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      },
    });
    const token = jwt.sign({ id: user.id }, JWT, {
      expiresIn: "24 hours",
    });
    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
